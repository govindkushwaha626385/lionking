const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const pool = require("../db/database");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();

router.post(
  "/admin-login",
  //   isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      await pool.query(
        "select * from admin where id = $1 and password = $2",
        [email, password],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            res.status(201).json({
              success : false,
              message : "Please Enter Correct email and password"
            })
            return next(new ErrorHandler("admin not found", 400));
          }
          if (password != result.rows[0].password) {
            return next(new ErrorHandler("please enter correct password", 400));
          }

          res.status(201).json({
            success: true,
            message: "Admin loggedin successfully",
            data: {
              admin: result.rows[0],
            },
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/admin-earning",
  //   isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query(
        "select sum(amount) as amount from payment",
      
        async (error, result) => {
          if (error) {
            throw error;
          }

          res.status(201).json({
            success: true,
            data: {
              amount: result.rows[0],
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
