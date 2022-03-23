// CommonJS Modules
const { Random } = require("random-js");
const randomstring = require("randomstring");
const fs = require("fs");
var path = require('path');


const random = new Random();
const data_size = 2097152;

const reports = {
  generateAlphabet: 0,
  generateAlphaNum: 0,
  generateInteger: 0,
  generateRealNum: 0,
};

const generateAlphabet = (limit) => {
  const alpha = randomstring.generate({ charset: "alphabetic", length: limit });
  return alpha;
};

const generateAlphaNum = (limit) => {
  const alphanum = randomstring.generate({
    charset: "alphanumeric",
    length: limit,
  });
  return alphanum;
};

const generateInteger = (limit) => {
  const integer = random.integer(1, limit);
  return integer;
};

const generateRealNum = (limit) => {
  const real_num = random.real(-limit, limit);
  return real_num;
};

const randomGenerator = () => {
  const randomiser = [
    generateAlphabet,
    generateAlphaNum,
    generateInteger,
    generateRealNum,
  ];
  const main_arr = [];

  while (main_arr.toString().length < data_size) {
    // generate random integer for randum size
    let randomLimit = random.integer(100, 100000);

    // current size of array
    let currentLen = main_arr.toString().length;

    // difference between actual size and needed
    const diff = data_size - currentLen - 1;

    // if difference is zero then break
    if (diff === 0) {
      break;
    }

    // selected smallest number for limit
    randomLimit = randomLimit > diff ? diff : randomLimit;

    // select random index for generator
    const randomIndex = random.integer(0, 3);

    // selected generator base on index
    const generated_data = randomiser[randomIndex](randomLimit);
    reports[randomiser[randomIndex].name] += 1;
    main_arr.push(generated_data);
  }
  console.log("reports", reports);
  
  const filename = 'output.txt'
  fs.writeFile(`src/output/${filename}`, main_arr.toString(), function (err, content) {
    if (err) throw console.error("Error writing output", err);
    console.log("It's saved in output.txt!");
  });

  fs.writeFile(`src/output/report.json`, JSON.stringify(reports), function (err, content) {
    if (err) throw console.error("Error writing output", err);
    console.log("It's saved in report.json!");
  });
  return filename
};

export default randomGenerator;