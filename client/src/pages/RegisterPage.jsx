import React from 'react';
import { useState } from 'react';
import "../styles/Register.scss";
const RegisterPage = () => {
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        profileImage:null
    })
    const handleChange =(e) =>{
        const{name,value,files}=e.target
        setFormData({
            ...formData,
            [name]:value,
            [name]:name ==="profileImage"?files[0]:value
        })
    }
    console.log(formData);
  return (
   <div className="register">
    <div className="register_content">
        <form className='register_content_form'>
            <input 
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required 
            />
              <input 
            placeholder='Last Name'
            name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            required 
            />
              <input 
            placeholder='Email'
            name='email'
              value={formData.email}
            type='email'
            onChange={handleChange}
            required 
            />
              <input 
            placeholder='Password'
            name='password'
              value={formData.password}
            type='password'
            onChange={handleChange}
            required 
            />
              <input 
            placeholder='Confirm Password'
            name='confirmPassword'
              value={formData.confirmPassword}
            type='password'
            onChange={handleChange}
            required 
            />
            <input
            id='image' // all profile pic will have an unique id for profile image 
            type="file" 
            name='profileImage' 
            //   value={formData.profileImage}
            accept='image/*' 
            style={{display:"none"}}
            onChange={handleChange}
             required 
             />
             <label htmlFor="image"> 
             {/* this label html for that id of image above */}
                <img src="/assets/addImage.png" alt="add profile photo" />
                <p>upload Your Photo</p>
             </label>
             {/* for displaying profile photo in registartion page after uploaing photo
              */}
             {formData.profileImage && (
                <img src={URL.createObjectURL(formData.profileImage)}
                alt='Profile photo'
                style={{maxWidth:"80px"}}
                />
             )}

             <button type='submit'>REGISTER</button>
        </form>
        <a href="">Already have an Account ? Log In here</a>
    </div>
   </div>
  )
}

export default RegisterPage