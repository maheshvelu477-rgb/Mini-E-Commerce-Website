//controllers/productsController.js

const products = require("../models/productModel");

//fetch all products list

exports.getAllProducts =async(req,res)=>{

    try{
           const allProducts = await products.find();
           res.status(200).json(allProducts)
    }
    catch(error){
          res.status(500).json({message:"Internal Server Error"});
    }
}

// create a new product list

exports.createProduct = async (req,res)=>{

    try{
        const{name,description,price,category,stock}=req.body;
        
        if(!req.file) 
            return res.status(400).json({message:"Image is required"});

        const newProduct = await products.create({
        name,
        description,
        price,
        category,
        stock,
        image: req.file.path || req.file.filename || req.file.url
        });

        res.status(201).json({message:`Product added successfully`, product : newProduct})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:error.message});
    }

}

// find the specific product

exports.findProduct = async(req,res) =>{
    try{
        const product= await products.findById(req.params.id);
        if(!product)
            return res.status(404).json({message: "Product not found"});
        res.json(product)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

// Update the specific product

exports.updateProduct = async(req, res)=>{
    try{
        const product = await products.findById(req.params.id);

        if(!product) return res.status(404).json({message: "Product not found"});
  
        const{name,description,price,category,stock}=req.body;

        if(req.file){
            product.image = req.file.path;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        await product.save();
        res.json(product);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
};



// Delete the specific product

exports.deleteProduct = async (req, res) => {
    try {
        const product = await products.findById(req.params.id);
        
        if (!product) return res.status(404).json({ message: "Product not found" });

        await products.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

