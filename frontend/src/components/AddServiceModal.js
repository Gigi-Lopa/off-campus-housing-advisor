import React, { useState } from 'react'
import { Cable, CircleParking, CookingPot, GlassWater, Heater, LibraryBig, Refrigerator, Shield, Shirt, Sun, Utensils, Wifi, Wind, X } from 'lucide-react'

function AddServiceModal({close_modal, onSave}) {
    let [services, set_services] = useState([
        { name: "Wifi", icon: <Wifi size={18} className='service-icon' />, selected: false },
        { name: "Electricity", icon: <Cable size={18} className='service-icon' />, selected: false },
        { name: "Studying Area", icon: <LibraryBig size={18} className='service-icon' />, selected: false },
        { name: "Solar Power", icon: <Sun size={18} className='service-icon' />, selected: false },
        { name: "Backup Water", icon: <GlassWater size={18} className='service-icon' />, selected: false },
        { name: "Kitchen", icon: <Utensils size={18} className='service-icon' />, selected: false },
        { name: "Wardrobe", icon: <Shirt size={18} className='service-icon' />, selected: false },
        { name: "Air Conditioner", icon: <Wind size={18} className='service-icon' />, selected: false },
        { name: "Refrigerator", icon: <Refrigerator size={18} className='service-icon' />, selected: false },
        { name: "Stoves", icon: <Heater size={18} className='service-icon' />, selected: false },
        { name: "Backup Gas", icon: <CookingPot size={18} className='service-icon' />, selected: false },
        { name: "Durawall", icon: <Shield size={18} className='service-icon' />, selected: false },
        { name: "Parking", icon: <CircleParking size={18} className='service-icon' />, selected: false }
      ]);
      
    let [selected, set_selected] = useState([])


    let onSelect = (index) => {
        let name  = ""
        set_services(prev =>
          prev.map((s, i) =>{
            if (i === index){
                name = s.name;
                return { ...s, selected : !s.selected}
            } else{
                return s
            }
            }
          )
        );
        set_selected(prev=>[...prev, name])
      };
    let onNext = () =>{
        onSave(selected)
    }
    return (
    <div className='modal'>
        <div className='modal-content add-listing'>
            <div className='close-modal'>
                <X className='close-icon' onClick={close_modal}/>
            </div>
            <div className='services'>
                <h4>Select Services</h4>
                <div className='services-tags'>
                    {
                        services.map((service, index)=>(
                            <button className={`service ${service.selected ? "service-selected" : ""}`} key={index} onClick={()=>onSelect(index)}>
                                {service.icon}
                                <span className='service-tag'>{service.name}</span>
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='save-container'>
                <button className='btn btn-ha-primary' onClick={onNext}>Next </button>
            </div>
        </div>
    </div>
  )
}

export default AddServiceModal