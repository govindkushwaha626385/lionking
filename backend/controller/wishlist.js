const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const pool = require("../db/database");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();

router.get(
  "/isAdded",
  catchAsyncErrors(async (req, res, next) => {
    const { s_id, listing_id } = req.body;

    try {
      await pool.query(
        "select * from wishlist where student_id = $1 AND listing_id = $2",
        [s_id, listing_id],
        (error, result) => {
          if (error) {
            throw error;
          }

          if (result.rows.length == 0) {
            res.status(201).json({
              success: true,
              isExist: false,
            });
          } else {
            res.status(201).json({
              success: true,
              isExist: true,
            });
          }
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// add item into wishlist
router.post(
  "/add-to-wishlist",
  catchAsyncErrors(async (req, res, next) => {
    const { student_id, listing_id } = req.body;
    try {
      await pool.query(
        "insert into wishlist (student_id, listing_id) values($1,$2)",
        [student_id, listing_id],
        (error, result) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            success: true,
            message: "Successfully added to wishlist",
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete listing from wishlist
router.delete(
  "/remove-from-wishlist",
  catchAsyncErrors(async (req, res, next) => {
    const { student_id, listing_id } = req.body;
    try {
      await pool.query(
        "delete from wishlist where  student_id = $1 AND listing_id = $2",
        [student_id, listing_id],
        (error, result) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            success: true,
            message: "Successfully removed from wishlist",
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/get-wishlists/:id",
  catchAsyncErrors(async (req, res, next) => {
    const student_id = req.params.id;

    // console.log("ID ", student_id);
    try {
      await pool.query(
        "select * from wishlist where  student_id = $1",
        [student_id],
        (error, result) => {
          if (error) {
            throw error;
          }

          // console.log("Backend Wishlists : ", result.rows);
          res.status(201).json({
            success: true,
            data: {
              wishlists: result.rows,
            },
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
