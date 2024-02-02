import React, { useEffect, useState } from 'react';
import courseService from '../courseContainer';
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';

const InprogressCourses = () => {
    const [ready, setReady] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() =>{
        const getCourses = async () => {
                const res = await courseService.getInprogressCourses();
                setCourses(res);
                setReady(true);
        };
        getCourses();
    },[]);
    return ( 
        <React.Fragment>
        {ready && 
            <React.Fragment>
            <span>Total {courses.length} courses</span>
            <div className="container mt-3">
            {courses.length == 0 ? <React.Fragment>
                    <img src="./folder.png" alt="" className='mt-5' width={'300px'}/>
                </React.Fragment>
            :(courses.map(course => {
                return <div key={course._id} className="card bg-light m-2">
                    <div className="row">
                        <div className="col-sm-1">
                            <img src={course.image} alt="" width={'60px'}/>
                        </div>
                        <div className="col-sm-9 pt-3">
                            <span style={{fontWeight:"bolder"}}>Title : </span> {course.title} 
                            <span style={{fontWeight:"bolder"}}> Subject : </span> {course.subject}    
                            <span style={{fontWeight:"bolder"}}> Instructor  : </span> {course.createdByName}
                        </div>
                        <div className="col-sm-2 pt-2">
                            <Link to={`/take-course/${course.courseID}`} className='btn btn-primary' style={{borderRadius : '25px'}}>View</Link>
                        </div>
                    </div>
                </div>
            }))
            }
            </div>
            </React.Fragment>
        }
        {!ready && 
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
            </div>
            }
        </React.Fragment>
     );
}
 
export default InprogressCourses;