//AdminPanel/AddProduct.jsx
  
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AddProduct(){

    const navigate = useNavigate();

    const[name, setName]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[category, setCategory]=useState("");
    const[stock,setStock]=useState("");
    const[image,setImage]=useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!image){
            alert("please select an image");
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("stock", stock);
        formData.append("image", image);


        try {
                await axios.post("http://localhost:8000/api/products", 
                formData,
                {headers:{"Content-Type" : "multipart/form-data"}
                });
            

                alert("product added successfully");

                setName("");
                setDescription("");
                setPrice("");
                setCategory("");
                setStock("");
                setImage(null);

                navigate("/admin")
            }

        catch(error){
                console.log(error.response?.data || error.message);
                alert("Failed to add product")
        }
    }

    return(
        <>
            <main className="addproduct-main" style={{ display: "flex" }}>
            
                {/* Sidebar */}
                <aside className="sidebar">
                    <h2 className="sidebar-title">Admin Panel</h2>
                    <ul className="admin-nav">
                        <li><Link to="/admin" className="nav">Dashboard</Link></li>
                        <li><Link to="/addproduct" className="nav">Add Product</Link></li>
                    </ul>
                </aside>

                <section className="addproduct-container">
                    <h1 style={{
                        padding:"40px"
                        }}>Add Products
                    </h1>
                    <form className="addproduct-form" onSubmit={handleSubmit}>
                        <div className="input-fields">
                            <label for="name">Product Name : </label>
                            <input type="text" 
                            placeholder="Product name" 
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            required
                            id="name"
                            />
                        </div>
                        <div className="input-fields">
                            <label>Description : </label>
                            <input type="text" 
                            placeholder="Description" 
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                            required
                            />
                        </div> 
                        <div className="input-fields">
                            <label>Price : </label>
                            <input 
                            type="number" 
                            placeholder="Price" 
                            onChange={(e)=>setPrice(e.target.value)}
                            value={price}
                            required
                            />
                        </div> 
                        <div className="input-fields">
                            <label>Category : </label>
                            <select className="selection"
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
                            <label>Stock Quantity : </label>
                            <input 
                            type="number" 
                            placeholder="aavailable qty" 
                            onChange={(e)=>setStock(e.target.value)}
                            value={stock}
                            required
                            />
                        </div>
                        <div className="input-fields">
                            <label>Product Image : </label>
                            <input 
                            type="file" 
                            // placeholder="Upload product image" 
                            onChange={(e)=>setImage(e.target.files[0])}
                            required
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </section>
            </main>
        </>
    )
}