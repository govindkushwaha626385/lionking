const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const pool = require("../db/database");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post(
  "/owner-buy-subscription",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { price, owner_id, paymentInfo, type, maxListings, maxFeatured } =
        req.body;

      //   group cart items by shopId
      id = uuidv4().toString();
      await pool.query(
        `insert into subscriptions(id,owner_id,amount,type, maxlistings, maxfeatured) values($1,$2,$3,$4,$5,$6)`,
        [id, owner_id, price, type, maxListings, maxFeatured],
        (error, result) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            success: true
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/admin-all-subscriptions",
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("select * from subscriptions", (error, result) => {
        if (error) {
          throw error;
        }

        res.status(201).json({
          success: true,
          data: {
            subscriptions: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/owner-all-subscriptions/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
      await pool.query(
        "select * from owner where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          // console.log(result.rows[0]);
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Owner not found", 400));
          }

          await pool.query(
            "select * from subscriptions where owner_id = $1",
            [id],
            (error, result) => {
              if (error) {
                throw error;
              }

              res.status(201).json({
                success: true,
                data: {
                  subscriptions: result.rows,
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
  "/isActiveSubscriptionExist/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log("ID : ", id);

    try {
      await pool.query(
        "select * from subscriptions where owner_id = $1 AND status = $2",
        [id, "active"],
        (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length === 0) {
            res.status(201).json({
              success: true,
              isExist: false,
            });
          } else {
            res.status(201).json({
              success: true,
              isExist: true,
              data :{
                subscription : result.rows[0] 
              }
            });
          }
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.put(
  "/owner-deactivate-subscription/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log("ID : ", id);

    try {
      await pool.query(
        "update subscriptions set status = $1 where id = $2",
        ["end", id],
        (error, result) => {
          if (error) {
            throw error;
          }

          res.status(201).json({
            success: true,
            message: "Subscription Deactivated Successfully",
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
module.exports = router;
