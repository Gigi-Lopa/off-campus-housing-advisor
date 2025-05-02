import React from 'react'
import Listing from './Listing'
import { MapPin } from 'lucide-react'
export default function Listings() {
  return (
    <div className='w100 listings'>
        <div className='container w100'>
            <div className='flex flex_row space-items filters-tab'>
                <div className='col'>
                    <h5 style={{fontWeight: "550", fontSize : "1.4rem"}}><MapPin style={{marginRight:"10px", marginTop:"4px",justifySelf:"center"}}/> Shashi</h5>
                </div>
                <div className='col flex justify-end'></div>
                    <div className='filters'>
                        <span className='bi bi-filte2r'></span>
                    </div>
            </div>
            <br/>
            <div className='row' style={{paddingTop: "0px"}}>
                <Listing/>
                <Listing/>
                <Listing/>
                <Listing/>
                <Listing/>
            </div>
        </div>
    </div>
  )
}
