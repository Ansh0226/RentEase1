const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();
    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({ message: "Fail to create Listing", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS WITH FILTERING */
router.get("/", async (req, res) => {
  const { category, city, province, country } = req.query;

  try {
    let filter = {};

    if (category) filter.category = new RegExp(`^${category}$`, "i");
    if (city) filter.city = new RegExp(`^${city}$`, "i");
    if (province) filter.province = new RegExp(`^${province}$`, "i");
    if (country) filter.country = new RegExp(`^${country}$`, "i");

    const listings = await Listing.find(filter).populate("creator");
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET UNIQUE LOCATIONS */
router.get("/locations/all", async (req, res) => {
  try {
    const locations = await Listing.aggregate([
      {
        $project: {
          city: { $trim: { input: "$city" } },
          province: { $trim: { input: "$province" } },
          country: { $trim: { input: "$country" } },
        }
      },
      {
        $match: {
          city: { $nin: [null, ""] },
          province: { $nin: [null, ""] },
          country: { $nin: [null, ""] }
        }
      },
      {
        $group: {
          _id: {
            city: { $toLower: "$city" },
            province: { $toLower: "$province" },
            country: { $toLower: "$country" },
          }
        }
      },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          province: "$_id.province",
          country: "$_id.country"
        }
      },
      {
        $sort: { country: 1, province: 1, city: 1 }
      }
    ]);

    res.status(200).json(locations);
  } catch (err) {
    console.error("Location fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch locations", error: err.message });
  }
});


/* GET LISTINGS BY SEARCH (updated to include location) */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { province: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTING BY ID */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res.status(404).json({ message: "listing not found!", error: err.message });
  }
});

module.exports = router;
