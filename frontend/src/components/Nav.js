import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    let [search_value, set_search_value] = useState("")

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
                            <Link className='nav-link' to={"/host/homes"}>List Boarding House</Link>
                        </li>
                        <li className='profile-links shadow-sm'>
                            <div className='flex flex_row profile-badge'>
                                <span className='bi bi-list'> </span>
                                <span className='bi bi-person-fill'></span>
                            </div>
                            
                            <div className="popup-menu">
                            <Link to = "/client/signin">Sign In</Link>
                            <Link to = "/client/signup">Sign Up</Link>
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