import React from 'react'
import { useState } from 'react'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import courseService from '../courseContainer';
//first we need to take the values from the input fields using use state
export default function Reset() {
    const [username,setUserName]=useState("");
    const [loading, setloading] = useState(false);
    const [done, setdone] = useState(false);
    const [error, seterror] = useState("");
    async function handleReset(e){
        //to prevent the page from refreshing when submit
        e.preventDefault();
        try {
            const forgetData={
                username,
            }
            setloading(true);
            const res = await courseService.ForgtetPassword(forgetData);
            console.log(res.error);
            setloading(false);
            if(res.error){
                seterror(res.error);
            }else {
                setdone(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    } 
  return  (
    <React.Fragment>
        {!done && !loading && <div>
         <h1 id='logintitle'>Enter your user name</h1>
         <div id="loginContainer">
         {error && <div className='alert alert-danger'>{error}</div>}
         <form onSubmit={handleReset}>
             
         <div className="user-details">
         <div className="material-textfield input-box ">
                 <input 
                 className="inputt"
                 placeholder=" "
                 type="text"
                 value={username}
                 onChange={(e)=>setUserName(e.target.value)}>
                 </input>
                 <label className="labell">UserName</label>
             </div>
            
             </div>
             <button className='buttoon pt-2'>Confirm</button>
         </form>
         </div>
         <h1 id="mar2"> </h1>
                        </div>
        }
        {!done && loading &&
             <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
            </div>
        }
        {done && 
        <React.Fragment>
            <div className='my-5 py-5'>
            <div style={{  display: 'flex',justifyContent: 'center'}} >
                <span style={{'color' : '#a00407', fontWeight : 'bolder'}}>We have sent a link to your email to reset your password.</span> <br />
            </div>
            <div style={{  display: 'flex',justifyContent: 'center'}}>
                <a className='buttoon pt-2' target={'_blank'} href={'https://mail.google.com/mail/?tab=rm&authuser=0&ogbl'}>Open mail</a >
            </div>
            </div>
        </React.Fragment>
        }
    </React.Fragment>
  )
}
