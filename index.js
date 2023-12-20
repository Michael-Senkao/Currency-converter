import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.port || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const result = { amount: 10, base: "LRD", value: 500, target: "USD" };
  res.render("index.ejs");
});

app.post("/convert", async (req, res) => {
  try{
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/859f1b5c70a45272682c96b0/pair/${req.body.base}/${req.body.target}/${req.body.amount}`
    );
    console.log(response.data);
    const result = {
      amount: req.body.amount,
      base: req.body.base,
      value: response.data.conversion_result,
      target: req.body.target,
    };
    res.render("index.ejs", { data: result });
  }catch(err){
    res.sendStatus(404);
  }
});
app.listen(port, () => {
  console.log(`Server is listening at port numner ${port}`);
});
