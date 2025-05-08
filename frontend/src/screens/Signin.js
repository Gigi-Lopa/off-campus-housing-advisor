import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Signin() {
    let parameters = useParams();
     
    let [login_data, set_login_data] = useState({
        email : "",
        password : ""
    })

    let  on_change = (e) =>{
        set_login_data(prev =>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    let on_submit = (e)=>{
        e.preventDefault();
        
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