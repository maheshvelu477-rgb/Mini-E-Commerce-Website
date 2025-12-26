import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import TopBar from "./components/TopBar";
import AddToCart from "./components/AddToCart";
import './App.css'
import { useEffect, useState } from "react";
 
//AdminPanel Management
import Admin from "./AdminPanel/Admin";
import AddProduct from "./AdminPanel/AddProduct";
import UpdateProduct from "./AdminPanel/UpdateProduct";


function App() {

  const [selectedCategory, setSelectedCategory]=useState("");

  const [searchTerm,setSearchTerm] = useState("");


  const [cart,setCart] = useState(()=>{
    const storedCart = JSON.parse(localStorage.getItem("addtocart"));
    return storedCart ? (storedCart) : [];
  })

   

  // save the item into LocalStorage

  useEffect(()=>{
    localStorage.setItem("addtocart", JSON.stringify(cart));
  }, [cart]);


  // addtocart handling

  const  handleAddToCart = (product)=>{

     const existing = cart.find((item)=>item._id === product._id )
    
     if(existing){

      setCart(prevCart =>
        prevCart.map(item=>
          item._id === product._id ? {...item, qty: item.qty+1} : item // Increament 
        )
      )
      toast.success("Product successfully added to cart");

 
    }
    else{
      setCart(prevCart =>[...prevCart, {...product, qty:1}]);
        toast.success("Product successfully added to cart");
    }
  }


// Decreament
 const handleDecrementQty =(productId)=>{
 
   
  setCart(prevCart => 
    prevCart
    .map(item=> item._id === productId ? {...item, qty:item.qty -1} : item)
    .filter(item => item.qty > 0)

  )

 
}

//Remove product from the Addtocart page 

const removeProduct = (productId) =>{
  setCart(prevCart=>
    prevCart.filter(item=>item._id !== productId)
  )
  // localStorage.removeItem("addtocart")
  toast.success("Product removed from cart successfully");

  }

  return (
    <>
     
    <BrowserRouter>

       <ToastContainer />        
       <main className="main-content">
       <Routes>
            <Route path="/" element={

              <>
                <Nav cart={cart} setSearchTerm={setSearchTerm}/>
                <TopBar setSelectedCategory={setSelectedCategory} />
                <ProductList  handleAddToCart={handleAddToCart} selectedCategory={selectedCategory} searchTerm={searchTerm}/>
              </>
              
              } />
            <Route path="/addtocart" 
            element={ 
                      <>
                      <Nav cart={cart} setSearchTerm={setSearchTerm}/>
                      <TopBar setSelectedCategory={setSelectedCategory}/>

                      <AddToCart 
                        cart={cart} 
                        handleDecrementQty={handleDecrementQty} 
                        handleAddToCart={handleAddToCart}
                        removeProduct={removeProduct}
                      />
                     </>
                    }  
            />

            <Route path="/admin" element={<Admin />}/> 
             <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/addproduct" element={<AddProduct />} /> 
 
       </Routes>
       </main>    
           
    </BrowserRouter>

    

    </>
  )
}

export default App;
