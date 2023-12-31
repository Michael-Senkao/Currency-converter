import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dtenv from "dotenv";

dtenv.config();
const app = express();
const port = process.env.PORT;
const apiKey = process.env.KEY;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const result = { amount: 10, base: "LRD", value: 500, target: "USD" };
  res.render("index.ejs");
});

app.post("/convert", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${req.body.base}/${req.body.target}/${req.body.amount}`
    );
    const result = {
      amount: req.body.amount,
      base: req.body.base,
      value: response.data.conversion_result,
      target: req.body.target,
    };
    res.render("index.ejs", { data: result });
  } catch (err) {
    res.sendStatus(404);
  }
});
app.listen(port, () => {
  console.log(`Server is listening at port numner ${port}`);
});
