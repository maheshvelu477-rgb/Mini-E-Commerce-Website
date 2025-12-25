export default function TopBar({setSelectedCategory}){

    return(
        <>
            <nav className="top-bar">
                <ul className="nav-links">
                    <li onClick={()=>setSelectedCategory("")}>All</li>
                    <li onClick={()=>setSelectedCategory("Dresses")}>Dresses</li>
                    <li onClick={()=>setSelectedCategory("Accessories")}>Accessories</li>
                    <li onClick={()=>setSelectedCategory("Bags")}>Bags</li>
                    <li onClick={()=>setSelectedCategory("Cosmetics")}>Cosmetics</li>
                    <li onClick={()=>setSelectedCategory("Electronics")}>Electronics</li>
                </ul>
            </nav>
        </>
    )
}