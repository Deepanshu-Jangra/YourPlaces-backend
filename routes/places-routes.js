const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").trim().notEmpty(),
    check("description").trim().isLength({ min: 5 }),
    check("address").trim().notEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title").trim().notEmpty(),
    check("description").trim().isLength({ min: 5 }),
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
