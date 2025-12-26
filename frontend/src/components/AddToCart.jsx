import { Link } from "react-router-dom";
import image from "../assets/image1.jpg";

export default function AddToCart({cart =[],handleDecrementQty,handleAddToCart, removeProduct}){
       
    const total = cart.reduce((sum, item)=> sum + item.qty , 0);
    
    return(
        <>
            <div className="addtocart-container">
                <h1>Your SnappyCart</h1>
                     {total > 0 ? 
                       (<div className="container-addtocart">
                            {cart.map((pro)=>(
                            <div key={pro._id} className="cards-addtocart">
                                <img 
                                    src={pro.image}
                                    alt={pro.name}
                                />
                                <p>{pro.name}</p>
                                <h3>${pro.price}</h3>
                                <div className="quanity-change">
                                    <button onClick={()=>handleAddToCart(pro)}>+</button> 
                                    {pro.qty > 0 ? (<h2>{pro.qty}</h2>) : 0 }   
                                    <button onClick={()=>handleDecrementQty(pro._id)}>-</button>                           
                                </div>
                                <button 
                                    onClick={()=>removeProduct(pro._id)}>
                                    <i 
                                        className="fa fa-trash" 
                                        style={{fontSize:"20px"}}
                                    >
                                    </i>
                                </button>
                            </div>
                            ))}
                        </div>) : (
                        <>
                        <img style={{width:"300px", height:"300px", marginTop:"20px"}} src={image} alt="img"/>    
                        <h3>No products</h3>
                        </>
                        )   
                    }
                 <p><Link to="/" className="continue-shoppingBtn"> Continue browsing <span>{"\u2192"}</span></Link></p>
            </div>
        </>
    )
}