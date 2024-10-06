const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");
// const catchAsyncErrors = require("./middleware/catchAsyncErrors");
const pool = require("./db/database");
// const ErrorHandler = require("./utils/ErrorHandler");

app.use(
  cors({
    origin: "https://www.flatmart.in",
    // credentials: true,
  })
);
// const corsOptions = {
//   origin: "https://lionking-frontend.vercel.app", // Your frontend domain
//   methods: "GET,POST,PUT,DELETE", // Define allowed HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Define allowed headers
//   credentials: true,
//   optionsSuccessStatus: 200, // Success status code for preflight
// };

// // Use CORS globally for routes
// app.use(cors(corsOptions));

// app.use(express.static('public'));

pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

app.use(express.json());
app.use(cookieParser());
// app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use("/test", async (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'sha256-DLhXEPFE88iWNhZp6h4GV/fLP4Xjx+1ydOYrtaG4jfg='"
  );
  next();
});
// app.options('*', cors()); // Handle preflight requests

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const student = require("./controller/student");
const listing = require("./controller/listing");
const owner = require("./controller/owner");
const subscription = require("./controller/subscription");
const admin = require("./controller/admin");
const payment = require("./controller/payment");
const review = require("./controller/review");
const query = require("./controller/query");
const wishlist = require("./controller/wishlist");

app.use("/api/v2/admin", admin);
// app.use("/api/v2/listings", listing)
app.use("/api/v2/student", student);
app.use("/api/v2/listing", listing);
app.use("/api/v2/owner", owner);
app.use("/api/v2/subscription", subscription);
app.use("/api/v2/payment", payment);
app.use("/api/v2/review", review);
app.use("/api/v2/query", query);
app.use("/api/v2/wishlist", wishlist);

app.use(ErrorHandler);
module.exports = app;
