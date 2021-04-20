import React from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

const Nav = () => {
    return (
        <nav>
            
            <Link style={navstyle} to="/">
                <div style={{ fontSize: "30px"}}>
                    Home
                </div>
            </Link>

            <ul className="nav-links">
                <Link style={{ color:"white", textDecoration: "none"}} to="/about">
                    <div style={{ fontSize: "30px"}}>
                        About
                    </div>
                </Link>
            </ul>
             
        </nav>
    )
}

const navstyle={
    color:"white", 
    textDecoration: "none"
}

export default Nav
