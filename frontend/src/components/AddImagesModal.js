import React, { useState } from 'react'
import {X} from 'lucide-react'

function AddImagesModal({close_modal, onSave, status}) {
    let [images, set_images] = useState({
        bedroom  : null,
        kitchen : null,
        toilet : null,
        dining_room : null,
        exterior :null
    })

    let handleChange = (e)=>{
        set_images(prev=>({
            ...prev, 
            [e.target.name] : e.target.files[0]
        }))
    }

    let handleSubmit =(e)=>{
        e.preventDefault();
        onSave(images)
    }

  return (
    <div className='modal'>
        <div className='modal-content add-listing'>
            <div className='close-modal'>
                <X className='close-icon' onClick={close_modal}/>
            </div>
            <form onSubmit={handleSubmit}>
            <h4>Add required Images</h4>
            <div className='form-group col-md-12'>
                <label>Bed Room</label>
                <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    name={"bedroom"}
                    onChange={handleChange}
                    className={"input_bar"}
                    required

                />
            </div> 
            <div className='form-group col-md-12'>
                <label>Kitchen Image</label>
                <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    name={"kitchen"}
                    onChange={handleChange}
                    className={"input_bar"}
                    required

                />
            </div> 
            <div className='form-group col-md-12'>
                <label>Restroom Image</label>
                <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    name={"toilet"}
                    onChange={handleChange}
                    className={"input_bar"}
                    required
                />
            </div> 
            <div className='form-group col-md-12'>
                <label>Study Area Image</label>
                <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    name={"dining_room"}
                    onChange={handleChange}
                    className={"input_bar"}
                />
                
            </div> 
            <div className='form-group col-md-12'>
                <label>Exterior Image</label>
                <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    name={"exterior"}
                    onChange={handleChange}
                    className={"input_bar"}
                    required
                />
                
            </div> 
            {
                status.error &&
                <div className='alert alert-danger'>
                    An error occured.
                </div>
            }
            {
                status.isExist && 
                <div className='alert alert-warning'>
                    Listing name already exists
                </div>
            }
            {
                status.success &&
                <div className='alert alert-success'>
                    Listing created successfully
                </div>
            }
            <div className='save-container'>
                <button className='btn btn-ha-primary' type='submit'>Register House </button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default AddImagesModal