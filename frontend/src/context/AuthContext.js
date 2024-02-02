import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
//this will return an object that has all the features of the context
const AuthContext=createContext();
function AuthContextProvider(props) {
    const[loggedIn,setLoggedIn]=useState(undefined);
    const[id,setId]=useState(undefined);
    const[type,setType]=useState(undefined);
    const[username,setUsername]=useState(undefined);
    const[firstname,setFirstname]=useState(undefined);
    const[lastname,setLastname]=useState(undefined);
    const[email,setEmail]=useState(undefined);
    const[gender,setGender]=useState(undefined);
    const[wallet,setWallet]=useState(undefined);
    const[ratedetails,setratedetails]=useState(undefined);
    const[reviews,setreviews]=useState(undefined);
    const[minibiography,setminibiography]=useState(undefined);
    const[accepted,setaccepted]=useState(undefined);
    const[rate,setrate]=useState(undefined);
    const[numberofrates,setnumberofrates]=useState(undefined);

    async function getLoggedIn(){
       const loggedInRes=await axios.get("http://localhost:3000/api/loggedin");
       setLoggedIn(loggedInRes.data.verified);
       setId(loggedInRes.data.id);
       setType(loggedInRes.data.type);
       setFirstname(loggedInRes.data.firstname);
       setLastname(loggedInRes.data.lastname);
       setUsername(loggedInRes.data.username);
       setEmail(loggedInRes.data.email);
       setWallet(loggedInRes.data.wallet);
       setGender(loggedInRes.data.gender);
       setratedetails(loggedInRes.data.ratedetails);
       setminibiography(loggedInRes.data.minibiography);
       setaccepted(loggedInRes.data.accepted);
       setrate(loggedInRes.data.rate);
       setnumberofrates(loggedInRes.data.numberofrates);
       setreviews(loggedInRes.data.reviews);
    }
    //we want to run this function whenever this component is render
    //to do this we use useEffect
    useEffect(()=>{
    
      getLoggedIn();
    },[]);
  return (
    //AuthContext has attribute provider which we can add all the component we wnat to be provided with
    // a value in this can it's the loggedIn
    //we also add getlogged because if in our login component if we clicked login we also want to run get logged in again
    <AuthContext.Provider value={{loggedIn,id,type,firstname,username,lastname,
    wallet,gender,email,rate,ratedetails,reviews,accepted,numberofrates,minibiography,getLoggedIn}}>
    {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContext;
export {AuthContextProvider};