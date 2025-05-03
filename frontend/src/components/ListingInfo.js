import React from 'react'
import sample from "../styles/img/q.jpg"
import Review from './Review'
import OtherListing from './OtherListing'
import ReviewCount from './ReviewCount'
function ListingInfo() {
  return (
    <div className='w100 listing-info'>
        <div className='container'>
            <div className='listing-header'>
                <h4>21 Flamboyat, Shashi</h4>
                <ReviewCount/>
            </div>
            <div className='listing-images'>          
                <div class="row g-2">
                    <div class="col-md-6 listing-img-con">
                        <div className='img-label'>
                            <span>Bed Room</span>
                        </div>  
                        <img src={sample} class="img-fluid rounded w-100 h-100 object-fit-cover" alt="Main" />
                    </div>
                    <div class="col-md-6">
                        <div class="row g-2">
                            <div class="col-6 listing-img-con">
                                <div className='img-label'>
                                    <span>Kitchen</span>
                                </div>  
                                <img src={sample}  class="img-fluid rounded w-100 h-100 object-fit-cover" alt="img2" />
                            </div>
                            <div class="col-6 listing-img-con">
                                <div className='img-label'>
                                    <span>Toilet</span>
                                </div>  
                                <img src={sample}  class="img-fluid rounded w-100 h-100 object-fit-cover" alt="img3" />
                            </div>
                            <div class="col-6 listing-img-con">
                                <div className='img-label'>
                                    <span>Dining Area</span>
                                </div>  
                                <img src={sample}  class="img-fluid rounded w-100 h-100 object-fit-cover" alt="img4" />
                            </div>
                            <div class="col-6 position-relative">
                                <div className='img-label'>
                                    <span>Exterior</span>
                                </div>  
                                <img src={sample}  class="img-fluid rounded w-100 h-100 object-fit-cover" alt="img5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='listing-details'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='listing-name'>
                            <h4>Orange House</h4>
                        </div>
                        <div className='listing-details-header'>
                            <div className='listing-rating'>
                                <div className='row'>
                                    <div className='col flex center bd-r'>
                                        <span className='bi bi-award'></span>
                                    </div>
                                    <div className='col-md-6 flex center bd-r'>
                                        <span className='b-x tertiary-color'>
                                            See what the students and clients say about the boarding House
                                        </span>
                                    </div>
                                    <div className='col flex flex_col center'>
                                            <span className='rating'>4.68</span>
                                            <div className='stars flex fle-row'>
                                                <span className='bi bi-star-fill'></span>
                                                <span className='bi bi-star-fill'></span>
                                                <span className='bi bi-star-fill'></span>
                                                <span className='bi bi-star-fill'></span>
                                                <span className='bi bi-star-fill'></span>

                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='listing-hoster'>
                            <div className='flex flex-row'>
                                <div className='lising-profile'>
                                    <span className='bi bi-person'></span>
                                </div>
                                <div className='listing-name'>
                                    <h4>Hosted By</h4>
                                    <span className='tertiary-color'>Gilbert Lopah</span>
                                </div>
                            </div>
                        </div>
                        <div className='listing-details-info bd-b'>
                            <h5>About the place</h5>
                            <p className='tertiary-color'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quos, modi asperiores iusto veniam, dolor eius nam ad quaerat delectus itaque, odit libero? Consequatur, aliquid, quasi nisi ratione magni iure porro dicta, quas fugit vitae fugiat eligendi! Eveniet laudantium, ut animi quos nemo assumenda ipsa adipisci, ipsum quis est nisi.
                            </p>
                        </div>
                        <div className='other-listings bd-b'>
                            <h4>Micheals Listing's</h4>
                            <div className='row'>
                                <OtherListing/>
                                <OtherListing/>
                                <OtherListing/>
                                <OtherListing/>
                            </div>
                        </div>
                        <div className='listing-services'>
                            <h4>Services we offer</h4>
                            <div className='row'>
                                <div className='col-md-6 flex flex_row'>
                                    <span className='service-icon bi-wifi'></span>
                                    <span className='service'>Unlimited Wifi</span>
                                </div>
                                <div className='col-md-6 flex flex_row'>
                                    <span className='service-icon bi-wifi'></span>
                                    <span className='service'>Unlimited Wifi</span>
                                </div>
                                <div className='col-md-6 flex flex_row'>
                                    <span className='service-icon bi-wifi'></span>
                                    <span className='service'>Unlimited Wifi</span>
                                </div>
                                 
                            </div>

                        </div>
                    </div>
                    <div className='col-md-4'>
                        <h4>Gilbert's Listings</h4>
                        <div className="enlist-name">
                            
                        </div>
                    </div>
                </div>
                <div className='listing-reviews bd-t'>
                    <h4>Reviews</h4>
                    <div className='row'>
                        <Review/>
                        <Review/>
                        <Review/>
                        <Review/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingInfo