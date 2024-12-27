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

// admin all students
router.get(
  "/admin-all-students",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("SELECT * FROM student", (error, result) => {
        if (error) {
          throw error;
        }

        res.status(201).json({
          success: true,
          data: {
            students: result.rows,
          },
        });
        // console.log(result.rows);
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// admin delete Student
router.delete(
  "/admin-delete-student/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from student where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Student not found", 400));
          }
          await pool.query(
            "delete from wishlist where student_id = $1",
            [id],
            async (error, result) => {
              if (error) {
                throw error;
              }
              await pool.query(
                "delete from review where student_id = $1",
                [id],
                async (error, rsult) => {
                  if (error) {
                    throw error;
                  }
                  await pool.query(
                    "delete from query where student_id = $1",
                    [id],
                    async (error, rsult) => {
                      if (error) {
                        throw error;
                      }
                      await pool.query(
                        "delete from student where id = $1",
                        [id],
                        (error, result) => {
                          if (error) {
                            throw error;
                          }

                          res.status(201).json({
                            success: true,
                            message: "Student deleted successfully",
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

// student delete account
router.delete(
  "/delete-account/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from student where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Student not found", 400));
          }
          await pool.query(
            "delete from wishlist where student_id = $1",
            [id],
            async (error, result) => {
              if (error) {
                throw error;
              }
              await pool.query(
                "delete from review where student_id = $1",
                [id],
                async (error, result) => {
                  if (error) {
                    throw error;
                  }
                  await pool.query(
                    "delete from query where student_id = $1",
                    [id],
                    async (error, result) => {
                      if (error) {
                        throw error;
                      }
                      await pool.query(
                        "delete from student where id = $1",
                        [id],
                        (error, result) => {
                          if (error) {
                            throw error;
                          }

                          res.status(201).json({
                            success: true,
                            message: "Student deleted successfully",
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

// register student
router.post(
  "/create-student",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phone_no, institute_name, course } =
      req.body;
    try {
      await pool.query(
        "SELECT * from student where email = $1",
        [email],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length !== 0) {
            res.status(201).json({
              success: false,
              message: "email already exist",
            });
            return next(
              new ErrorHandler(
                "student already exist! please login to continue",
                400
              )
            );
          }

          const student = {
            name,
            email,
            password,
            phone_no,
            institute_name,
            course,
          };

          // console.log("Student :", student);
          const activationToken = createActivationToken(student);

          const activationUrl = `https://lionking-frontend.vercel.app/activation/${activationToken}`;

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
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// create activation token
const createActivationToken = (student) => {
  return jwt.sign(student, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate Student account
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newStudent = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newStudent) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, phone_no, institute_name, course } =
        newStudent;

      await pool.query(
        "SELECT * from student where email = $1",
        [email],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length != 0) {
            return next(
              new ErrorHandler(
                "student already exist! please login to continue",
                400
              )
            );
          }

          const id = uuidv4().toString();
          const salt = await bcrypt.genSalt(10);
          // console.log("salt :- " + salt);
          const hashedPassword = await bcrypt.hash(password, salt);
          // console.log("hashed paddword : " + hashedPassword);

          await pool.query(
            "INSERT INTO student(id,name,email,password,phone_no,institute_name,course) values ($1, $2, $3, $4, $5, $6, $7) returning *",
            [id, name, email, hashedPassword, phone_no, institute_name, course],
            (error, result) => {
              if (error) {
                throw error;
              }
              // console.log("user created successfully");
              const student = result.rows[0];
              res.status(201).json({
                success: true,
                message: "Student Created successfully",
                data: {
                  student: result.rows[0],
                },
              });
            }
          );

          await pool.query(
            "select * from student where email=$1",
            [email],
            (error, result) => {
              if (error) {
                throw error;
              }
              const student = result.rows[0];
              sendToken(student, 201, res);
            }
          );
        }
      );

      // sendToken(student, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login student
router.post(
  "/login-student",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    try {
      await pool.query(
        "SELECT * FROM student where email = $1",
        [email],
        (error, result) => {
          if (error) {
            throw error;
          }
          // console.log(result.rows);
          if (result.rows.length === 0) {
            res.status(400).json({
              success: false,
              message: "email not found! please Register to continue",
            });
            return next(new ErrorHandler("Student does not exist", 400));
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
                    message: "Student loggedin successfully",
                    data: {
                      student: result.rows[0],
                    },
                  });
                } else {
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

// student view profile (load student)

router.get(
  "/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
      await pool.query(
        "SELECT * from student where id = $1",
        [id],
        (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Student not exist", 400));
          } else {
            res.status(201).json({
              success: true,
              data: {
                student: result.rows[0],
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

// update student profile
router.put(
  "/update-profile/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password, institute_name, course, phone_no } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    // console.log("salt :- " + salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await pool.query(
        "select * from student where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length === 0) {
            return next(new ErrorHandler("Student not found", 400));
          }
          await pool.query(
            "update student set name = $1, email = $2, password = $3,institute_name = $4, course = $5, phone_no = $6 where id = $7 returning *",
            [name, email, hashedPassword, institute_name, course, phone_no, id],
            (error, result) => {
              if (error) {
                throw error;
              }

              res.status(201).json({
                success: true,
                message: "Student profile updated successfully",
                data: {
                  student: result.rows[0],
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

router.put(
  "/update-password",
  catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword, id } = req.body;
    // console.log("ID : ", id.id);
    // console.log(req.body);

    await pool.query(
      "SELECT * FROM student where id = $1",
      [id],
      (error, result) => {
        if (error) {
          throw error;
        }
        // console.log(result.rows);
        if (result.rows.length === 0) {
          return next(new ErrorHandler("Student does not exist", 400));
        } else {
          bcrypt.compare(
            oldPassword,
            result.rows[0].password,
            async (error, isMatch) => {
              if (error) {
                throw error;
              }
              if (isMatch) {
                const salt = await bcrypt.genSalt(10);
                const hashedNewPassword = await bcrypt.hash(newPassword, salt);

                await pool.query(
                  "update student set password = $1 where id = $2",
                  [hashedNewPassword, id],
                  (error, result) => {
                    if (error) {
                      throw error;
                    }

                    res.status(201).json({
                      success: true,
                      message: "Password updated successfully",
                    });
                  }
                );
              } else {
                res.status(201).json({
                  success: false,
                  message: "Enter Correct old Password",
                });
              }
            }
          );
        }
      }
    );
  })
);

router.get(
  "/get-friends/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
      await pool.query(
        "SELECT * from student where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Student not exist", 400));
          } else {
            const institute_name = result.rows[0].institute_name;
            const course = result.rows[0].course;

            await pool.query(
              "select * from student where id not in($1)",
              [id],
              (error, result) => {
                if (error) {
                  throw error;
                }

                const friends = result.rows.filter(
                  (row) =>
                    row.institute_name
                      .toLowerCase()
                      .includes(institute_name.toLowerCase()) &&
                    row.course.toLowerCase().includes(course.toLowerCase())
                );

                res.status(201).json({
                  success: true,
                  data: {
                    friends: friends,
                  },
                });
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

module.exports = router;
