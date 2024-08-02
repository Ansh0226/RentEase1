import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Register.scss";

const RegisterPage = () => {
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null
   });

   const [passwordMatch, setPasswordMatch] = useState(true);
   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: name === "profileImage" ? files[0] : value
      }));
   };

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitted(true);

      if (formData.password !== formData.confirmPassword) {
         setPasswordMatch(false);
         return;
      }

      setPasswordMatch(true);

      try {
         const register_form = new FormData();
         for (const key in formData) {
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
            alert(Registration Failed! ${errorData.message});
         }
      } catch (err) {
         console.error("Registration Failed!", err.message);
         alert(Registration Failed! ${err.message});
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

               {!passwordMatch && submitted && (
                  <p style={{ color: "red" }}>Passwords do not match!</p>
               )}

               <input
                  id="image"
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChange}
               />
               <label htmlFor="image">
                  <img src="/assets/addImage.png" alt="Add profile photo" />
                  <p>Upload Your Photo</p>
               </label>
               {formData.profileImage && (
                  <img
                     src={URL.createObjectURL(formData.profileImage)}
                     alt="Profile photo"
                     style={{ maxWidth: "80px" }}
                  />
               )}

               <button type="submit">REGISTER</button>
            </form>
            <a href="/login">Already have an Account? Log In here</a>
         </div>
      </div>
   );
};

export default RegisterPage;