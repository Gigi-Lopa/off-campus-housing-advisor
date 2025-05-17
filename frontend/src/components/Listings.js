import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { MapPin } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
export default function Listings() {
    let navigate = useNavigate();
    let [reload, set_reload] = useState(false);
    let [listings, set_listings] = useState([]);
    let [pagination, set_pagination] = useState({next : null,prev : null,page : 1});
    let [specifics, set_specifics] = useState({location : null,price : null,review : null})

    let onClickCard = (id) =>{
        navigate(`/listing/${id}`)
    }

    async function get_listings(){
        let query = `${process.env.REACT_APP_API_ADDRESS}/get/listings?page=${pagination.page}`
        if (specifics.location){
            query =  `${query}&&location=${specifics.location}`
        }
        
        if(specifics.price){
            query = `${query}&&rent=${specifics.price}`
        }

        if(specifics.review){
            query = `${query}&&rating=${specifics.review}`
        }
        console.log(query)
        fetch(query)
        .then(response => response.json())
        .then(response=>{
            set_listings(response.data)
            set_pagination(prev=>({...prev, next : response.next, prev : response.prev}))
        })
        .catch(error => console.log(error))
    }

    function handle_listing_specifics(obj, value){
        set_specifics(prev=>({
            ...prev, 
            [obj] : value
        }));
    }
    
    useEffect(()=>{
        get_listings()
    }, [pagination.page, reload])

  return ( 
    <div className='w100 listings'>
        <div className='container w100'>
            <div className='flex flex_row filters-tab space-items'>
                <div className='col'>
                    <h5 className='listing-location'>
                        <MapPin className='listing-location-icon'/>
                        {specifics.location === null ? "All Locations" : specifics.location}
                    </h5>
                </div>
                <div className='col flex justify-end '>
                    <div className='dropdown-btns'>
                        <div className="dropdown bd-r">
                            <div className="dropdown-button">{specifics.location === null ? "All Locations" : specifics.location} {<ChevronDown className='chev'/>}</div>
                            <div className="dropdown-content">
                                <button onClick={()=>handle_listing_specifics("location" , "All Locations")}>All Locations</button>
                                <button onClick={()=>handle_listing_specifics("location" , "Shashi")}>Shashi</button>
                                <button onClick={()=>handle_listing_specifics("location" , "Chipadze")}>Chipadze</button>
                                <button onClick={()=>handle_listing_specifics("location" , "Chiwaridzo")}>Chiwaridzo</button>
                            </div>
                        </div>
                         <div className="dropdown bd-r">
                            <div className="dropdown-button">{specifics.price === null ? "Price" : specifics.price} {<ChevronDown className='chev'/>}</div>
                            <div className="dropdown-content">
                                <button onClick={()=>handle_listing_specifics("price" , 80)}>$80 Mark</button>
                                <button onClick={()=>handle_listing_specifics("price" , 70)}>$70 Mark</button>
                                <button onClick={()=>handle_listing_specifics("price" , 60)}>$60 Mark</button>
                            </div>
                        </div>
                         <div className="dropdown bd-r">
                            <div className="dropdown-button">{specifics.review === null ? "Reviews" : specifics.review} {<ChevronDown className='chev'/>}</div>
                            <div className="dropdown-content">
                                <button onClick={()=>handle_listing_specifics("review" , "Best")}>Best</button>
                                <button onClick={()=>handle_listing_specifics("review" , "Average")}>Average</button>
                                <button onClick={()=>handle_listing_specifics("review" , "Worst")}>Worst</button>
                            </div>
                        </div>
                         <div className='dropdown' style={{marginLeft : "10px", marginRight : "5px"}}>
                            <button onClick={()=>set_reload(!reload)} className='btn btn-ha-primary'>Filter</button>
                        </div>
                          <div className='dropdown' style={{marginLeft : "", marginRight : "5px"}}>
                            <button onClick={()=>{set_specifics({location : null, price : null,review : null});set_reload(prev => !prev)}} className='btn btn-outline-ha-primary'>Reset</button>
                        </div>
                       

                    </div>
                </div>
            
            </div>
            <br/>
            <div className='row' style={{paddingTop: "0px"}}>
            {
                listings.length !== 0  && listings.map((listing) => (
                    <Listing key={listing.listing_id}  onClickCard={onClickCard} listing={listing} />
                ))
            }
            </div>
            {
                listings.length === 0 && 
                 <div className='nothing'>
                    <span>No listings yet...</span>
                </div>       
            }
        </div>
    </div>
  )
}
