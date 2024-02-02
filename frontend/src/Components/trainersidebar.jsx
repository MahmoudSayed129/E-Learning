import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import Edituserprofile from './edituserprofile';
import "./sidebar.css";
import Userprofile from './userprofile';
import Changeimageprofile from './changeimageprofile';

function Trainersidebar() {
  const [userprofile, setuserprofile] = useState(true);
  const [changeimageprofile, setchangeimageprofile] = useState(false);
  const [edituserprofile, setedituserprofile] = useState(false);

  function openSlideMenu () {
    document.getElementById('menu').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
  }
  
  function closeSlideMenu () {
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-2">
        <div id="main">
      <div id="content">
  
        <span class="slide">
          <a href="#" onClick={() => openSlideMenu()}>
            <i class="fa fa-bars"></i>
          </a>
        </span>
  
        <div id="menu" class="nav">
          <a href="#" class="close" onClick={() => closeSlideMenu()}>
            <i class="fa fa-times"></i>
          </a>
          <a class="avatar">
		      <img id='sidebar' src="r9.jpg" />
          <h2>Mahmoud Yassen</h2>
          </a>
          <Link to="#" onClick={()=> {setuserprofile(true); setchangeimageprofile(false); setedituserprofile(false); console.log(userprofile);}}>Profile</Link>
          <Link to="#">My Courses</Link>
          <Link to="#"  onClick={()=> {setuserprofile(false); setchangeimageprofile(true); setedituserprofile(false); console.log(userprofile);}}>Change Profile Image</Link>
          <Link to="#"  onClick={()=> {setuserprofile(false); setchangeimageprofile(false); setedituserprofile(true)}}>Settings</Link>
          <Link to="#">LogOut</Link>
        </div>
      </div>
    </div>
        </div>
        <div className="col-sm-10">
            {userprofile && <Userprofile />}
            {changeimageprofile && <Changeimageprofile />}
            {edituserprofile && <Edituserprofile/>} 
        </div>
      </div>
     
    {/* { userprofile ? 
        <Userprofile />
      : (
        userprofile2 ? 
          <Userprofile2 /> 
          : ( <Edituserprofile/> ) 
        
      )
    } */}
  
    
    
    </React.Fragment>
  )
}

export default Trainersidebar;