import React , {useState} from "react";
import "./editprofile.css";
import swal from 'sweetalert';

function Edituserprofile() {
    const [firstnamenerror , setfirstnameerror] = useState("");
    const [lastnamenerror , setlastnameerror] = useState("");
    const [descriptionenerror , setdescriptionerror] = useState("");

    const [data , setdata] = useState({
      firstname : "",
      lastname : "",
      description : ""
  })

    async function submit(){
      //e.preventdefault(e);
      if (data.firstname.length === 0){
        setfirstnameerror(true);
      }
      else{
        setfirstnameerror(false);
      }
      if (data.lastname.length === 0){
        setlastnameerror(true);
      }
      else{
        setlastnameerror(false);
      }
      if (data.description.length === 0){
        setdescriptionerror(true);
      }
      else{
        setdescriptionerror(false);
      }
      if (data.firstname.length !== 0 && data.lastname.length !== 0 && data.description.length !== 0){
        swal({
          title: "Do you want to save the changes?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("your profile has been updated", {
              icon: "success",
            });
          }
        });
      }
    }
  const handleChange = (e, type)=>{
      let temp = {... data};
      temp[type] = e.target.value;
      if(type === 'firstname')
        setfirstnameerror(false);
      if(type === 'lastname')
        setlastnameerror(false);
      if(type === 'description')
        setdescriptionerror(false);
      setdata(temp);
  }
  return (
      <div className="login-box">
        <h2>Edit User Profile</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required="" onChange={(e)=>{handleChange(e,'firstname')}}/>
            <label for="name">Firstname</label>
          </div>
          <div>
          {firstnamenerror && <label className = "l1">Firstname field required</label>}
          <div className="form-floating mb-3" />
          </div>
          <div className="user-box">
            <input type="text" name="" required="" onChange={(e)=>{handleChange(e,'lastname')}}/>
            <label>Lastname</label>
          </div>
          <div>
          {lastnamenerror && <label className = "l1">Lastname field required</label>}
          <div className="form-floating mb-3" />
          </div>
          <div className="user-box">
            <input type="text" name="" required="" onChange={(e)=>{handleChange(e,'description')}}/>
            <label>Description</label>
          </div>
          <div>
          {descriptionenerror && <label className = "l1">Description field required</label> }
          <div className="form-floating mb-3" />
          </div>
          <a href="#" onClick={(e)=>submit()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
          </a>
        </form>
      </div>
  );
}
export default Edituserprofile;