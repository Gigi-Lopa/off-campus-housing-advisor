import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import ListingInfo from '../components/ListingInfo'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'

function ListingScreen() {
  let [listing_info, set_listing_info] = useState(null)
  let [other_info, set_other_info] = useState(null)
  let [status, set_status] = useState({
    error: false,
    isIdExist : false,
    isLoading : true
  })

  let params = useParams();
  useEffect(()=>{
     function get_listing(){
        fetch(`${process.env.REACT_APP_API_ADDRESS}/get/listing/${params.id}`)
        .then(response => response.json())
        .then(response => {
          if(response.message === "Invalid listing ID"){
              set_status(prev=>({...prev, isIdExist : true, isLoading : false}))
              return;
            }
            set_listing_info(response.listing)
            set_other_info({
              "host_name" : response.host_name,
              "other_listings" : response.other_listings
            })
            set_status(prev=>({...prev,isIdExist:false, isLoading : false}))
        })
        .catch(error =>{
          console.log(error)
          set_status(prev=>({...prev, error : true}))
        })
    }
    get_listing();
  }, [])

  return (
    <div>
        <Nav/>
        {
          listing_info && !status.isLoading ? (
            <ListingInfo listing_info={listing_info} other_info={other_info}/>
          ) : (
            <div>Loading...</div>
          )
        }
        <Footer/>
    </div>
  )
}

export default ListingScreen