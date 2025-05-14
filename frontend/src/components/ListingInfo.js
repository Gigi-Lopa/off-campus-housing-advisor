import React from 'react'
import sample from "../styles/img/q.jpg"
import Review from './Review'
import OtherListing from './OtherListing'
import ReviewCount from './ReviewCount'
import SERVICES from './Services'


function ListingInfo({listing_info, other_info}) {
    return (
    <div className='w100 listing-info'>
        <div className='container'>
            <div className='listing-header'>
                <h4>{listing_info.address}, {listing_info.location}</h4>
                <ReviewCount/>
            </div>
            <div className='listing-images'>          
                <div className="row g-2">
                    <div className="col-md-6 listing-img-con">
                        <div className='img-label'>
                            <span>Bed Room</span>
                        </div>  
                        <img src={`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing_info.images.BEDROOM}`} className="img-fluid rounded w-100 h-100 object-fit-cover" alt="Main" />
                    </div>
                    <div className="col-md-6">
                        <div className="row g-2">
                            <div className="col-6 listing-img-con">
                                <div className='img-label'>
                                    <span>Kitchen</span>
                                </div>  
                                <img src={`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing_info.images.KITCHEN}`}  className="img-fluid rounded w-100 h-100 object-fit-cover" alt="img2" />
                            </div>
                            <div className="col-6 listing-img-con">
                                <div className='img-label'>
                                    <span>Restroom</span>
                                </div>  
                                <img src={`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing_info.images.RESTROOM}`}  className="img-fluid rounded w-100 h-100 object-fit-cover" alt="img3" />
                            </div>
                            <div className="col-6 listing-img-con">
                                <div className='img-label'>
                                    <span>Dining Area</span>
                                </div>  
                                <img src={`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing_info.images.DINING_ROOM}`}  className="img-fluid rounded w-100 h-100 object-fit-cover" alt="img4" />
                            </div>
                            <div className="col-6 position-relative">
                                <div className='img-label'>
                                    <span>Exterior</span>
                                </div>  
                                <img src={`${process.env.REACT_APP_API_ADDRESS}/get/image/${listing_info.images.EXTERIOR}`}  className="img-fluid rounded w-100 h-100 object-fit-cover" alt="img5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='listing-details'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='listing-name'>
                            <h4>{listing_info.name}</h4>
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
                                            <span className='rating'>{listing_info.rating}</span>
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
                                    <span className='tertiary-color'>{other_info.host_name}</span>
                                </div>
                            </div>
                        </div>
                        <div className='listing-details-info bd-b'>
                            <h5>About the place</h5>
                            <p className='tertiary-color'>
                                {listing_info.description}
                            </p>
                        </div>
                        {
                            other_info.other_listings === 0  &&
                             <div className='other-listings bd-b'>
                                <h4>{other_info.host_name} Listing's</h4>
                                <div className='row'>
                                    {
                                        other_info.other_listings.map((listing, index) => {
                                            return (
                                                <OtherListing key={index} listing={listing}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                        <div className='listing-services'>
                            <h4>Services we offer</h4>
                            <div className='services-tags'>
                                 {
                                    listing_info.services.map((service, index) => {
                                        return (
                                        <div
                                            className={`service ${service.selected ? "service-selected" : ""}`}
                                            key={index}
                                        >
                                            {SERVICES[service.replace(/ /g, "_").toLowerCase()].icon}   
                                            <span className="service-tag">{service}</span>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <h4>{other_info.host_name} Listings</h4>
                       
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