import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import { useEffect } from 'react';
import CourseService from '../courseContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Refundcourse = ({courseID}) => {
    const navigate = useNavigate();
  async function refund(){
    const res = await CourseService.refundcourse(courseID);
    navigate('/');
    console.log(res);
  }
    return ( 
        <section className="page-section">
            <div className="container bg-light py-5" >
               <h4 className='text-danger'>Important ! :</h4>
            <hr />
            <h6>Policy  : </h6>
            <ol className='bg-dark' style={{fontWeight: 'bold', border : '1px solid lightcoral', borderRadius : '25px', color : 'white'}}>
                <li className="my-2">If you refund the course it will be pended </li>
                <li className="my-2">You can not access the course material until admin reply </li>
                <li className="my-2">Your refund might be niglicted</li>
                <li className="my-2">Your money will be returned back when admin accept the refund</li>
                <li className="my-2">be clicking the button there are no way to cancel the refund :
                    
                </li>
            </ol>
            <div className="text-center"><button  onClick={()=>refund()} style={{borderRadius: '25px'}} className="btn btn-danger btn-md mt-3">Refund the course</button></div>
            </div>
        </section>

     );
}
 
export default Refundcourse;