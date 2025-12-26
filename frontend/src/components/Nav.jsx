import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
 
export default function Nav({cart,setSearchTerm}) {

   const [temp ,setTemp] =useState("");

    const total= cart.reduce((sum,item)=>sum + item.qty , 0);

    return (
        <div className="navbar">
          <div className="logo" >
            <img src={logo} alt="logo" />
            <h2>SnappyCart</h2>
          </div>
          <div className="search">
            <input 
              type="text" 
              placeholder="Search your products ...." 
              onChange={(e)=>setTemp(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  setSearchTerm(temp)
                }
              }}
              />
            <button onClick={(e) => setSearchTerm(temp)}>
              <i className="fa fa-search"></i>
            </button>
          </div>
          <button className="addtocart">
            <Link to="/addtocart">
              {total > 0 ?(<i className="fa fa-shopping-cart"></i>) : <i className="fa fa-cart-plus"></i>}
              {total > 0 && <span className="cart-badge">{total}</span>}
            </Link>
          </button>
          <button>Login</button>
        </div>
    );
}
