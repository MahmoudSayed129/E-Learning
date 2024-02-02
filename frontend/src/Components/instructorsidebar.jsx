import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import "./sidebar.css";

import Instructorprofile from './instructorprofile';
import Coursemanagement from './coursemanagement';
import Editinstructorprofile from './editinstructorprofile';
import Reviewsoninstructor from './reviewsoninstructor';
import Changepassword from './changepassword';

function Trainersidebar() {
  const [instructorprofile, setinstructorprofile] = useState(true);
  const [coursemanagement, setcoursemanagement] = useState(false);
  const [reviewsoninstructor , setreviewsoninstructor] = useState(false);
  const [editinstructorprofile, setEditinstructorprofile] = useState(false);
  const [changepassword, setchangepassword] = useState(false);

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
		      <img id='sidebar' src="r4.jpg" />
          <h2>Mahmoud Yassen</h2>
          </a>
          <Link to="#" onClick={()=> {setinstructorprofile(true);   setcoursemanagement(false); setreviewsoninstructor(false); setEditinstructorprofile(false); setchangepassword(false)}}>Profile</Link>
          <Link to="#" onClick={()=> {setinstructorprofile(false);  setcoursemanagement(true);  setreviewsoninstructor(false); setEditinstructorprofile(false);setchangepassword(false)}}>ManageCourses</Link>
          <Link to="#" onClick={()=> {setinstructorprofile(false);  setcoursemanagement(false); setreviewsoninstructor(true);  setEditinstructorprofile(false);setchangepassword(false)}}>Reviews</Link>
          <Link to="#" onClick={()=> {setinstructorprofile(false);  setcoursemanagement(false); setreviewsoninstructor(false); setEditinstructorprofile(true); setchangepassword(false)}}>Editprofile</Link>
          <Link to="#" onClick={()=> {setinstructorprofile(false);  setcoursemanagement(false); setreviewsoninstructor(false);  setEditinstructorprofile(false);setchangepassword(true)}}>Changepassword</Link>
          <Link to="#">LogOut</Link>
        </div>
      </div>
    </div>
        </div>
        <div className="col-sm-9">
            {instructorprofile && <Instructorprofile />}
            {coursemanagement && <Coursemanagement />}
            {reviewsoninstructor && <Reviewsoninstructor />}
            {editinstructorprofile && <Editinstructorprofile/>} 
            {changepassword && <Changepassword/>}
            
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