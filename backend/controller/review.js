const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const pool = require("../db/database");

router.get(
  "/listing-reviews/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log("id " + id);
    try {
      await pool.query(
        "SELECT * FROM review where listing_id = $1",
        [id],
        (error, result) => {
          if (error) {
            throw error;
          }
          // console.log("Reviews backend : " + result.rows);;
          res.status(201).json({
            success: true,
            data: {
              reviews: result.rows,
            },
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.post(
  "/create-review",
  catchAsyncErrors(async (req, res, next) => {
    const {listing_id, name, rating, content, student_id} = req.body;
    // const owner_id = id;
    try {
      await pool.query(
        "SELECT * FROM listing where id = $1",
        [listing_id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Listing not found", 400));
          }

          await pool.query(
            "insert into review(listing_id,name,rating,content,student_id) values($1,$2,$3,$4,$5) returning *",
            [listing_id,name, rating,content, student_id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                message: "Review Submitted successfully",
                data: {
                  review: result.rows[0],
                },
              });
            }
          );
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
