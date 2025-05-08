import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Cookie from "js-cookie"

function Signup() {
    let parameters = useParams();
    let navigate = useNavigate();

    let [signup_data, set_signup_data] = useState({
        fullname : "",
        email : "",
        password : "",
        confirm_password  : ""
    })
    let [status, set_status] = useState({
        isEmail : false,
        error: false,
        invalid_password: false
    })

    let on_change = (e)=>{
        set_signup_data(prev=>({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }
    let on_submit =(e)=>{
        e.preventDefault();
        if(signup_data.confirm_password !== signup_data.password){
            set_status(p=>({
                ...p,
                invalid_password : true
            }))
            return;
        }

        if (["client", "host"].includes(parameters.mode)){
            fetch(`http://192.168.18.172:5000/signup/${parameters.mode}`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                }, 
                body : JSON.stringify({
                    fullname : signup_data.fullname,
                    email : signup_data.email,
                    password : signup_data.password
                })
            })
            .then(response => response.json())
            .then(response =>{
                if(response.isEmail){
                    set_status(prev =>({
                        ...prev,
                        isEmail : true
                    }))
                }

                if (!response.isAccount){
                    set_status(prev =>({
                        ...prev,
                        error : true
                    }))
                } else{
                    Cookie.set(parameters.mode === "client" ? "client_token" : "host_token", response.user_id, {expires: 7})
                    let link = parameters.mode === "client" ? "/" : `/host/${response.user_id}`
                    navigate(link, {replace : true})
                }
            })
            .catch(error=>{
                console.log(error)    
                set_status(prev =>({
                    ...prev,
                    error : true
                }))
            })
            .finally(()=>{ setTimeout(()=>set_status({isEmail : false, error: false, invalid_password: false}), 2000)
            })
        } else{console.log("Who are you")}
    }
  return (
    <div className='login-container' onSubmit={on_submit}>
    <div className='auth-form form-container'>
        <form className='form'>
            <h4>Create account</h4>
            <div className='form-content'>
                <div className='input-group'>
                    <label>Fullname</label>
                    <input
                    type='text'
                    name = 'fullname'
                    value={signup_data.fullname}
                    onChange={on_change}
                    required
                    />
                </div>
                <div className='input-group'>
                    <label>Email</label>
                    <input
                    type='email'
                    name='email'
                    value={signup_data.email}
                    onChange={on_change}
                    required
                    />
                </div>
                <div className='input-group'>
                    <label>Password</label>
                    <input
                    type='password'
                    name='password'
                    value={signup_data.password}
                    onChange={on_change}
                    required
                    />
                </div>
                <div className='input-group'>
                    <label>Confirm Password</label>
                    <input
                     type='password'
                     name='confirm_password'
                     value={signup_data.confirm_password}
                     onChange={on_change}
                     required
                    />
                </div>
                {
                    status.invalid_password && 
                    <>
                        <div className='alert alert-danger'>
                            Password don't match
                        </div>
                    </>
                }
                 {
                    status.isEmail && 
                    <>
                        <div className='alert alert-danger'>
                            Account Already Exists
                        </div>
                    </>
                }
                 {
                    status.error && 
                    <>
                        <div className='alert alert-danger'>
                            Generic error. Refresh page and try agin
                        </div>
                    </>
                }
                <button className='btn btn-ha-primary w100'>Login</button>
                <div className='flex flex_row auth-option center'>
                    <span>Already account?</span>
                    <Link to = {`/login/${parameters.mode}`}>Log in</Link>
                </div>
            </div> 
        </form>
    </div>
</div>
  )
}

export default Signup