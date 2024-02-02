import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../courseContainer';
import ReactLoading from 'react-loading';
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Certificate = ({type}) => {
    const {loggedIn,lastname,username ,firstname}=useContext(AuthContext);
    console.log(username);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [course, setCourse] = useState({});
    const [Nusername, setusername] = useState(username);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getCourse = async ()=>{
            if(type == "certificate"){
                let usernameT = username; 
                if (firstname && lastname)
                    usernameT = firstname + " " + lastname;
                setusername(usernameT);
                const res = await courseService.getRegisteredCourse(id);
                if(res.totalItems > res.completedVideos.length + res.completedQuizs) {
                    navigate('/not-found');
                }
                setCourse(res);
                setReady(true);
            }
            else {
                const res = await courseService.verifyRegisteredCourse(id);
                if(!res || res.totalItems > res.completedVideos.length + res.completedQuizs) {
                    navigate('/not-found');
                }
                setusername(res.studentName);
                setCourse(res);
                setReady(true);
            }
        }
        getCourse();
    }, [])
    const download = async()=>{
        setLoading(true);
        await courseService.createAndDownloadCertificate(course.title, Nusername ,course.createdByName);
        setLoading(false);
    }
    return ( 
        <React.Fragment>
            {ready && <React.Fragment>
                {type == 'certificate' && <div className="row mt-2">
                    <div className="col-sm-4" >
                        <div className="pt-5 mb-5" style={{  display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
                            <img src="../confetti.png" alt="" width={'200px'}/>
                        </div>
                        <div className="pt-5" style={{  display: 'flex',justifyContent: 'center',alignItems: 'center',height:'100'}}>
                            <button className='btn btn-dark mx-2' style={{borderRadius : '25px'}} onClick={()=>{download()}}>Download <i className="fa fa-download" aria-hidden="true"></i></button>
                            <CopyToClipboard text={`http://localhost:3001/verify-certificate/${course._id}`} >
                                {!copied ?
                                  <button onClick={()=>{setCopied(true)}} style={{borderRadius : '25px'}} className='btn btn-info'>
                                      Copy Verification Link <i className="fa fa-files-o" aria-hidden="true"></i>
                                </button>
                                :(
                                    <button style={{borderRadius : '25px'}} className='btn btn-info'>
                                      Copied <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    </button>
                                )}
                            </CopyToClipboard>
                            {loading && <ReactLoading type={"bars"} color={'lightgreen'} width={'40px'}/>}
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div id='html' className='text-center'>
                        <div id='body'>
                            <div class="containerCER">
                                <div class="logo">
                                    <img src="../logo.png" width={'300px'} alt="" />
                                </div>

                                <div class="marquee">
                                    Certificate of Completion
                                </div>

                                <div class="assignment">
                                    This certificate is presented to
                                </div>

                                <div class="person">
                                    {Nusername}
                                </div>

                                <div class="reason">
                                    for completing {course.title} Course <br/>
                                    given by instructor : {course.createdByName} 
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>}
                {type == 'verify' && 
                <div className="mt-2" style={{  display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
                        <div id='html' className='text-center'>
                        <div id='body'>
                            <div class="containerCER">
                                <div class="logo">
                                    <img src="../logo.png" width={'300px'} alt="" />
                                </div>

                                <div class="marquee">
                                    Certificate of Completion
                                </div>

                                <div class="assignment">
                                    This certificate is presented to
                                </div>

                                <div class="person">
                                    {Nusername}
                                </div>

                                <div class="reason">
                                    for completing {course.title} Course <br/>
                                    given by instructor : {course.createdByName} 
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                }

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
 
export default Certificate;