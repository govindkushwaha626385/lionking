const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const pool = require("../db/database");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post(
  "/create-listing",
  // isOwner,
  catchAsyncErrors(async (req, res, next) => {
    const {
      type,
      title,
      price,
      discountPrice,
      priceDetails,
      description,
      state,
      city,
      area,
      gali_no,
      building_no,
      owner_id,
      image_url,
      video_url,
    } = req.body;

    const id = uuidv4().toString();
    try {
      await pool.query(
        "INSERT INTO listing(id,type,title,description,state,city,area,gali_no,building_no,image_public_url,video_public_url,owner_id,price,priceDetails,discountPrice) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) returning *",
        [
          id,
          type,
          title,
          description,
          state,
          city,
          area,
          gali_no,
          building_no,
          image_url,
          video_url,
          owner_id,
          price,
          priceDetails,
          discountPrice,
        ],
        (error, result) => {
          if (error) {
            throw error;
          }
          // console.log("user created successfully");
          res.status(201).json({
            message: "listing Created successfully",
            success: true,
            data: {
              listing: result.rows[0],
            },
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/owner-update-listing/:id",
  // isOwner,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log("id : " + id);

    const {
      title,
      description,
      type,
      price,
      state,
      city,
      area,
      gali_no,
      building_no,
      image_url,
      video_url,
      priceDetails,
      discountPrice,
    } = req.body;

    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          // console.log(result.rows);
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Listing  not found", 400));
          }
          await pool.query(
            "update listing set type = $1,title = $2, description = $3, state = $4, city = $5, area = $6, gali_no = $7, building_no = $8, price = $9, discountPrice = $10, priceDetails = $11, image_public_url = $12, video_public_url = $13 where id = $14 returning *",
            [
              type,
              title,
              description,
              state,
              city,
              area,
              gali_no,
              building_no,
              price,
              discountPrice,
              priceDetails,
              image_url,
              video_url,
              id,
            ],
            (error, result) => {
              if (error) {
                throw error;
              }
              // console.log("result: " + result.rows[0]);
              res.status(201).json({
                success: true,
                message: "Listing updated successfully",
                data: {
                  listing: result.rows[0],
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

// admin all listings
router.get(
  "/admin-all-listings",
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("select * from listing", (error, result) => {
        if (error) {
          throw error;
        }

        // console.log(result.rows);
        res.status(201).json({
          success: true,
          data: {
            listings: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// student all listings
router.get(
  "/all-listings",
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("select * from listing", (error, result) => {
        if (error) {
          throw error;
        }

        // console.log(result.rows);
        res.status(201).json({
          success: true,
          data: {
            listings: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// student singe listing
router.get(
  "/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        (error, result) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            success: true,
            data: {
              listing: result.rows[0],
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
  "/category/:category",
  catchAsyncErrors(async (req, res, next) => {
    const category = req.params.category;
    // console.log("type : " + type);
    try {
      await pool.query(
        "select * from listing where type = $1",
        [category],
        (error, result) => {
          if (error) {
            throw error;
          }
          res.status(201).json({
            success: true,
            data: {
              listings: result.rows,
            },
          });
        }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// delete listing by admin
router.delete(
  "/admin-delete-listing/:id",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("listing not found", 400));
          }
          await pool.query(
            "delete from listing where id = $1",
            [id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                message: "listing deleted Successfully by Admin",
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

// admin verify listing or admin change listing status
router.put(
  "/admin-verify-listing",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    let status = "";
    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          // console.log(result.rows);
          if (result.rows.length == 0) {
            return next(new ErrorHandler("Listing  not found", 400));
          }

          // find current status of listing
          status = result.rows[0].status;

          if (status == "pending") {
            status = "active";
          } else {
            status = "pending";
          }

          // update status of listing
          await pool.query(
            // `update listing set status = ${status} where id = ${id} returning *`,
            "update listing set status = $1 where id = $2 returning *",
            [status, id],
            (error, result) => {
              if (error) {
                throw error;
              }

              res.status(201).json({
                success: true,
                message: "Listing status updated successfully",
                data: {
                  listing: result.rows[0],
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

// all listings of owner
router.get(
  "/owner-all-listings/:id",
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
            return next(new ErrorHandler("Owner not found", 400));
          }
          await pool.query(
            "select * from listing where owner_id = $1",
            [id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                data: {
                  listings: result.rows,
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

// delete lising by owner / vendor
router.delete(
  "/owner-delete-listing/:id",
  // isOwner,
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("listing not found", 400));
          }
          await pool.query(
            "delete from listing where id = $1",
            [id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                message: "listing deleted Successfully by owner",
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

// admin get all listings
router.get(
  "/admin-all-listings",
  // isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await pool.query("SELECT * FROM listing", (error, result) => {
        if (error) {
          throw error;
        }
        res.status(201).json({
          success: true,
          data: {
            listings: result.rows,
          },
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.put(
  "/makeAsFeatured/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("listing not found", 400));
          }
          await pool.query(
            "update listing set featured = $1 where id = $2",
            [true, id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                message: "listing successfully marked as featured",
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

router.put(
  "/remove-from-featured/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await pool.query(
        "select * from listing where id = $1",
        [id],
        async (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length == 0) {
            return next(new ErrorHandler("listing not found", 400));
          }
          await pool.query(
            "update listing set featured = $1 where id = $2",
            [false, id],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                message: "listing successfully removed from featured",
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
  "/owner-all-featured-listings/:id",
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
            return next(new ErrorHandler("Owner not found", 400));
          }
          await pool.query(
            "select * from listing where owner_id = $1 and featured = $2",
            [id, true],
            (error, result) => {
              if (error) {
                throw error;
              }
              res.status(201).json({
                success: true,
                data: {
                  listings: result.rows,
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
