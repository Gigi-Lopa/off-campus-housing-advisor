import React, { useState } from 'react'
import OtherListing from '../components/OtherListing'
import ReviewCount from '../components/ReviewCount'
import Review from '../components/Review'
import Footer from '../components/Footer'
import AddListingModal from '../components/AddListingModal'

function Host() {
    let [add_listing, set_add_listing] = useState(false)

  return (
    <div className='host'>
        {add_listing && <AddListingModal/>}
       <div className='host-inf'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='host-inf-bar'>
                            <div className='host-profile'>
                                <span className='bi bi-person'></span>
                            </div>
                            <span className='host-name'>Gilbert Lopah</span>
                            <span className='tertiary-color mail'>gilbert2klopah@gmial.xom</span>
                        </div>
                    </div>
                    <div className='col-md-8 host-content'>
                        <div className='container-sm'>
                            <div>
                                <h4 className='greeting'>Hello, Gilbert</h4>
                            </div>
                            <div className='host-listings bd-b'>
                                <div className='row'>
                                    <OtherListing/>
                                    <div className='host-add-listing col-md-3'>
                                        <button onClick={()=>{set_add_listing(true)}}> 
                                            <div className='flex flex_col '>
                                                <span className='tertiary-color'>Add</span>
                                                <span className='bi bi-plus-lg tertiary-color'></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='host-reviews'>
                                <div className='flex flex_row space-items'>
                                    <h4>Reviews</h4>
                                    <ReviewCount/>
                                </div>
                                <div className='row' style={{marginTop:"25px"}}>
                                        <Review/>
                                        <Review/>
                                        <Review/>
                                        <Review/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Host