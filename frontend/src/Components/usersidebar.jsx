import React from 'react'
import "./usersidebar.css";

function Usersidebar() {
  return (
    // <div className="wrapper">
    //     <div className="sidebar">
    //         <div className="profile">
    //             <img src="./r1.jpg" alt="profile_picture"/>
    //             <h3>Mahmoud Yassen</h3>
    //             <p>Designer</p>
    //         </div>
    //         <ul>
    //             <li>
    //                 <a href="#" className="active">
    //                     <span className="icon"><i className="fas fa-home"></i></span>
    //                     <span className="item">Profile</span>
    //                 </a>
    //             </li>
    //             <li>
    //                 <a href="#">
    //                     <span className="icon"><i className="fas fa-desktop"></i></span>
    //                     <span className="item">My Courses</span>
    //                 </a>
    //             </li>
    //             <li>
    //                 <a href="#">
    //                     <span className="icon"><i className="fas fa-user-friends"></i></span>
    //                     <span className="item">Settings</span>
    //                 </a>
    //             </li>
    //             <li>
    //                 <a href="#">
    //                     <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
    //                     <span className="item">Log Out</span>
    //                 </a>
    //             </li>
    
    //         </ul>
    //     </div>
    //     </div>
    <div className="wrapper">
        <div className="sidebar">
            <div className="profile2">
                <img src="./r1.jpg" alt="profile_picture" />
                <h3>Mahmoud Yassen</h3>
                <p>Software Developer</p>
            </div>
            <ul>
                <li>
                    <a href="#" className="active">
                        <span className="icon"><i className="fa fa-home"></i></span>
                        <span className="item">Profile</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fa fa-book" aria-hidden="true"></i></span>
                        <span className="item">My Courses</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fa fa-sliders" aria-hidden="true"></i></span>
                        <span className="item">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fa fa-sign-out" aria-hidden="true"></i></span>
                        <span className="item">LogOut</span>
                    </a>
                </li>
            </ul>
        </div>
        </div>
  )
}

export default Usersidebar;