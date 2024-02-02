import React from 'react';
import "./userprofile.css";

function Userprofile() {
  return (
    <div className="wrapper">
        <div className="profile">
            <div className="overlay">
                <div className="about d-flex flex-column">
                    <h4>Mahmoud Yassen</h4> <span>Software Developer</span>
                </div>
                <ul className="social-icons">
                <li ><a href="https://m.facebook.com/100010673135930/" className="fa fa-facebook"></a></li>
                <li><a href="https://youtu.be/s7-GTShjcqY" className="fa fa-linkedin"></a></li>
                <li><a href="https://youtu.be/2uaqdHx22hk" className="fa fa-twitter"></a></li>
                <li><a href="https://youtu.be/pvhwrBoCFyM" className="fa fa-instagram"></a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Userprofile;