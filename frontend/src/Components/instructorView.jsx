import React, { useContext, useEffect, useState } from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Changepassword from './changepassword';
import Createcourse from './createcourse';
import StudentProfile from './studentProfile';
import Wallet from './wallet';
import Reviewsoninstructor from './reviewsoninstructor';
import Editinstructorprofile from './editinstructorprofile';
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import SetPromotions from './setPromotions';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import courseService from '../courseContainer';

const InstructorView = ({type}) => {
    const [view, setView] = useState({});
    const {loggedIn,id,username}=useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const chooseItem = (item) => {
        if(item === 'profile') 
            setView({profile : true});
        else if(item === 'password') 
            setView({changepassword : true,});
        else if(item === 'information') 
            setView({changeinfo : true});
        else if(item === 'earn') 
            setView({earn : true});
        else if(item === 'addc') 
            setView({addcourse : true});
        else if(item === 'rate') 
            setView({rate : true});
        else if(item === 'promo') 
            setView({addpromo : true});
    } 
    useEffect (()=>{
        const auth = async() =>{ 
            const loggedInRes=await courseService.getLoggedIn();
            if(loggedInRes.type === 'instructor'){
                if(type == 'profile') {
                    setView({profile : true});
                    setItems(
                        [{title : "Profile",
                        itemId : "profile"
                        },
                        {title : "Rating and Reviews",
                        itemId : "rate"
                        },
                        {title : "Settings",
                        subNav : [
                            {title : "Change my Password",
                            itemId : "password",
                            },
                            {title : "Change my Information",
                            itemId : "information",
                            },
                        ]
                        },
                        {title : "My Earnings",
                        itemId : "earn"
                        },]
                    )
                } else {
                    setView({addpromo : true});
                    setItems(
                        [
                        {title : "Add Promotion",
                        itemId : "promo"},
                        {title : "Add Course",
                        itemId : "addc"
                        },])
        
                }
                setReady(true);
            }
            else 
                navigate("/not-found");
        };
        auth();  
    },[])  
    return ( 
        <React.Fragment>
            {ready && 
            <div className="row mt-3">
                <div className="col-sm-1"></div>
                <div className="col-sm-3 text-center">
                    <img src="./instructor.png" width={'80px'} style={{borderRadius:'30px'}} alt="" />
                    <h6 className='m-2'>{username}</h6>
                    <Navigation
                        activeItemId={"profile"}
                        onSelect={({itemId}) => {
                            chooseItem(itemId);
                        }}
                        items={items}
                    />
                </div>
                <div className="col-sm-7 text-center">
                    {view.changepassword && <Changepassword />}
                    {view.profile && <StudentProfile />}
                    {view.earn && <Wallet />}
                    {view.addcourse && <Createcourse />}
                    {view.rate && <Reviewsoninstructor />}
                    {view.changeinfo && <Editinstructorprofile />}
                    {view.addpromo && <SetPromotions role={'instructor'}/> }
                </div>
                <div className="col-sm-1"></div>
            </div>
            }
            {!ready && 
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                    <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
                </div>
            }
        </React.Fragment>
     );
}
 
export default InstructorView;