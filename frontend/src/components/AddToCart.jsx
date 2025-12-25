import { Link } from "react-router-dom";

export default function AddToCart({cart =[],handleDecrementQty,handleAddToCart, removeProduct}){
       
    const total = cart.reduce((sum, item)=> sum + item.qty , 0);
    
    return(
        <>
            <div className="addtocart-container">
                <h1>Add to Cart Page</h1>
                    {total > 0 ? 
                       (<div className="container-addtocart">
                            {cart.map((pro)=>(
                            <div key={pro._id} className="cards-addtocart">
                                <img 
                                    src={`http://localhost:8000/upload/${pro.image}`}
                                    alt="img"
                                />
                                <h3>{pro.name}</h3>
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
                        <div>No products</div>)    
                    }
                <p><Link to="/" className="continue-shoppingBtn"> Continue browsing <span>{"\u2192"}</span></Link></p>
            </div>
        </>
    )
}