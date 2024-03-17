import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {

useEffect(()=> {
    const defaultEmail= 'samson@gmail.com';
    localStorage.setItem("defaultEmail", defaultEmail);

    localStorage.removeItem("loggedIn");
})

   const [email, setEmail]= useState("");
   const navigate= useNavigate();

   const handleSubmit=(e)=> {
     e.preventDefault();
    
     const storedEmail= localStorage.getItem("defaultEmail");
     if(email !== storedEmail){
        alert("Invalid email")
        return;
     }
     else{
        alert("Signed in successful!")
        localStorage.setItem("loggedIn", true);
        navigate("/gamehub");
     }
   }

  return (
    <div className="home">
       <h1>Welcome to gamehub </h1>
       <p>Log in with your details to proceed!</p>
       <form onSubmit={handleSubmit}>
          <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <p><button>Log in</button></p>
       </form>
    </div>
  );
}

export default Home;