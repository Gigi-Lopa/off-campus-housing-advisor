import React from 'react'
import sample from "../styles/img/q.jpg"

function OtherListing({listing}) {
  return (
    <div className='col-md-3'>
        <div className='other-listing-card'>
            <div className='ol-img'>
                <img 
                    src={`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing.images}`}
                    alt='other-listing'
                    className='img-fluid'
                />
            </div>
            <div className='ol-inf'>
                <div className='flex flex_row space-items'>
                    <h4>{listing.name}</h4>
                    <div>
                        <span className='bi bi-star-fill' style={{marginRight :"5px", fontSize:"0.8rem"}}></span>
                        <span style={{fontSize:"1rem"}}>{listing.average_rating}</span>
                    </div>
                </div>
                <div className='flex flex_col'>
                    <span className='tertiary-color'>{listing.location}, Bindura</span>
                    <span className='tertiary-color'> ${listing.rent} / m</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(OtherListing)