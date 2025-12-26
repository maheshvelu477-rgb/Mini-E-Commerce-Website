//AdminPanel/UpdateProduct.jsx

import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct(){

    const {id} = useParams();  // get the product from URL
    const navigate = useNavigate();

    const[name, setName]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[category, setCategory]=useState("");
    const[stock,setStock]=useState("");
    const[image,setImage]=useState("");
    const [currentImage, setCurrentImage] = useState(""); // To show existing image

    useEffect(()=>{

        const fetchProduct = async()=>{
          
            try{
                const res = await axios.get(`https://mini-e-commerce-website-backend.onrender.com/api/products/${id}`)
                const product = res.data;

                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setStock(product.stock);
                setCurrentImage(product.image);
  
            }

            catch(error){
                console.log(error.message);
                alert("Failted to fetch product");
            }
        };

        fetchProduct();

    },[id]);


    // form handlesubmit

    const handleSubmit =async(e)=>{

        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("stock", stock);
 
        if (image) formData.append("image", image); 

        try{
            await axios.put(` https://mini-e-commerce-website-backend.onrender.com/api/products/${id}`,
                formData
                // {headers:{"Content-Type": "multipart/form-data"},}
            );
            alert("Product updated successfully")

            navigate("/admin");
        }
        catch(error){
            console.log(error.response?.data || error.message);
            alert("Failed to update the product")
        }
    }

    return(
        <>
            <main style={{ display: "flex" }}>
                {/* Sidebar */}
                <aside className="sidebar" >
                    <h2 className="sidebar-title">Admin Panel</h2>
                    <ul className="admin-nav">
                        <li><Link to="/admin" className="nav">Dashboard</Link></li>
                        <li><Link to="/addproduct" className="nav">Add Product</Link></li>
                    </ul>
                </aside>

                <section className="addproduct-container">  
                    <h2>Update Product</h2>
                    <form onSubmit={handleSubmit} className="update-form">

                        <div className="input-fields">
                            <label>Product Name</label>
                            <input type="text" 
                                placeholder="Product name" 
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        <div className="input-fields">
                            <label>Description</label>
                            <input type="text" 
                                placeholder="Description" 
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}
                                required
                            />
                        </div> 
                        <div className="input-fields">
                            <label>Price</label>
                            <input 
                                type="number" 
                                placeholder="Price" 
                                onChange={(e)=>setPrice(e.target.value)}
                                value={price}
                                required
                            />
                        </div> 
                        <div className="input-fields">
                            <label>Category</label>
                            <select
                                onChange={(e)=>setCategory(e.target.value)}
                                value={category}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Accessories">accessories</option>
                                <option value="Bags">Bags</option>
                                <option value="Cosmetics">Cosmetics</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                        </div> 
                        <div className="input-fields">
                            <label>Stock Qty</label>
                            <input 
                                type="number" 
                                placeholder="aavailable qty" 
                                onChange={(e)=>setStock(e.target.value)}
                                value={stock}
                                required
                            />
                        </div>
                        <div className="input-fields">
                            <label>Image</label>
                            {currentImage && (
                                <div>
                                    <img 
                                    src={currentImage} width="100" alt="Current" />
                                </div>
                            )}
                            <input 
                                type="file" 
                                placeholder="Upload product image" 
                                onChange={(e)=>setImage(e.target.files[0])}
                            />
                        </div>

                        <button type="submit">Update</button>
                    
                    </form>

                </section>

            </main>  
        </>
    )
}