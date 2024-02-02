import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
//first we need to take the values from the input fields using use state
function Register() {
    const[username,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[firstname,setFirstName]=useState("");
    const[lastname,setlastName]=useState("");
    const[gender,setGender]=useState("");
    const {getLoggedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    const [agree, setAgree] = useState(false);
    const [error, seterror] = useState("");
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
            if(!username || !email || !password || !firstname || !lastname || !gender) {
              seterror("You must enter all your data");
            }else {
              const res = await axios.post("http://localhost:3000/api/register",registerData);
              if(res.data.error) {
                seterror(res.data.error);
              }else {
                navigate('/');
                await getLoggedIn();
              }
            }

        } catch (error) {
            console.log(error.message);
        }
    } 
    const checkboxHandler = () => {
      // if agree === true, it will be set to false
      // if agree === false, it will be set to true
      if(agree==true){

      }
      setAgree(!agree);
      // Don't miss the exclamation mark
    }

  return (
    <div>
    <h1 id='regtitle'>Sign up and start learning</h1>
    <div id="registerBody">
    
    
    <div  id="registerContainer" >    
      <div className="content">
      {error && <div className='alert alert-danger'>{error}</div>}
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
       placeholder=" "
         value={username}
        onChange={(e)=>setUserName(e.target.value)}>
        </input>
              <label className="labell">User Name</label>
            </div>
            <div className="material-textfield input-box ">
            <input 
            className="inputt"
        type="password"
        placeholder=" "
         value={password}
        onChange={(e)=>setPassword(e.target.value)}>
        </input>
              <label className="labell">Password</label>
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
          <div>
          <input type="checkbox" id="agree" onChange={checkboxHandler} />
          <label style={{color:"#a00407"}} htmlFor="agree"> I agree to <a style={{color:"#a00407"}} href='/termsandconditions' className='me-4 text-reset'> terms and conditions</a></label>
        </div>
          <button  disabled={!agree} type="submit"  className={agree?"buttoon pt-2":"buttoon2"}> Sign Up </button>
        </form>
       

        {/* Don't miss the exclamation mark* */}
       
        </div>
      
 
  
    </div>
   
    </div>
    <h1 id="mar"> </h1>
</div>
  
    
    

  );
}
export default Register;
