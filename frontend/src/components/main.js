import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Link,
  Typography,
  CircularProgress,
} from "@mui/material";
import { generateCode, getReport } from "../helper/http_request";
import { base_url } from "../helper/config";

export default function Main() {
  const [donwloadLink, setDownloadLink] = useState("#");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState({});

  const handleGenerator = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDownloadLink("#");
    generateCode()
      .then((data) => {
        setDownloadLink(`${base_url}/download/${data["filename"]}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleReport = async (e) => {
    e.preventDefault();
    const data = await getReport();
    console.log(data);
    setReport(data);
  };

  return (
    <div>
      <Box sx={{ bgcolor: "#e6e5e5", height: "100vh", p: "50px" }}>
        {!isLoading && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleGenerator}
                disabled={isLoading}
              >
                Generate
              </Button>
            </Grid>
            <Grid item xs={12}>
              Link:{" "}
              {
                <Link href={donwloadLink} variant={"button"}>
                  Click here
                </Link>
              }
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={donwloadLink.length > 1 ? false : true}
                onClick={handleReport}
              >
                Report
              </Button>
            </Grid>
            <Grid item xs={12}>
              {report.generateAlphaNum && (
                <>
                  <Typography variant="body1">
                    Alphabetical Strings: {report.generateAlphabet}
                  </Typography>
                  <Typography variant="body1">
                    Real Numbers: {report.generateRealNum}
                  </Typography>
                  <Typography variant="body1">
                    Integers: {report.generateInteger}
                  </Typography>
                  <Typography variant="body1">
                    Alphanumerics: {report.generateAlphaNum}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        )}
        {isLoading && <>
            <CircularProgress />
            <Typography variant="h4">Loading...</Typography>
            </>}
      </Box>
    </div>
  );
}
