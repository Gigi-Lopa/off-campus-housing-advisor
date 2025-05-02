import React from 'react'
import sample from "../styles/img/q.jpg"

function OtherListing() {
  return (
    <div className='col-md-3'>
        <div className='other-listing-card'>
            <div className='ol-img'>
                <img 
                    src={sample}
                    alt='other-listing'
                    className='img-fluid'
                />
            </div>
            <div className='ol-inf'>
                <div className='flex flex_row space-items'>
                    <h4>Orange House</h4>
                    <div>
                        <span className='bi bi-star-fill' style={{marginRight :"5px", fontSize:"0.8rem"}}></span>
                        <span style={{fontSize:"1rem"}}>4.98</span>
                    </div>
                </div>
                <div className='flex flex_col'>
                    <span className='tertiary-color'>Shashi, Bindura</span>
                    <span className='tertiary-color'> $78 / m</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(OtherListing)