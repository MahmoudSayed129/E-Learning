import React, { useState, useEffect, useContext } from 'react';
import {Rating} from "@mui/material";
import courseService from '../courseContainer';
import Sections from './section';
import ReactPlayer from 'react-player/youtube';
import { useParams, Link, useNavigate } from "react-router-dom";
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import ReactLoading from 'react-loading';

const CourseOverview = () => {
    const [course, setCourse] = useState({});
    const {loggedIn,type ,email,minibiography}=useContext(AuthContext);
    const [response, setres] = useState({});
    const { id } = useParams();
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const [requested, setRequested] = useState(false);
    useEffect(() => {
        const getCourse = async (id) => {
            const res = await courseService.getCourse(id);
            setCourse(res.course);
            if(!res.course) {
                navigate('/not-found');
            }
            setres({reg : res.register, pen : res.pending, requested : res.requested});
            console.log(res);
            setReady(true);
        }
        getCourse(id);
    }, [reload]);
    const requestCourse = async () => {
        setLoading(true);
        const res = await courseService.requestCourse({title : course.title, image : course.image, courseID : course._id});
        setLoading(false);
        setRequested(true);
        setReload(!reload);
    }
    return (
        <React.Fragment >
            {ready ? (
                <React.Fragment>
                    <div className='hero-cover' id='top'>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className='hero-text'>
                                    <h2>{course.createdByName}</h2>
                                    <p>{course.title}</p>
                                    { type != "instructor" ?
                                        <React.Fragment>
                                            {response.reg && <Link to={`/take-course/${course._id}`} className="btn btn-light" style={{borderRadius : '25px', color :'#a00407'}}>GO TO Course</Link>}
                                            {response.pen && <button disabled={true}  className="btn btn-light" style={{borderRadius : '25px', color :'#a00407'}} >Your Request to fund is being processed</button>}
                                            {response.requested && <button disabled={true}  className="btn btn-light" style={{borderRadius : '25px', color :'#a00407'}}>Your Request is being processed</button>}
                                            {response.reg == false && type == "student" && <Link to={`/payment/${course._id}`} className=" btn btn-light" style={{borderRadius : '25px', color :'#a00407'}}>Enroll Now</Link>}
                                            {response.reg == false && type != "student" &&<button onClick={()=>{requestCourse()}} className="btn btn-light" style={{borderRadius : '25px', color :'#a00407'}}>Request to Enroll</button>}     
                                        </React.Fragment> 
                                    : (
                                        response.reg && <Link to={`/take-course/${course._id}`} className="btn btn-light" style={{borderRadius : '25px', color :'#a00407'}}>GO TO Course</Link>

                                        )     
                                    }

                                </div>
                            </div>
                            <div className="col-sm-4 p-5 mr-5">
                                <img src={course.image} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-2   fixed ">
                        <a href='#top' className="btn btn-light mx-2">Top page</a>
                        <a href='#video' className="btn btn-light ">Welcom Video</a>
                        <a href='#sections' className="btn btn-light ">Course Details</a>
                        <a href='#reviews' className="btn btn-light "> Reviews and Ratings</a>
                    </div>
                    <div id='video' className='row bg-light p-4 m-2'>
                        <div className="col-sm-8 " >
                            <center>
                                <h3>A Preview Video for the course:</h3>
                                <ReactPlayer width={750} height={500} url={course.overviewvideo.url} />
                            </center>

                        </div>
                        <div className="col-sm-4">
                            <h3 className='text-center'>Summary Of Course</h3>
                            <hr />
                            <p className='mt-5'>{course.summary}</p>
                        </div>

                    </div>
                    <div id="sections" className='bg-light p-4 m-2'>
                        <h3>Course Details.</h3>
                        {course.subtitles.map((section, index) => {
                            return <Sections key={index} section={section} count={index + 1} />
                        })}

                    </div>
                    {/* /////////////////////////// */}
                    <div className='row bg-light p-4 m-2' id="reviews">
                        <h3>Reviews and Ratings.</h3>
                    <div className="col-sm-4 p-5">
                            <Rating precision={0.1} name="rating" value={(course.rate / course.numberofrates).toFixed(1)} readOnly />
                            <div>
                                <span class="heading">User Rating</span>
                                <span >Total rating </span>
                                <p>{(course.rate / course.numberofrates).toFixed(1)} average based on {course.numberofrates} reviews.</p>
                                <hr style={{ border: '3px solid #f1f1f1' }} />
                            </div>
                            <div class="row">
                                <div class="side">
                                    <div>5 star</div>
                                </div>
                                <div class="middle">
                                    {console.log(course.ratedetails[5])}
                                    {course.ratedetails[5] > 0 ? <div class="bar-5" style={{width : (course.ratedetails[5]/course.numberofrates)*100+'%'}}></div>
                                    :
                                        <div class="bar-5" style={{width : '0%'}}></div>
                                    }
                                </div>
                                <div class="side right">
                                    <div>{course.ratedetails[5]}</div>
                                </div>
                                <div class="side">
                                    <div>4 star</div>
                                </div>
                                <div class="middle">
                                    {course.ratedetails[4] > 0 ? <div class="bar-4" style={{width : (course.ratedetails[4]/course.numberofrates)*100+'%'}}></div>
                                        :
                                            <div class="bar-4" style={{width : '0%'}}></div>
                                        }
                                </div>
                                <div class="side right">
                                    <div>{course.ratedetails[4]}</div>
                                </div>
                                <div class="side">
                                    <div>3 star</div>
                                </div>
                                <div class="middle">
                                    {course.ratedetails[3] > 0 ? <div class="bar-3" style={{width : (course.ratedetails[3]/course.numberofrates)*100+'%'}}></div>
                                    :
                                        <div class="bar-3" style={{width : '0%'}}></div>
                                    }
                                </div>
                                <div class="side right" >
                                    <div>{course.ratedetails[3]}</div>
                                </div>
                                <div class="side">
                                    <div>2 star</div>
                                </div>
                                <div class="middle">
                                    {course.ratedetails[2] > 0 ? <div class="bar-2" style={{width : (course.ratedetails[2]/course.numberofrates)*100+'%'}}></div>
                                    :
                                        <div class="bar-2" style={{width : '0%'}}></div>
                                    }
                                </div>
                                <div class="side right">
                                    <div>{course.ratedetails[2]}</div>
                                </div>
                                <div class="side">
                                    <div>1 star</div>
                                </div>
                                <div class="middle">
                                    {course.ratedetails[1] > 0 ? <div class="bar-1" style={{width : (course.ratedetails[1]/course.numberofrates)*100+'%'}}></div>
                                    :
                                        <div class="bar-1" style={{width : '0%'}}></div>
                                    }
                                </div>
                                <div class="side right" >
                                    <div>{course.ratedetails[1]}</div>
                                </div>
                            </div>
                        </div>
                    <div className='col-sm-8 '>
                            <section id="testimonials">
                                <div class="testimonial-heading">
                                    <span>Comments</span>
                                    <h1>Students Says</h1>
                                </div>
                                <div class="testimonial-box-container">
                                    {course.reviews.map(review => {
                                        return (
                                            <div class="testimonial-box">
                                                <div class="box-top">
                                                    <div class="profilee">
                                                        <div class="profile-img">
                                                        </div>
                                                        <div class="name-user">
                                                            <strong>{review.username}</strong>
                                                            <span>@{review.username}</span>
                                                        </div>
                                                    </div>
                                                    <div class="reviews">
                                                        {course.ratedetails.map((ra, i)=>{
                                                            if(i < review.rate){
                                                            return <i class="fas fa-star"></i>;
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                                <div class="client-comment">
                                                    <p>{review.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        </div>
                    </div>
                    {/* ////////////////////////////////////// */}
                </React.Fragment>
            ) : (
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                    <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
                </div>
            )
            }
        </React.Fragment>
    );
}

export default CourseOverview;