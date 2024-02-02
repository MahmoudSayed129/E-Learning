import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
//first we need to take the values from the input fields using use state
function Filldata() {
    const[username,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[firstname,setFirstName]=useState("");
    const[lastname,setlastName]=useState("");
    const[gender,setGender]=useState("");
    const {getLoggedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    async function register(e){
        //to prevent the page from refreshing when submit
        e.preventDefault();
        try {
            const registerData={
                username,
                email,
                password,
                firstname,
                lastname,
                gender,
            }
            //we need also to 
            await axios.post("http://localhost:3000/api/register",registerData);
            await getLoggedIn();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    } 

  return (
    <div>
    <h1 id='regtitle'>Please Complete Your Data.</h1>
    <div id="registerBody">
    <div  id="registerContainer" >    
      <div className="content">
        <form action="#" onSubmit={register}>
          <div className="user-details">
          <div className="material-textfield input-box ">
          <input 
          className="inputt"
          placeholder=" "
         value={firstname}
        onChange={(e)=>setFirstName(e.target.value)}>
        </input>
              <label className="labell">First Name</label>
            </div>
            <div className="material-textfield input-box  ">
            <input 
            className="inputt"
            placeholder=" "
         value={lastname}
        onChange={(e)=>setlastName(e.target.value)}>
        </input>
              <label className="labell">Last Name</label>
            </div>
            <div className="material-textfield input-box ">
            <input 
            className="inputt"
        type="email"
        placeholder=" "
         value={email}
        onChange={(e)=>setEmail(e.target.value)}>
        </input>
              <label className="labell">Email</label>
            </div>
            <div className="material-textfield input-box ">
            <input 
            className="inputt"
        type="password"
        placeholder=" "
         value={password}
        onChange={(e)=>setPassword(e.target.value)}>
        </input>
              <label className="labell">Create New Password</label>
            </div>
       
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" onChange={()=>{setGender("male")}} id="dot-1" value="male"/>
            <input type="radio" name="gender" onChange={()=>{setGender("female")}} id="dot-2" value="female"/>
          
            <span className="gender-title">Gender</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
              
           
            </div>
          </div>
          <button  type="submit"  className="buttoon pt-2"> Save </button>
        </form>
       

        {/* Don't miss the exclamation mark* */}
       
        </div>
      
 
  
    </div>
   
    </div>
    <h1 id="mar"> </h1>
</div>
  
    
    

  );
}
export default Filldata;
