import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div>
            <ul>
                <li><Link to="/" style={{color:"white",textDecoration:"none"}}>Task</Link></li>
                <li><Link to="/create" style={{color:"white",textDecoration:"none"}}>Create Task</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
