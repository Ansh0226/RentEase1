import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Register.scss";
// import Footer from '../components/Footer';

const RegisterPage = () => {
   // Make a variable which stores all the data
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null
   });

   // Handle change function to update form data
   const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: name === "profileImage" ? files[0] : value
      }));
   };

   console.log(formData);

   const navigate = useNavigate();
   const [passwordMatch, setPasswordMatch] = useState(true);

   // Use effect to check if passwords match
   useEffect(() => {
      setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
   }, [formData.password, formData.confirmPassword]);

   // Handle submit function to submit the form
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const register_form = new FormData();

        // Append all form data fields to FormData
        for (var key in formData) {
            register_form.append(key, formData[key]);
        }

        const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            body: register_form,
        });

        if (response.ok) {
            navigate("/login");
        } else {
            const errorData = await response.json();
            alert(`Registration Failed! ${errorData.message}`);
        }
    } catch (err) {
        console.error("Registration Failed!", err.message);
        alert(`Registration Failed! ${err.message}`);
    }
};


   return (
      <div className="register">
         <div className="register_content">
            <form className="register_content_form" onSubmit={handleSubmit}>
               <input
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
               />
               <input
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
               />
               <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
               />
               <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
               />
               <input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
               />

               {!passwordMatch && (
                  <p style={{ color: "red" }}>Passwords do not match!</p>
               )}

               <input
                  id="image" // All profile pics will have a unique id for profile image
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChange}
                  required
               />
               <label htmlFor="image">
                  {/* This label html for the id of image above */}
                  <img src="/assets/addImage.png" alt="Add profile photo" />
                  <p>Upload Your Photo</p>
               </label>
               {/* For displaying profile photo in registration page after uploading photo */}
               {formData.profileImage && (
                  <img
                     src={URL.createObjectURL(formData.profileImage)}
                     alt="Profile photo"
                     style={{ maxWidth: "80px" }}
                  />
               )}

               <button type="submit" disabled={!passwordMatch}>REGISTER</button>
            </form>
            <a href="/login">Already have an Account? Log In here</a>
         </div>
         {/* <Footer/> */}
      </div>
   );
};

export default RegisterPage;
