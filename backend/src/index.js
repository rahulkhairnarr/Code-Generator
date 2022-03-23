import express from "express";
import randomGenerator from "./data_gen";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/generator", (req, res) => {
  const filename = randomGenerator();
  res.json({ filename: filename });
});

app.get("/download/:filename", (req, res, next) => {
  var fileName = `./src/output/${req.params["filename"]}`;
  res.download(fileName);
});

app.get("/report", (req, res, next) => {
  var options = {
    root: path.join(__dirname),
  };

  var fileName = "./output/report.json";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.listen(8000, () => {
  console.log(`Server is running on 8080`);
});
