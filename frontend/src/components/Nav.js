import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookie from "js-cookie"

function Nav() {
    let navigate = useNavigate()
    let [search_value, set_search_value] = useState("")
    let [token , set_token] =  useState(null)

    useEffect(()=>{
        let token = Cookie.get("client_token");
        if(token){
            set_token(token)
        }
    }, [])

    let log_out = ()=>{
        Cookie.remove("client_token");
        window.location.reload()
    }
    
  return (
    <nav className="navbar">
        <div className='container w100'>
            <div className='flex flex_row space-items w100'>
                <div className='col'>
                    <Link className='h-a' to={"/"}>Housing Advisor</Link>
                </div>
                <div className='col flex flex_row center'>
                  <div className='searchbar-container'>
                    <div className='searchbar'>
                        <input value={search_value} placeholder='Search Location' onChange={(e)=> set_search_value(e.target.value)} className='search'/> 
                        <button className='btn-search'><span className='bi bi-search'></span></button>
                    </div>
                  </div>
                </div>
                <div className='col nav-links flex justify-end'>
                    <ul className='flex flex_row'>
                        <li className='link-btn'>
                            <Link className='nav-link' to={"/login/host"}>Host Management</Link>
                        </li>
                        <li className='profile-links shadow-sm'>
                            <div className='flex flex_row profile-badge'>
                                <span className='bi bi-list'> </span>
                                <span className='bi bi-person-fill'></span>
                            </div>
                            
                            <div className="popup-menu">
                                {
                                    !token ? (
                                        <>
                                         <Link to = "/login/client">Log In</Link>
                                         <Link to = "/client/signup">Sign Up</Link>
                                        </>
                                    ) : (
                                        <>
                                             <Link to = {`/profile/${token}`}>Profile</Link>
                                             <Link to = "" onClick={log_out}>Log out</Link>
                                        </>
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>            
        </div>
    </nav>
  )
}

export default React.memo(Nav)