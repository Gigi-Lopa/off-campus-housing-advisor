import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
function AddListingModal({close_modal, onSave}) {
    let [gen_form, set_gen_form] = useState({
        b_name : "",
        b_address : "",
        b_location : "Shashi",
        b_rent : "",
        b_desc : "",
        b_orientation : {
            mixed : true,
            separate : false
        },
        b_gender : "Female",
    });
    let [c_no, set_c_no] = useState();
    let [ b_rooms, set_b_rooms] = useState([]);
    let [al ,set_al] = useState(false)
    
    let onHandleChange = (e)=>{
        set_gen_form((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    
    let handleOrientation = (mode) => {
        set_gen_form(prev => ({
          ...prev,
          b_orientation: {
            mixed: mode === "mixed",
            separate: mode === "separate"
          }
        }));
    };


    let on_Save = (e)=>{
        e.preventDefault()
        set_al(b_rooms.length === 0)
        setTimeout(()=>{set_al(!b_rooms.length === 0)}, 3500)      

        /* DATA */
        let data = gen_form
        data.b_rooms = b_rooms
        onSave(data)
    }

  return (
    <div className='modal'>
        <div className='modal-content add-listing'>
            <div className='close-modal'>
                <X className='close-icon' onClick={close_modal}/>
            </div>

            <div className='gen-info'>
                <form className='' onSubmit={on_Save}>
                    <h4>Enlist Boarding House</h4>
                    <div className='flex flex_row space-items'>
                        <div className='form-group col-md-5'>
                            <label>Boarding House Name</label>
                            <input
                                name={"b_name"}
                                value={gen_form.b_name}
                                onChange={onHandleChange}
                                className={"input_bar"}
                                required
                            />
                        </div>
                        <div className='form-group col-md-6'>
                            <label>Boarding House Address</label>
                            <input
                                name={"b_address"}
                                value={gen_form.b_address}
                                onChange={onHandleChange}
                                className={"input_bar"}
                                required

                            />
                        </div>
                    </div>
                    <div className='form-group col-md-12'>
                        <label className=''>Location</label>
                        <select className='input_bar' name='b_location' value={gen_form.b_location} onChange={onHandleChange}>
                            <option value={"Shashi"} selected>Shashi</option>
                            <option value={"Chipadze"}>Chipadze</option>
                            <option value={"Chiwaridzo"}>Chiwaridzo</option>
                        </select>
                    </div>
                    <div className='form-group col-md-12'>
                        <label>Rent</label>
                        <input
                            name={"b_rent"}
                            value={gen_form.b_rent}
                            onChange={onHandleChange}
                            className={"input_bar"}
                            required
                        />
                    </div> 
                    <div className='form-group col-md-12'>
                        <label>Description</label>
                        <textarea
                            name={"b_desc"}
                            value={gen_form.b_desc}
                            onChange={onHandleChange}
                            className={"input_bar"}
                            required

                        />
                    </div>             
                    <label>Boarding House type</label>
                    <div className='flex flex_row'>
                        <button type='button' className={`option ${gen_form.b_orientation.mixed && "selected" }`} onClick={()=>handleOrientation("mixed")}>Mixed</button>
                        <button type='button' className={`option ${gen_form.b_orientation.separate && "selected" }`} style={{marginLeft:"15px"}} onClick={()=>handleOrientation("separate")}>Seperate</button>
                    </div>
                    {
                        gen_form.b_orientation.separate &&
                        <>
                        <label style={{marginTop: "25px"}}>Allowed gender</label>
                        <div className='flex flex_row'>
                                 <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="radio"
                                    name="b_gender"
                                    value="Female"
                                    onChange={onHandleChange}
                                    checked={gen_form.b_gender === "Female"} 
                                    />
                                    <label className="form-check-label">
                                        Females
                                    </label>
                                </div>
                                <div className="form-check" style={{marginLeft: "15px"}}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="b_gender"
                                    value="Male"
                                    onChange={onHandleChange}
                                    checked={gen_form.b_gender === "Male"} 
                                    />
                                    <label className="form-check-label" >
                                        Male
                                    </label>
                            </div>
                        </div>
                        </>
                    }
                    <div className='form-group' style={{marginTop: "25px"}}>
                        <label>Add number of students / room</label>
                        <div className='flex flex_row space-items'>
                            <div className='input_9'>
                                <input
                                    type='number'
                                    name={"no_room"}
                                    value={c_no}
                                    onChange={(e)=>set_c_no(e.target.value)}
                                    className={"input_bar"}
                              />
                            </div>
                            <button className='btn btn-ha-primary' type='button' onClick={()=>{c_no !== 0 && set_b_rooms(prev=>[...prev, c_no]);set_c_no("")}}>
                                <Check/>
                            </button>
                        </div>
                    </div>
                    {
                        b_rooms.length !== 0 && 
                        <div className='flex rooms'>
                        {
                            b_rooms.map((room, index)=>(
                                <div className='room-badge' key={index}>
                                    <span className='tertiary-color'>Room for {room}</span>
                                </div>
                        ))
                        }
                        </div>
                    }
                    {al && <div className='alert alert-danger'>Add rooms</div>}
                    <div className='save-container'>
                        <button className='btn btn-ha-primary' type='submit'>Next </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddListingModal