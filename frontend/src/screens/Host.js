import React, { useEffect, useRef, useState } from 'react'
import OtherListing from '../components/OtherListing'
import ReviewCount from '../components/ReviewCount'
import Review from '../components/Review'
import Footer from '../components/Footer'
import AddListingModal from '../components/AddListingModal'
import AddServiceModal from '../components/AddServiceModal'
import AddImagesModal from '../components/AddImagesModal'
import Cookie from "js-cookie"
import { useNavigate } from 'react-router-dom'

function Host() {
    let navigate = useNavigate()
    let [add_listing, set_add_listing] = useState(false)
    let [add_services, set_add_services] = useState(false)
    let [add_images, set_images] = useState(false)
    let [listing_info, set_listing_info] = useState({})
    let [uploading, set_uploading] = useState(false)
    let [status, set_status] = useState({error : false, success : false, isExist : false})
    let token = useRef()


    useEffect(()=>{
        let token_ = Cookie.get("host_token");
        if(token_){   
            token.current = token_      
        } else{
            navigate("/login/host", {replace: true})
        }
    },[])

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
                                   {/*  
                                   <Review/>
                                    <Review/>
                                    <Review/>
                                     */}
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