const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
// const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const pool = require("../db/database");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// create  owner / vendor
router.post(
  "/create-owner",
  catchAsyncErrors(async (req, res, next) => {
    const {
      name,
      email,
      password,
      phone_no,
      state,
      city,
      area,
      gali_no,
      building_no,
    } = req.body;

    await pool.query(
      "SELECT * from owner where email = $1",
      [email],
      async (error, result) => {
        if (error) {
          throw error;
        }
        if (result.rows.length != 0) {
          res.status(201).json({
            success: false,
            message: "email already exist",
          });
          return next(
            new ErrorHandler(
              "Owner already exist! please login to continue",
              400
            )
          );
        }

        const owner = {
          name,
          email,
          password,
          phone_no,
          state,
          city,
          area,
          gali_no,
          building_no,
        };

        const activationToken = createActivationToken(owner);

        const activationUrl = `http://localhost:3000/owner/activation/${activationToken}`;

        try {
          await sendMail({
            email: email,
            subject: "Activate your account",
            message: `Hello ${name}, please click on the link to activate your account: ${activationUrl}`,
          });
          res.status(201).json({
            success: true,
            message: `please check your email:- ${email} to activate your account!`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
    );
  })
);

// create activation token
const createActivationToken = (owner) => {
  return jwt.sign(owner, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate Student account
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newOwner = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newOwner) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        name,
        email,
        password,
        phone_no,
        state,
        city,
        area,
        gali_no,
        building_no,
      } = newOwner;

      const id = uuidv4().toString();
      const salt = await bcrypt.genSalt(10);
      // console.log("salt :- " + salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      // console.log("hashed paddword : " + hashedPassword);

      await pool.query(
        "INSERT INTO owner(id,name,email,password,phone_no,state,city,area,gali_no,building_no) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *",
        [
          id,
          name,
          email,
          hashedPassword,
          phone_no,
          state,
          city,
          area,
          gali_no,
          building_no,
        ],
        (error, result) => {
          if (error) {
            throw error;
          }
          //   console.log("owner created successfully");
          res.status(201).json({
            message: "Owner Created Successfully",
            success: true,
            data: {
              owner: result.rows[0],
            },
          });
        }
      );

      await pool.query(
        "select * from owner where email=$1",
        [email],
        (error, result) => {
          if (error) {
            throw error;
          }
          const student = result.rows[0];
          sendToken(student, 201, res);
        }
      );

      // sendToken(student, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login owner / vendor
router.post(
  "/login-owner",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //   console.log(email);
    //   console.log(password);
    try {
      await pool.query(
        "SELECT * FROM owner where email = $1",
        [email],
        (error, result) => {
          if (error) {
            throw error;
          }
          // console.log(result.rows);
          if (result.rows.length === 0) {
            res.status(400).json({
              success: false,
              message: "Owner not found! please Register first",
            });
            //   console.log("Owner does not exist with email");
            return next(new ErrorHandler("Owner does not exist", 400));
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              async (error, isMatch) => {
                if (error) {
                  throw error;
                }
                if (isMatch) {
                  res.status(201).json({
                    success: true,
                    data: {
                      owner: result.rows[0],
                    },
                    message: "Owner loggedin successfully",
                  });
                } else {
                  // res.status(201).json({
                  //   success: "password",
                  //   message: "Wrong Password",
                  // });
                  res.send("Wrong password");
                  console.log("Wrong Password");
                }
              }
            );
          }
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// owner view profile
router.get(
  "/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
      await pool.query(
        "SELECT * from owner where id = $1",
        [id],
        (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length === 0) {
            // console.log("Student already exist with email : " + email);
            return next(new ErrorHandler("Owner not exist", 400));
          } else {
            res.status(201).json({
              success: true,
              data: {
                owner: result.rows[0],
              },
            });
          }
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update Owner profile
router.put(
  "/owner-update-profile/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const {
      name,
      email,
      password,
      phone_no,
      state,
      city,
      area,
      gali_no,
      building_no,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    // console.log("salt :- " + salt);
    const hashedPassword = await bcrypt.hash(password, salt);

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
            "update owner set name = $1, email = $2, password = $3, phone_no = $4, state = $5, city = $6, area = $7, gali_no = $8, building_no = $9 where id = $10 returning *",
            [
              name,
              email,
              hashedPassword,
              phone_no,
              state,
              city,
              area,
              gali_no,
              building_no,
              id,
            ],
            (error, result) => {
              if (error) {
                throw error;
              }
              // console.log("owner :" + result.rows[0]);
              res.status(201).json({
                success: true,
                message: "Owner profile updated successfully",
                data: {
                  owner: result.rows[0],
                },
              });
            }
          );
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// admin all owners
router.get(
  "/admin-all-owners",
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("select * from owner", (error, result) => {
        if (error) {
          throw error;
        }

        // console.log(result.rows);
        // console.log("Hello");
        res.status(201).json({
          success: true,
          data: {
            owners: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// owner delete account
router.delete(
  "/delete-account/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from owner where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Owner not found", 400));
          }
          await pool.query(
            "delete from owner where id = $1",
            [id],
            (error, result) => {
              if (error) {
                throw error;
              }

              res.status(201).json({
                success: true,
                message: "Account deleted successfully",
              });
            }
          );
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// admin delete Owner
router.delete(
  "/admin-delete-owner/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
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
            "delete from listing where owner_id = $1",
            [id],
            async (error, result) => {
              if (error) {
                throw error;
              }
              await pool.query(
                "delete from subscriptions where owner_id = $1",
                [id],
                async (error, result) => {
                  if (error) {
                    throw error;
                  }

                  await pool.query(
                    "delete from payment where owner_id = $1",
                    [id],
                    async (error, result) => {
                      if (error) {
                        throw error;
                      }

                      await pool.query(
                        "delete from owner where id = $1",
                        [id],
                        (error, result) => {
                          if (error) {
                            throw error;
                          }
                          res.status(200).json({
                            success: true,
                            message: "Owner deleted successfully",
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
