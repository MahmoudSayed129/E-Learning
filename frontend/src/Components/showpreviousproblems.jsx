import React, { useState, useEffect } from 'react';
import courseService from '../courseContainer';
import ReactLoading from 'react-loading';

const Showpreviousproblems = ({ title, courseID, all }) => {
    const [ready, setReady] = useState(false);
    const [problems, setproblems] = useState([]);
    const [followup, setFollowup] = useState("");
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const getProblems = async (courseID) => {
            const res = await courseService.getproblems(courseID);
            setproblems(res);
            console.log(res);
            setReady(true);
        }
        getProblems(courseID);
    }, [reload])
    const addFollowup = async (e) => {
        if(followup){
            let body ={
                problem_id : e.target.id,
                followup,
            }
            console.log(body);
            await courseService.addFollowup(body);
            setFollowup("");
            setReload(!reload);
        }
    }
    return (
        <React.Fragment>
            {ready ?
                <div className="row mt-3">
                    <div className="col-sm-10">
                        <h2>Problems of {title} Course : </h2>
                        <hr />
                        {problems.length === 0 ?
                            <div className='row'>
                                <div className="col-sm-3">
                                </div>
                                <div className="col-sm-4 px-4">
                                    <img src="../empty-box.png" alt="" className='mt-5' width={'300px'} />
                                </div>
                            </div>
                            : (
                                <React.Fragment>
                                    {problems.map((problem, index) => {
                                        return (<React.Fragment>
                                            
                                                    <span className='my-3'>Problem {index + 1} : {problem.question}.  <br />  Type : {problem.type}. <br />    Status : {problem.status}.</span> <br />
                                                    {problem.followups.length > 0 && <h6>Follow ups : </h6>}
                                                    <ol  type='1'>
                                                    {problem.followups.map((item,i) => {
                                                            return (
                                                                <li>{item}.</li>
                                                            )
                                                    })}
                                                    </ol>
                                                    {problem.status !== 'resolved' && 
                                                            <div className='bg-light mt-1  col-sm-6'>
                                                                <div className="form-floating mt-2">
                                                                    <input onChange={(e)=>{setFollowup(e.target.value)}} type="text" className='form-control mb-2' placeholder="Follow up."/>
                                                                    <label htmlFor='username'>Follow up.</label>
                                                                </div>
                                                                <button onClick={(e) => {addFollowup(e);}} id={`${problem._id}`} className='buttoon pt-2' style={{margin : '0px'}} >Add</button>
                                                            </div>
                                                    }
                                                    <hr />
                                                </React.Fragment>)
                                    })}
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
                : (
                    <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                        <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
                    </div>
                )}
        </React.Fragment>
    );
}

export default Showpreviousproblems;