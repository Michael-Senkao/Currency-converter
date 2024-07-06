import express from "express";  // Importing the express module for creating a web server
import bodyParser from "body-parser";  // Importing body-parser to parse incoming request bodies
import axios from "axios";  // Importing axios for making HTTP requests
import dtenv from "dotenv";  // Importing dotenv to load environment variables from a .env file

dtenv.config();  // Configuring dotenv to read environment variables
const app = express();  // Creating an express application
const port = process.env.PORT;  // Getting the port number from environment variables
const apiKey = process.env.KEY;  // Getting the API key from environment variables
app.use(express.static("public"));  // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true }));  // Using body-parser middleware to parse URL-encoded bodies

// Route to handle GET requests to the root URL
app.get("/", (req, res) => {
  const result = { amount: 10, base: "LRD", value: 500, target: "USD" };  // Example result object (hardcoded)
  res.render("index.ejs");  // Rendering the "index.ejs" view
});

// Route to handle POST requests to the /convert URL
app.post("/convert", async (req, res) => {
  try {
    // Making a GET request to the external API to get the conversion rate
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${req.body.base}/${req.body.target}/${req.body.amount}`
    );
    // Creating a result object with the conversion data
    const result = {
      amount: req.body.amount,
      base: req.body.base,
      value: response.data.conversion_result,
      target: req.body.target,
    };
    res.render("index.ejs", { data: result });  // Rendering the "index.ejs" view with the result data
  } catch (err) {
    res.sendStatus(404);  // Sending a 404 status if there's an error
  }
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server is listening at port number ${port}`);
});
