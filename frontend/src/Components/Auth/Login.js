import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import  { Link, useNavigate }from 'react-router-dom';
import courseService from '../../courseContainer';
//first we need to take the values from the input fields using use state
export default function Login() {
    const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[type,setType]=useState("");
    const[error,seterror]=useState("");
    const[fillData,setFillData]=useState(false);
    const[email,setEmail]=useState("");
    const[firstname,setFirstName]=useState("");
    const[lastname,setlastName]=useState("");
    const[gender,setGender]=useState("");
    const {loggedIn,getLoggedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    async function login(e){
        //to prevent the page from refreshing when submit
        e.preventDefault();
        try {
            const loginData={
                username,
                password,
                type,
            }
            //we need also to 
            const res = await axios.post("http://localhost:3000/api/login",loginData);
            console.log(res);
            if(res.data.error){
                seterror(res.data.error)
            } else if (res.data.firstlogin) {
                setFillData(true);
                setPassword("");
            }
            else if(res.data.type == "admin") {
                navigate('/admin-profile');
            }
            else {
                navigate('/');
            }
            await getLoggedIn();
        } catch (error) {
            console.log(error.message);
        }
    } 
    const save= async (e)=>{
        e.preventDefault();
        if(!email || !password || !firstname || !lastname || !gender) {
            console.log("DASdasd");
            seterror("You must enter all your data");
        }
        else {
            const registerData={
                username,
                email,
                password,
                firstname,
                lastname,
                gender,
            }
            await courseService.SaveData(registerData);
            navigate("/");
        }
    }
  return (
   <React.Fragment>
    {!fillData &&<div>
    <h1 id='logintitle'>Login now</h1>
    <div id="loginContainer">
    {error && <div className='alert alert-danger'>{error}</div>}
    <form onSubmit={login}>
        
    <div className="user-details">
    <div className="material-textfield input-box ">
            <input 
            className="logininputt"
            placeholder=" "
            type="text"
            value={username}
            onChange={(e)=>{
              seterror("");
              setUserName(e.target.value)}}>
            </input>
            <label className="loginlabell">Username</label>
        </div>
        <div className="material-textfield input-box ">
            <input 
            type="password" 
            className='logininputt'
            placeholder=" "
            value={password}
            onChange={(e)=>{
                seterror("");
                setPassword(e.target.value)}}
            >
            </input>
            <label className="loginlabell">Password</label>
        </div>
        <Link style={{color:'#a00407'}} to='/forget-password'>forget your password?</Link>
        </div>
        
        <button  className='loginbuttoon pt-2'>login</button>
    </form>
    </div>
   
    <h1 id="mar2"> </h1>
    </div>}
    {fillData && <div>
        <h1 id='regtitle'>Please Complete Your Data.</h1>
        <div id="registerBody">
        <div  id="registerContainer" >    
          <div className="content">
            {error && <div className='alert alert-danger'>{error}</div>}
            <form  onSubmit={save}>
              <div className="user-details">
              <div class="material-textfield input-box ">
              <input 
              className="inputt"
              placeholder=" "
             value={firstname}
            onChange={(e)=>setFirstName(e.target.value)}>
            </input>
                  <label className="labell">First Name</label>
                </div>
                <div class="material-textfield input-box  ">
                <input 
                className="inputt"
                placeholder=" "
             value={lastname}
            onChange={(e)=>setlastName(e.target.value)}>
            </input>
                  <label className="labell">Last Name</label>
                </div>
                <div class="material-textfield input-box ">
                <input 
                className="inputt"
            type="email"
            placeholder=" "
             value={email}
            onChange={(e)=>setEmail(e.target.value)}>
            </input>
                  <label className="labell">Email</label>
                </div>
                <div class="material-textfield input-box ">
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
              <button className="buttoon pt-2"> Save </button>
            </form>
           
    
            {/* Don't miss the exclamation mark* */}
           
            </div>
          
     
      
        </div>
       
        </div>
        <h1 id="mar"> </h1>
    </div>}
   </React.Fragment>
  )
}
