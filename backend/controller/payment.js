const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const pool = require("../db/database");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../utils/sendMail");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Razorpay = require("razorpay");
// const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const RAZORPAY_ID_KEY = process.env.RAZORPAY_ID_KEY;

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Homeaway",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.post(
  "/payment-process",
  catchAsyncErrors(async (req, res, next) => {
    const {
      price,
      owner_id,
      type,
      maxListings,
      maxFeatured,
      owner_email,
      description,
      owner_name,
      owner_phone_no,
    } = req.body;

    // console.log("Payment data : ", req.body);

    try {
      const amount = price * 100;
      const options = {
        amount: amount,
        currency: "INR",
        receipt: owner_email,
      };

      razorpayInstance.orders.create(options, async (err, order) => {
        if (!err) {
          // insert data into payment table
          let id = uuidv4().toString();
          // console.log("Payment id :", id);

          try {
            await pool.query(
              `insert into payment(id,owner_id,amount,status) values($1,$2,$3,$4)`,
              [id, owner_id, price, "success"],
              (error, result) => {
                if (error) {
                  throw error;
                }

                // console.log("Data inseted into payment table");
              }
            );
            id = uuidv4().toString();
            await pool.query(
              `insert into subscriptions(id,owner_id,amount,type, maxlistings, maxfeatured) values($1,$2,$3,$4,$5,$6)`,
              [id, owner_id, price, type, maxListings, maxFeatured],
              (error, result) => {
                if (error) {
                  throw error;
                }
                // console.log("Data inseted into subscriptions table");
              }
            );

            await sendMail({
              email: owner_email,
              subject: "Subscription successfully added into your account",
              message: `Dear User,

            Your order for ${type} has been successfully created.

            Order Details:
            -order ID: ${order.id}
              
            - Price: ₹${price}

            - Now you can add up to ${maxListings} Listings.
            - and mark up to ${maxFeatured} Listings as featured.
            
            - now enjoy your purchase.
            Thank you for your purchase!

            Best Regards,
            Homeaway`,
            });
            // console.log(
            //   "Data successfully inserted into payment and subscription table"
            // );
          } catch (error) {
            return next(new ErrorHandler(error, 500));
          }

          res.status(201).json({
            success: true,
            msg: "Order Created Successfully",
            order_id: order.id,
            amount: amount,
            key_id: RAZORPAY_ID_KEY,
            product_name: type,
            description: description,
            contact: owner_phone_no,
            name: owner_name,
            email: owner_email,
          });
        } else {
          res
            .status(400)
            .send({ success: false, msg: "Something went wrong!" });
        }
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

router.get(
  "/admin-all-payments",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("select * from payment", (error, result) => {
        if (error) {
          throw error;
        }

        // console.log(result.rows);
        res.status(201).json({
          success: true,
          data: {
            payments: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/owner-all-payments/:id",
  // isAdmin,
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
          // console.log(result.rows);
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Owner  not found", 400));
          }
          await pool.query(
            "select * from payment where owner_id = $1",
            [id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                data: {
                  payments: result.rows,
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
