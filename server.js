const { Server } = require("http");
const express = require("express");
const zlib = require("zlib");
const request = require("request");
const url = require("url");

const Router = express.Router();
const PORT = 5500;
const header = { "Content-Type": "text/htmlp; charset=utf-8" };

const app = express();
app
  .use(express.static("public"))
  .post("/zip", (req, res) => {
    req.pipe(zlib.createGzip()).pipe(res);
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
