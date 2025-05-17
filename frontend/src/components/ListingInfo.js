import React, {useRef, useState} from 'react'
import loader from "../styles/img/white_loader.svg"
import Review from './Review'
import OtherListing from './OtherListing'
import ReviewCount from './ReviewCount'
import SERVICES from './Services'
import { useNavigate } from 'react-router-dom'
import Cookie from "js-cookie"

function ListingInfo({listing_info, other_info, listing_id}) {
    const totalStars = 5
    let navigate = useNavigate();
    let client_id = useRef();
    let [review_text, set_review_text] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null)
    let [disable, set_disabled] = useState(!true)
    let [status, set_status] = useState({
        error: false,
        success : false,
        profanity : false
    })

    let onSubmitReview = () =>{
        let token = Cookie.get("client_token")
        if(!token){
            navigate(`/login/client`)
        } else{
            client_id.current = token
        }

        if (rating === 0 && review_text === "") {
            return
        }

        fetch(`${process.env.REACT_APP_API_ADDRESS}/add/review`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            }, 
            body : JSON.stringify({
                "host_id" : listing_info.host_id,
                "client_id" : client_id.current,
                "listing_id" : listing_id,
                "rating" : rating,
                "review": review_text
            })
        })
        .then(response => response.json())
        .then(response =>{
            if(response.isProfanity){
                set_status(prev=>({profanity : true, error: false, success:false}))
                return
            }
            if (response.isError) {
                set_status(prev=>({profanity : false,success:false, error : true}))
            }
            set_status(prev=>({...prev, success : true}))
        })
        .catch(error=>{
            console.log(error);
            set_status(prev=>({profanity : false,success:false, error : true}))
        })
        .finally(()=>{
            set_status(prev=>({profanity : false,success:false, error : true}))
            setTimeout(()=>{
                set_status(prev=>({profanity : false,success:false, error : true}))
            }, 3500)
        })
    }

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
                                            <span className="service-tag">{service.replace(/_/g, " ")}</span>
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
                    <div className="review-section">
                        <div className='flex flex_col center'>
                            <h4>Leave {other_info.host_name} a Review</h4>
                            <div className='stars '>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
                                    {Array.from({ length: totalStars }, (_, i) => i + 1).map((star) => (
                                        <span
                                        key={star}
                                        onClick={() => {
                                            setRating(star);
                                           
                                        }}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(null)}
                                        style={{
                                            color: (hover || rating) >= star ? '#ffc107' : '#6A6A7D',
                                            fontSize: '1.5rem'
                                        }}
                                        >
                                        ★
                                        </span>
                                    ))}
                                </div>     
                        </div>
                        
                        </div>
                        <div className='form-group'>
                            <textarea 
                                className='input_bar'
                                rows={8}
                                style={{marginTop :"15px"}}
                                placeholder='Enter you review here ....'
                                value={review_text}
                                onChange={(e) => set_review_text(e.target.value)}
                            >    
                            </textarea>
                        </div>
                        {
                            status.error &&
                            <div className='alert alert-danger'>
                                An error occured
                            </div>
                        }
                        {
                            status.profanity && 
                            <div className='alert alert-warning'>
                                Profanity is not allowed
                            </div>
                        }
                        {
                            status.success &&
                            <div className='alert alert-success'>
                                Review submitted successfully
                            </div>
                        }
                        <div className='flex flex_col align-end'>
                            <button className='btn btn-ha-primary' disabled= {disable} onClick={onSubmitReview}>
                                {
                                    disable ? (
                                        <img src={loader} alt='loader' className='loader-btn'/>
                                    ) : (
                                        "Submit"
                                    )
                                }
                            </button>
                        </div>
                       
                    </div>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingInfo