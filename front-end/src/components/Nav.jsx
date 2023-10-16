import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"

function Nav() {
  // check if users data is in local storage
  const auth=localStorage.getItem("user");
  // Show logout if user have signup and Show signup if user is not loggedin on line 17
  return (
    <div>
        <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/update">Update Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            
            
            <li>{auth ? <Link to="/logout">Logout</Link> :
            <Link to="/signup">Sign Up</Link>}</li>
        </ul>
    </div>
  )
}

                
                
                

export default Nav