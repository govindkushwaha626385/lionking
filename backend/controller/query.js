const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const pool = require("../db/database");
const { v4: uuidv4 } = require("uuid");

router.post(
  "/create-query",
  catchAsyncErrors(async (req, res, next) => {
    const { student_id, name, email, phone_no, message } = req.body;
    // const owner_id = id;
    try {
      await pool.query(
        "SELECT * FROM student where id = $1",
        [student_id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            res.status(201).json({
              success: false,
              message: "Student not Found",
            });
            return next(new ErrorHandler("Student not found", 400));
          }
            const id = uuidv4().toString();
          await pool.query(
            "insert into query(id,student_id, name, email, phone_no, message) values($1,$2,$3,$4,$5,$6) returning *",
            [id,student_id, name, email, phone_no, message],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                message: "Query Submitted successfully",
                query: {
                  query: result.rows[0],
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

router.get(
  "/admin-all-queries",
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("SELECT * FROM query", (error, result) => {
        if (error) {
          throw error;
        }
        res.status(201).json({
          success: true,
          data: {
            queries: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
