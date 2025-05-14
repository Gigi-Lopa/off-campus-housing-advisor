import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Cookie from "js-cookie"

function Signin() {
    let navigate = useNavigate()
    let parameters = useParams();
    let [login_data, set_login_data] = useState({
        email : "",
        password : ""
    })
    let [status, set_status] = useState({
        error: false,
        isAccount : false
    })

    let  on_change = (e) =>{
        set_login_data(prev =>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    let on_submit = (e)=>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_ADDRESS}/signin/${parameters.mode}`, {
            method:  "POST",
            headers: {
                "Content-Type":  "application/json"
            },
            body: JSON.stringify({
                email : login_data.email,
                password : login_data.password
            })
        })
        .then(response=> response.json())
        .then(response=>{
            console.log(response)
            if(response.isEmail === response.isPassword){
                Cookie.set(parameters.mode === "client" ? "client_token" : "host_token", response.user_id, {expires: 7})
                let link = parameters.mode === "client" ? "/" : `/host/${response.user_id}`
                navigate(link, {replace : true})
            } else {
                set_status(prev=>({
                    ...prev,
                    isAccount : true
                }))
            }
        })
        .catch(error => {
            console.log(error)
            set_status(prev=>({
                ...prev,
                error : true
            }))
        })
        .finally(_=>{
            setTimeout(_=>{set_status({isAccount : false, error: false})},3000)
        })
    }
  return (
    <div className='login-container' onSubmit={on_submit}>
        <div className='auth-form form-container'>
            <form className='form'>
                <h4>Login</h4>
                <div className='form-content'>
                    <div className='input-group'>
                        <label>Email</label>
                        <input name = "email" 
                        onChange={on_change}
                        type='email'
                        required
                        value={login_data.email}
                        />
                    </div>
                    <div className='input-group'>
                        <label>password</label>
                        <input name='password' 
                        onChange={on_change} 
                        value={login_data.password} 
                        type='password'
                        required
                        />
                    </div>
                    {
                        status.isAccount &&
                        <div className='alert alert-danger'>
                            Invalid Account.
                        </div>
                    }
                    {
                        status.error &&
                        <div className='alert alert-danger'>
                            Error occured.
                       </div>  
                    }
                    <button className='btn btn-ha-primary w100'>Login</button>
                    <div className='flex flex_row auth-option center'>
                        <span>Don't have an account?</span>
                        <Link to = {`/signup/${parameters.mode}`}>Sign up</Link>
                    </div>
                </div> 
            </form>
        </div>
    </div>
  )
}

export default Signin