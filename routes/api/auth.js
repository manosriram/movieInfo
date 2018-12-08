const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const app = express();
const request = require("request");
const alert = require("alert-node");
const fs = require("fs");
const wiki = require("wikijs").default;

router.get("/", (req, res) => {
  res.send("Hey there from Auth!");
});

router.post("/searchM", (req, res) => {
  if (req.body.search) {
    const key = `http://www.omdbapi.com/?t=${req.body.search}&apikey=5d43c09e`;
    request(
      {
        url: key,
        json: true
      },
      (err, response, body) => {
        try {
          if (
            (response.statusCode == 500).json(response.statusCode == 500) ||
            (response.statusCode == 400).json(response.statusCode == 400) ||
            (response.statusCode == 403).json(response.statusCode == 403) ||
            (response.statusCode == 401).json(response.statusCode == 401) ||
            (response.statusCode == 503).json(response.statusCode == 503) ||
            (response.statusCode == 403).json(response.statusCode == 403)
          ) {
            res.render("err");
          } else throw error;
        } catch (error) {
          if (
            !err &&
            (response.statusCode == 200 || response.statusCode == 302)
          ) {
            if (body.imdbRating) {
              let data = `Title: ${body.Title}\nYear: ${body.Year}\nReleased: ${
                body.Released
              }\nGenre: ${body.Genre}\nDirector: ${body.Director}\nActors: ${
                body.Actors
              }\n\nPlot: ${body.Plot}\n\nLanguage: ${body.Language}\nCountry: ${
                body.Country
              }\nIMDB Rating: ${body.imdbRating}\nIMDB Votes: ${
                body.imdbVotes
              }\nBox Office: ${body.BoxOffice}\nType: ${
                body.Type
              }\n\n\n\nBy - A.Mano Sriram\n`;

              fs.writeFile(`./doc/${body.Title}.txt`, data, err => {
                console.log(`File Saved -> ${body.Title}`);
              });

              res.render("movInf", {
                data: body
              });
            } else res.render("err");
          } else res.render("err");
        }
      }
    );
  } else {
    alert("Please Enter Your Movie!");
    res.render("home");
  }
});

router.get("/getMovie/:movie", (req, res) => {
  // if (res.status == 404)

  request(
    `https://en.wikipedia.org/wiki/${req.params.movie} (film)`,
    (err, response, body) => {
      if (!err && (response.statusCode == 200 || response.statusCode == 302)) {
        res.redirect(
          `https://en.wikipedia.org/wiki/${req.params.movie} (film)`
        );
      } else {
        res.redirect(`https://en.wikipedia.org/wiki/${req.params.movie}`);
      }
    }
  );
});

router.get("/getWiki/:movie", (req, res) => {
  const word = req.params.movie;
  word.replace(" ", "_");
  res.redirect(`https://en.wikipedia.org/wiki/${word} (film)`);
});

router.get("/getFile/:title", (req, res) => {
  res.download(`./doc/${req.params.title}.txt`);
});
module.exports = router;
