import React, { useContext } from "react";
import {Rating} from '@mui/material';
import { Link } from "react-router-dom";
import AuthContext, { AuthContextProvider } from"../context/AuthContext";

const CourseCard = ({course, priceRate, currency, page}) => {
    const {loggedIn,id,type}=useContext(AuthContext);
    console.log(type); 
    return ( 
            <div className="card text-center bg-light m-3 p-2" style={{width: '16rem'}}>
                <img src={course.image} height={'150px'} className="card-img-top" alt="course image" />
                <div className="card-body">
                    {type != "corporatetrainees " && course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now() && 
                        <span class="cs-price primary-bg">
                            {course.discount.promotion}  %
                        </span>
                    }
                    <h6 className="text-center">{course.title}</h6>
                    <p>Total hours : {course.totalHours}</p>
                    <Rating name="read-only"   value={Number(course.rate / course.numberofrates).toFixed(1)} precision={0.1} readOnly /> <br />
                    {/* To be conditionally rendered */} 
                    {type != "corporatetrainees " &&
                    <>
                    {course.price == 0 ?<React.Fragment><p className="text-success"> Free </p> 
                    <br />
                    </React.Fragment> 
                    : (
                        (course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now()) ?
                        <span>
                            <del> Price : {Number(course.price * priceRate).toFixed(2)} {currency ? currency : "USD" }</del>
                            <p> Price : {Number(course.price * priceRate - course.price * priceRate * (course.discount.promotion / 100)).toFixed(2)} {currency ? currency : "USD" }</p>
                        </span>
                        :(
                            <React.Fragment>
                                 <p> Price : {Math.round((course.price * priceRate) * 100) / 100} {currency ? currency : "USD" }</p> 
                                 <br />
                            </React.Fragment>
                        )
                    )
                    }
                    
                    </>
                    }
                    {
                        page === 'student' ?
                            <Link to={`/take-course/${course.courseID}`} style={{borderRadius : '25px', width : '150px'}} className="viewbuttoon">View<i class="fa fa-eye" aria-hidden="true"></i></Link>
                        : (      
                        <Link to={`/course/${course._id}`} style={{borderRadius : '25px', width : '150px'}} className="viewbuttoon">View <i class="fa fa-eye" aria-hidden="true"></i></Link>
                    )}
                </div>
            </div>
    );
}
 
export default CourseCard;