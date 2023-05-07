import React from 'react';
import {Link , useNavigate } from 'react-router-dom';

const Nav=()=>{
     const auth = localStorage.getItem('user');
     const navigate = useNavigate();
     

     const logout =()=>{
       localStorage.clear();
       navigate('/signup')
     }
   
    return(
        <div>
            <img className='logo' src = 'https://cdn.shopify.com/s/files/1/0445/4442/6135/files/nishalogo_d473c022-36dc-4251-a772-27d9bccbd2ea.png?v=1600659200' alt = "logo" ></img>
           {auth ? <ul className='nav-ul'>
                <li><Link to = "/" >Products</Link></li>
                <li><Link to = "/add" >Add Products</Link></li>
                <li><Link to = "/update" >Update Products </Link></li>
                {/* <li><Link to = "/profile" >Profile </Link></li> */}
                <li><Link onClick = {logout} to = "/signup" >Logout ({JSON.parse(auth).name})</Link></li>

            </ul>
            : <ul className='nav-ul nav-right'>
                <li><Link to = "/signup" >SignUp </Link> </li>
                   <li><Link to = "/login" >Login </Link></li>
            </ul>
}
        </div>
    )
}
export default Nav