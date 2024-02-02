import axios from 'axios'
import React, { useContext } from 'react'
import  { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'

export default function LogoutBtn() {
    const navigate = useNavigate();
    const {getLoggedIn}=useContext(AuthContext);
    async function Logout(){
    await axios.get("http://localhost:3000/api/logout")
    await getLoggedIn();
    navigate('/');
    
    }
  return (
    <React.Fragment><a className='' onClick={Logout}>logout</a><h1 className="fa fa-sign-out dropdown"></h1></React.Fragment>
  )
}
