import React,{ useEffect } from 'react';
import { useState } from 'react';
import courseService from '../courseContainer';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';

const Problems = ({status}) => {
    const [ready, setReady] = useState(false);
    const [problems, setProblems] = useState();
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        const getProblems = async () =>{
            setReady(false);
            if (status === 'pendingpro') {
                const res = await courseService.getCoursesProblemsP();
                setProblems(res);
                setReady(true);
            } else if (status === 'resolved') {
                const res = await courseService.getCoursesProblemsR();
                setProblems(res);
                setReady(true);
            } else {
                const res = await courseService.getCoursesProblemsU();
                setProblems(res);
                console.log(res);
                setReady(true);
            }
        }
        getProblems();
    },[reload, status]);

    const markpending = (e) =>{
        swal({
            title: `Do you really want to Mark these problems as Pending` ,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              swal("The problem has been pended", {
                icon: "success",
              });
              const res = await courseService.MarkAsPending(e.target.id);
              setReload(!reload);
            }
          });
    }

    const markresolved = (e) =>{
        swal({
            title: `Do you really want to Mark these problem as resolved` ,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              swal("Problem has been marked as resolved", {
                icon: "success",
            });
            const res = await courseService.MarkAsResolved(e.target.id);
            setReload(!reload);
            }
          });
    }
    return ( 
        <React.Fragment>
        {ready && 
            <React.Fragment>
                <span>Total {problems.length} Problems</span>
                <div className="container mt-3">
                {problems.length === 0 ? <React.Fragment>
                    <img src="./empty-box.png" alt="" className='mt-5' width={'300px'}/>
                </React.Fragment>
                :(problems.map(request => {
                    return <div key={request._id} className="card bg-light m-2">
                        <div className="row">
                            <div className="col-sm-5">
                                <p>Problem : {request.question}. <br /> Type : {request.type}</p>
                                {(request.status == 'unseen' || request.status == "pending") &&
                                    <React.Fragment>
                                        {request.followups.length > 0 && <h6>Follow ups : </h6>}
                                        <ol  type='1'>
                                        {request.followups.map((item,i) => {
                                                return (
                                                    <li>{item}.</li>
                                                )
                                        })}
                                        </ol>
                                    </React.Fragment>
                                }
                            </div>
                            {request.status == 'unseen' && 
                            <div className="col-sm-7">
                                <button onClick={(e)=>{markpending(e)}} id={request._id} style={{borderRadius:'25px'}} className='btn btn-info'>Mark as pending</button>
                                <button onClick={(e)=>{markresolved(e)}} id={request._id} style={{borderRadius:'25px'}}className='btn btn-success'>Mark as resolved</button>
                            </div>
                            }
                            {request.status == 'pending' && 
                                <React.Fragment>
                                    <div className="col-sm-3"/>
                                    <div className="col-sm-4">
                                        <button onClick={(e)=>{markresolved(e)}} id={request._id} style={{borderRadius:'25px'}}className='btn btn-success'>Mark as resolved</button>                            
                                    </div>
                                </React.Fragment>
                            }
                            {request.status == 'resolved' && 
                                <React.Fragment>
                                    <div className="col-sm-3"/>
                                    <div className="col-sm-4">
                                        <h6 style={{color : 'lightgreen'}}><i className="fa fa-check-circle" aria-hidden="true"></i> Resolved </h6>                           
                                    </div>
                                </React.Fragment>
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
 
export default Problems;