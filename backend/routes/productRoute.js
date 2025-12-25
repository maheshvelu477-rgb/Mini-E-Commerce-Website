//routes/productModel.js

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const{getAllProducts, createProduct, findProduct, updateProduct , deleteProduct}= require("../controllers/productsController");

router.get("/", getAllProducts);
router.get("/:id", findProduct);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id",deleteProduct);

module.exports=router;