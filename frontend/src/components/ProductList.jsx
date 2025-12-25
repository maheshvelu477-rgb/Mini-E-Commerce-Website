import { Link } from "react-router-dom"
import F1 from "../assets/react.svg";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function ProductList({handleAddToCart, selectedCategory,searchTerm}){

    const [Products, setProducts] = useState([]);
    const [error,setError] =useState("");

    useEffect(()=>{

        const fetchProducts = async()=>{

            try{
                const res = await axios.get("https://mini-e-commerce-website-h4r3.vercel.app/api/products");
                setProducts(res.data)
            }
            catch(error){
                setError("Unable to fetch the products");
                console.log(error.message);
            }

        };
        fetchProducts();
    },[]);

 

    const filteredProducts = Products.filter((product) => {
  const matchCategory =
    !selectedCategory || product.category === selectedCategory;

  const matchSearch =
    product.name.toLowerCase().includes(searchTerm.toLowerCase());

  return matchCategory && matchSearch;
});

    return(
        <>
            <div className="product-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                    <div className="product-cards" key={product._id}>
                        <img
                        src={`https://mini-e-commerce-website-h4r3.vercel.app/upload/${product.image}`}
                        alt={product.name}
                        />
                        <h3>{product.name}</h3>
                        <h3>${product.price}</h3>
                        <button onClick={() => handleAddToCart(product)}>
                        Add to Cart
                        </button>
                        <Link to="/addtocart">
                        <button>Go to Cart</button>
                        </Link>
                    </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </>
    )
}