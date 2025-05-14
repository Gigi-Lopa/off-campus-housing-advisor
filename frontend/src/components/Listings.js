import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { MapPin } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
export default function Listings() {
    let navigate = useNavigate();
    let [listings, set_listings] = useState(null);
    let [pagination, set_pagination] = useState({
        next : null,
        prev : null,
        page : 1
    });

    let onClickCard = (id) =>{
        navigate(`/listing/${id}`)
    }

    async function get_listings(){
        fetch(`${process.env.REACT_APP_API_ADDRESS}/get/listings?page=${pagination.page}`)
        .then(response => response.json())
        .then(response=>{
            set_listings(response.data)
            set_pagination(prev=>({...prev, next : response.next, prev : response.prev}))
        })
        .catch(error => console.log(error))
    }
    useEffect(()=>{
        get_listings()
    }, [pagination.page])

  return ( 
    <div className='w100 listings'>
        <div className='container w100'>
            <div className='flex flex_row filters-tab'>
                <div className='col-md-5'>
                    <h5 className='listing-location'>
                        <MapPin className='listing-location-icon'/>
                        Shashi
                    </h5>
                </div>
                <div className='col-md-6'>
                    <div className='dropdown-btns'>
                        <div className="dropdown bd-r">
                            <div className="dropdown-button">Location {<ChevronDown className='chev'/>}</div>
                            <div className="dropdown-content">
                                <a href="/">Shashi</a>
                                <a href="#">Chipadze</a>
                                <a href="#">Chiwaridzo</a>
                            </div>
                        </div>
                         <div className="dropdown bd-r">
                            <div className="dropdown-button">Price {<ChevronDown className='chev'/>}</div>
                            <div className="dropdown-content">
                                <a href="/">$80 Mark</a>
                                <a href="#">$70 Mark</a>
                                <a href="#">$60 Mark</a>
                            </div>
                        </div>
                         <div className="dropdown">
                            <div className="dropdown-button">Review {<ChevronDown className='chev'/>}</div>
                            <div className="dropdown-content">
                                <a href="/">Best</a>
                                <a href="/">Average</a>
                                <a href="/">Worst</a>
                            </div>
                        </div>

                    </div>
                </div>
            
            </div>
            <br/>
            <div className='row' style={{paddingTop: "0px"}}>
              {
                listings && listings.map((listing) => (
                    <Listing key={listing.listing_id}  onClickCard={onClickCard} listing={listing} />
                ))
            }

            </div>
        </div>
    </div>
  )
}
