import React, { useContext, useState } from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Adduser from './adduser';
import CoursesRequests from './coursesRequests';
import Problems from './problems';
import RefundRequests from './refundRequests';
import SetPromotions from './setPromotions';
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import courseService from '../courseContainer';
const AdminView = () => {
    const [status, setStatus] = useState(''); 
    const {loggedIn,id,type, username}=useContext(AuthContext);
    const [view, setView] = useState({adduser : true});
    const [ready, setReady] = useState(false);
    const navigate = useNavigate(); 
    const chooseItem = (item) => {
        if(['pending','approved','rejected'].includes(item)){
            setView({requests:true});
            setStatus(item);
        }
        if(['pendingpro','resolved','unseen'].includes(item)){
            setView({problems:true});
            setStatus(item);
        }
        else if (item === 'add promotion') 
            setView({addpromo :true});
        else if (item === 'add user') 
            setView({adduser : true});
        else if (item === 'refund') 
            setView({refund : true});
    }   
    useEffect(()=> {
        const auth = async() =>{ 
            const loggedInRes=await courseService.getLoggedIn();
            if(loggedInRes.type === 'administrator'){
                setReady(true);
            }
            else 
                navigate("/not-found");
        };
        auth();
    });
    return ( 
        <React.Fragment>
            {ready && <div className="row mt-3">
                <div className="col-sm-1"></div>
                <div className="col-sm-3 text-center">
                    <img src="./admin.png" width={'80px'} style={{borderRadius:'30px'}} alt="" />
                    <h6 className='m-2'>{username}</h6>
                    <Navigation
                        activeItemId={"add user"}
                        onSelect={({itemId}) => {
                            chooseItem(itemId);
                        }}
                        items={[
                            {title : "Add User",
                            itemId : "add user"
                            },
                            {title : "Add Promotion",
                            itemId : "add promotion"
                            },
                            {title : "Refund Requests",
                            itemId : "refund"
                            },
                            {title : "Courses Requests",
                            itemId : "requests",
                            subNav : [
                                {title : "Pending Requests",
                                itemId : "pending",
                                },
                                {title : "Approved Requests",
                                itemId : "approved",
                                },
                                {title : "Rejected Requests",
                                itemId : "rejected",
                                },
                            ]
                            },
                            {title : "Courses Problems",
                            subNav : [
                                {title : "Unseen problems",
                                itemId : "unseen",
                                },
                                {title : "Pending problems",
                                itemId : "pendingpro",
                                },
                                {title : "Resolved problems",
                                itemId : "resolved",
                                },
                            ]
                            },
                        ]}
                    />
                </div>
                <div className="col-sm-7 text-center">
                    {view.requests && <CoursesRequests status={status}/>}
                    {view.problems && <Problems status={status}/>}
                    {view.addpromo && <SetPromotions role={'admin'}/> }
                    {view.adduser && <Adduser /> }
                    {view.refund && <RefundRequests /> }
                </div>
                <div className="col-sm-1"></div>
            </div>}
            {!ready && 
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                    <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
                </div>
            }
        </React.Fragment>
     );
}
 
export default AdminView;