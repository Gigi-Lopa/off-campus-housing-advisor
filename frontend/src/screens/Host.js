import React, { use, useEffect, useRef, useState } from 'react'
import OtherListing from '../components/OtherListing'
import ReviewCount from '../components/ReviewCount'
import Review from '../components/Review'
import Footer from '../components/Footer'
import AddListingModal from '../components/AddListingModal'
import AddServiceModal from '../components/AddServiceModal'
import AddImagesModal from '../components/AddImagesModal'
import Cookie from "js-cookie"
import { useNavigate, useParams } from 'react-router-dom'

function Host() {
    let navigate = useNavigate()
    let params = useParams();
    let [add_listing, set_add_listing] = useState(false)
    let [add_services, set_add_services] = useState(false)
    let [add_images, set_images] = useState(false)
    let [listing_info, set_listing_info] = useState({})
    let [uploading, set_uploading] = useState(false)
    let [host_info, set_host_info] = useState(null)
    let [review_page, set_review_page] = useState(1)
    let [not_found, set_not_found] = useState(false)
    let [status, set_status] = useState({error : false, success : false, isExist : false})
    let token = useRef()

    useEffect(()=>{
        let token_ = Cookie.get("host_token");
        if(token_ && (token_ === params.id)){ 
            token.current = token_      
            fetch(`${process.env.REACT_APP_API_ADDRESS}/host?page=${review_page}&&id=${params.id}`)
            .then(response => response.json())
            .then(response =>{
                if(!response.status){
                   return set_not_found(true); 
                }
                set_host_info({
                    host : response.host,
                    listings : response.listings,
                    reviews : response.reviews,
                    review_count : response.review_count,
                    next : response.next
                })
            })
            .catch(error =>{
                console.log(error)
            })
        } else{
            navigate("/login/host", {replace: true})
        }
    },[])

    let get_reviews =()=>{
        fetch(`${process.env.REACT_APP_API_ADDRESS}/host?page=${host_info.next}&&id=${params.id}`)
        .then(response => response.json())
        .then(response =>{
            if(!response.status){
                return alert("Server occured")
            }

          return set_host_info(prev => ({
            ...prev,
            next : response.next,
            reviews: [...(prev?.reviews || []), ...response.reviews]
        }));

        })
    }
    let addGenInfo = (data)=>{
        set_listing_info(prev=>({
            ...prev, 
            general_info : data
        }))
        set_add_listing(false);
        set_add_services(true);
    }

    let addServices = (data) =>{
        set_listing_info(prev=>({
            ...prev,
            services : data
        }))
        set_add_services(false)
        set_images(true);
    }

    let addImages = (data) =>{
        onSubmit(data) 
    }

    const onSubmit = (images) => {
        const form_data = new FormData();
        listing_info.general_info.host_id = token.current;

        form_data.append("general_information", JSON.stringify(listing_info.general_info));
        form_data.append("services", JSON.stringify(listing_info.services));

        const imageFields = ["bedroom", "dining_room", "exterior", "kitchen", "toilet"];
        imageFields.forEach((field) => {
            form_data.append(field, images[field]);
        });

        set_uploading(true);

        fetch(`${process.env.REACT_APP_API_ADDRESS}/add/listing`, {
            method: "POST",
            body: form_data,
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.isExist) {
                return set_status({ error: false, isExist: true, success: false });
            }
            if (res.status) {
                // ADD TO CURRENT LISTING
                return set_status({ error: false, isExist: false, success: true });
            }
            set_status({ error: true, isExist: false, success: false });
        })
        .catch((err) => {
            console.error(err);
            set_status({ error: true, isExist: false, success: false });
        })
        .finally(() => {
            set_uploading(false);
            setTimeout(() => {
                set_status({ error: false, isExist: false, success: false });
            }, 3500);
        });
    };
    if (not_found) {

    return (
        <div className='nothing'>
        <span>Host Not Found</span>
        </div>
    );
    }

    if (!host_info) {
    return null
    }

  return (
    <div className='host'>
        {add_listing && <AddListingModal onSave = {addGenInfo} close_modal={()=>set_add_listing(false)}/>}
        {add_services && <AddServiceModal onSave = {addServices} close_modal={()=>set_add_services(false)}/>}
        {add_images && <AddImagesModal onSave = {addImages} close_modal={()=>set_images(false)} status = {status}/>}
       <div className='host-inf'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='host-inf-bar'>
                            <div className='host-profile'>
                                <span className='bi bi-person'></span>
                            </div>
                            <span className='host-name'>{host_info.host.fullname}</span>
                            <span className='tertiary-color mail'>{host_info.host.email}</span>
                            <button className='btn log-out-btn' onClick={()=>{Cookie.remove("host_token"); navigate("/", {replace : true})}}>
                                Log out
                            </button>
                        </div>
                    </div>
                    <div className='col-md-8 host-content'>
                        <div className='container-sm'>
                            <div>
                                <h4 className='greeting'>Hello, {host_info.host.fullname}</h4>
                            </div>
                            <div className='host-listings bd-b'>
                                <div className='row'>
                                  {
                                    host_info && host_info.listings && host_info.listings.length !== 0 && host_info.listings.map((listing) => (
                                        <OtherListing key={listing.listing_id} listing={listing} />
                                    ))
                                    }
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
                                    <ReviewCount positive={host_info.review_count.positive} negative={host_info.review_count.negative}/>
                                </div>
                                <div className='row' style={{marginTop:"25px"}}>
                                 {
                                    host_info.reviews.map(review=>{
                                        return (
                                            <Review review ={review} key={review.review_id}/>  
                                        )
                                    })
                                }
                                </div>
                                <div className='flex flex_row center'>
                                    <button className='btn btn-outline-ha-primary' disable = {host_info.next} onClick={()=>{
                                            if(host_info.next){

                                                get_reviews()
                                            }
                                        }} >
                                            Show More
                                    </button>   
                                </div>
                                <br/>
                                <br/>
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