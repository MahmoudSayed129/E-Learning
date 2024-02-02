import React, { useContext, useEffect, useState }  from 'react';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {Navigation} from 'react-minimal-side-navigation';
import Changepassword from './changepassword';
import StudentProfile from './studentProfile';
import ReactLoading from 'react-loading';
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import StudentWallet from './studentWallet';
import courseService from '../courseContainer';
import { useNavigate } from 'react-router-dom';
import StudentRefundRequests from './studentRefundReq';
import StudentCourseRequests from './studentCourseReq';

const ProfileView = () => {
    const [view, setView] = useState({profile : true});
    const [active, seTactive] = useState("");
    const [ready, setReady] = useState(false);
    const [items, setItems] = useState({});
    const {loggedIn,id,type, username,wallet}=useContext(AuthContext);
    const navigate = useNavigate();
    const chooseItem = (item) => {
        if(item === 'profile') 
            setView({profile : true});
        else if(item === 'wallet') 
            setView({wallet:true});
        else if(item === 'password') 
            setView({changepassword : true,});
        else if(item === 'coursereq') 
            setView({coursereq : true});
        else if(item === 'refund') 
            setView({refundREQ : true});
    };
    useEffect (()=>{
        const auth = async() =>{ 
            const loggedInRes=await courseService.getLoggedIn();
            console.log(loggedInRes.type);
            if(loggedInRes.type === 'student' || loggedInRes.type === 'corporatetrainees '){
                let itemTemp = [];
                itemTemp.push({title : "Profile",
                itemId : "profile"
                });
                if(type != "corporatetrainees "){
                    itemTemp.push({title : "My Wallet",
                    itemId : "wallet"
                    });
                    itemTemp.push({
                        title : "Refund Requests",
                        itemId : "refund",
                    })
                }
                else {
                    itemTemp.push({
                        title : "Course Requests",
                        itemId : "coursereq",
                    })
                }
                itemTemp.push({title : "Change my Password",
                            itemId : "password",
                            },);
                setItems(itemTemp);
                setReady(true);
            }
            else 
                navigate("/not-found");
        };
        auth();
        
    },[type])
    return ( 
        <React.Fragment>
            {ready && <div className="row mt-3">
                <div className="col-sm-1"></div>
                <div className="col-sm-3 text-center">
                    <img src="./graduating-student.png" width={'80px'} style={{borderRadius:'30px'}} alt="" />
                    <h6 className='m-2'> {username} </h6>
                    <Navigation
                        activeItemId={active}
                        onSelect={({itemId}) => {
                            chooseItem(itemId);
                        }}
                        items={items}     
                    />
                </div>
                <div className="col-sm-7 text-center">
                    {view.changepassword && <Changepassword />}
                    {view.profile && <StudentProfile />}
                    {view.wallet && <StudentWallet wallet={wallet}/>}
                    {view.refundREQ && <StudentRefundRequests />}
                    {view.coursereq && <StudentCourseRequests />}
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
 
export default ProfileView;