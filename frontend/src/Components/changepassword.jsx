import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import courseService from '../courseContainer';
<link rel="stylesheet" href="edituserproile.css" />

function Changepassword(props) {

    const [oldpassworderror , setoldpassworderror] = useState("");
    const [newpassworderror , setnewpassworderror] = useState("");
    const [confirmnewpassworderror , setconfirmnewpassworderror] = useState("");
    const [repeaterror , setrepeaterror] = useState("");
    const [matcherror , setmatcherror] = useState("");
    const [error, seterror] = useState(false)

    const [data , setdata] = useState({
        oldpassword : "",
        newpassword : "",
        confirmnewpassword : ""
    })

    async function submit(){
        //e.preventdefault(e);
        if(data.oldpassword.length === 0){
            setoldpassworderror(true);
        }
        else{
            setoldpassworderror(false);
        }
        if(data.newpassword.length === 0){
            setnewpassworderror(true);
        }
        else{
            setnewpassworderror(false);
        }
        if(data.confirmnewpassword.length ===0){
            setconfirmnewpassworderror(true);
        }
        else{
            setconfirmnewpassworderror(false);
        }
        if(data.oldpassword.length !== 0 && data.newpassword.length !== 0 && data.confirmnewpassword.length !==0){
            if(data.oldpassword ===data.newpassword){
                setrepeaterror(true);
            }
            else{
                setrepeaterror(false);
            }
            if(data.newpassword !== data.confirmnewpassword){
                setmatcherror(true);
            }
            else{
                setmatcherror(false);
            }
            if (data.newpassword === data.confirmnewpassword && data.oldpassword !==data.newpassword ){
                swal({
                    title: "Do you want to update your password?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then(async (willDelete) => {
                    const res = await courseService.changePassword(data);
                    console.log(res);
                    if (!res.error) {
                      swal("Your password has been updated", {
                        icon: "success",
                      });
                    }
                    else {
                        seterror(true);
                    }
                  });
            }
        }      
   }
   const handleChange = (e, type)=>{
    let temp = {... data};
    temp[type] = e.target.value;
    if(type === 'oldpassword'){
      setoldpassworderror(false);
      seterror(false);
    }
    if(type === 'newpassword')
      setnewpassworderror(false);
    if(type === 'confirmnewpassword')
      setconfirmnewpassworderror(false);
    console.log(temp);
    setdata(temp);
}

  return (
    <div className="card bg-light p-4 mt-5">
        <h2>Change Password</h2>
            {error && <div className='alert alert-danger'>Incorrect Password.</div>}
            <div className="form-floating mb-3">
                <input type="password" className="form-control" placeholder='Old Password' onChange={(e)=>{handleChange(e,'oldpassword')}}/>
                <label htmlFor='floatingInput'>Old Password</label>
            </div>
            <div>
                {oldpassworderror && <label className = "l1">Old Password field required</label> }
                <div className="form-floating mb-3" />
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" placeholder='New Password' onChange={(e)=>{handleChange(e,'newpassword')}}/>
                <label htmlFor='floatingInput'>New Password</label>
            </div>
            <div>
                {newpassworderror && <label className = "l1">New Password field required</label> }
                <div className="form-floating mb-3" />
            </div>
            <div className="form-floating mb-3">
                <input type="password" name="" required="" className="form-control" placeholder='Confirm New Password' onChange={(e)=>{handleChange(e,'confirmnewpassword')}}/>
                <label htmlFor='floatingInput'>Confirm New Password</label>
            </div>
            <div>
                {confirmnewpassworderror && <label className = "l1">Confirm New Password field required</label> }
                
            </div>
            <div>
                {repeaterror && <label className = "l1">Old pw and New pw are the same</label> }
                
            </div>
            <div>
                {matcherror && <label className = "l1">Two new passwords do not match</label> }
            </div>
            <button className='savebuttoon' onClick={(e)=>submit()}>Save</button>
        
    </div>
  )
}

export default Changepassword;