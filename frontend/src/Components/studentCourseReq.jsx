import React,{ useEffect } from 'react';
import { useState } from 'react';
import courseService from '../courseContainer';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';

const StudentCourseRequests = () => {
    const [ready, setReady] = useState(false);
    const [requests, setRequests] = useState();
    useEffect(()=>{
        const getRequests = async () =>{
            setReady(false);
            const res = await courseService.StudentCourseRequests();
            setRequests(res);
            setReady(true);
        }
        getRequests();
    },[]);

    return ( 
        <React.Fragment>
        {ready && 
            <React.Fragment>
                <span>Total {requests.length} Requests</span>
                <div className="container mt-3">
                {requests.length === 0 ? <React.Fragment>
                    <img src="./empty-box.png" alt="" className='mt-5' width={'300px'}/>
                </React.Fragment>
                :(requests.map(request => {
                    return <div key={request._id} className="card bg-light m-2">
                        <div className="row">
                            <div className="col-sm-1">
                                <img src="./video.png" alt="" width={'60px'}/>
                            </div>
                            <div className="col-sm-8">
                                <p>You requested to take {request.title} Course. </p>
                            </div>
                            {request.status == 'pending' && 
                            <div className="col-sm-3">
                                <h6 style={{color : 'orange'}}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Pending </h6>
                            </div>
                            }
                            {request.status == 'approved' && 
                            <div className="col-sm-3">
                                <h6 style={{color : 'lightgreen'}}><i className="fa fa-check-circle" aria-hidden="true"></i> Approved </h6>
                            </div>
                            }
                            {request.status == 'rejected' && 
                            <div className="col-sm-3">
                                <h6 style={{color : 'lightcoral'}}><i className="fa fa-times-circle" aria-hidden="true"></i> Rejected </h6>
                            </div>
                            }
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
 
export default StudentCourseRequests;