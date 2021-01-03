const express = require("express");
const zlib = require("zlib");
const request = require("request");
const url = require("url");
const { Transform } = require("stream");

const PORT = 5500;

const transformation = function (c, enc, cb) {
  const value = c
    .toString()
    .split("")
    .map((i) => Number(i) + 1)
    .join("");
  this.push(value);
  cb();
};

const app = express();
app
  .use(express.static("public"))
  .post("/zip", (req, res) => {
    req.pipe(zlib.createGzip()).pipe(res);
  })
  .post("/transform", (req, res) => {
    const transformator = new Transform({ transform: transformation });
    req.pipe(transformator).pipe(res);
  })
  .get("/pipe", (r) =>
    request(
      url.format({
        protocol: "https",
        host: "kodaktor.ru",
        pathname: "/g/forpipe",
      })
    ).pipe(r.res)
  )
  .listen(process.env.PORT || PORT, () => console.log(process.pid));
