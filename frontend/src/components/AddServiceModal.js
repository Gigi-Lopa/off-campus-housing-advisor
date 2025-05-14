import React, { useState } from 'react'
import {X} from 'lucide-react';
import SERVICES from './Services';

function AddServiceModal({close_modal, onSave}) {
    let [services, set_services] = useState(SERVICES);
    let [selected, set_selected] = useState([])


   let onSelect = (key) => {
        let name = key;

        set_services(prev => ({
            ...prev,
            [key]: {
            ...prev[key],
            selected: !prev[key].selected
            }
        }));

        set_selected(prev => [...prev, name]);
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
                      Object.entries(services).map(([key, service], index) => (
                        <button
                            className={`service ${service.selected ? "service-selected" : ""}`}
                            key={index}
                            onClick={() => onSelect(key)}
                        >
                            {service.icon}
                            <span className="service-tag">{key.replace(/_/g, ' ')}</span>
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