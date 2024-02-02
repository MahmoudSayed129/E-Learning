import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../courseContainer';
//first we need to take the values from the input fields using use state
export default function Reset() {
    const[newpassword,setNewPassword]=useState("");
    const[confirmpassword,setConfirmedPassword]=useState("");
    const[error,seterror]=useState("");
    const[type,setType]=useState("");
    const[id,setId]=useState("");
    const[ready,setReady]=useState(false);
    const {token} = useParams();
    const navigate = useNavigate();
    useEffect (()=>{
        const verify = async()=>{
            const res = await courseService.VerifyLink({token});
            if(res.error)
                navigate('/notfound');
            setType(res.type);
            setId(res._id);
            setReady(true);
        }
        verify();
    },[])
    async function Reset(e){
        //to prevent the page from refreshing when submit
        e.preventDefault();
        try {
            if(newpassword !== confirmpassword){
                seterror("Passwords did not match");
            }else if( !newpassword || !confirmpassword) {
                seterror("Please enter new password");
            }
            else {
                const resetData={
                    newpassword,
                    confirmpassword,
                    type,
                    id,
                }
                setReady(false);
                await courseService.ResetPassword(resetData);
                navigate('/login');
                setReady(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    } 
  return (
    <React.Fragment>
        {ready ?
            <div>
                <h1 id='logintitle'>Reset your password</h1>
                <div id="loginContainer">
                {error && <div className='alert alert-danger'>
                        {error}
                </div>
                }
            
                <form onSubmit={Reset}>
                    
                <div className="user-details">
                <div className="material-textfield input-box ">
                        <input 
                        className="inputt"
                        placeholder=" "
                        type="password"
                        value={newpassword}
                        onChange={(e)=>{seterror("")
                        setNewPassword(e.target.value)}}>
                        </input>
                        <label className="labell">New Password</label>
                    </div>
                    <div className="material-textfield input-box ">
                        <input 
                        type="password" 
                        className='inputt'
                        placeholder=" "
                        value={confirmpassword}
                        onChange={(e)=>{seterror("")
                            setConfirmedPassword(e.target.value)}}>
                        </input>
                        <label className="labell">Confirm Password</label>
                    </div>
                    </div>
                    <button className='buttoon pt-2'>Reset</button>
                </form>
                </div>
                <h1 id="mar2"> </h1>
            </div>
        :(
            <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
            </div>
        )}
    </React.Fragment>
  )
}
