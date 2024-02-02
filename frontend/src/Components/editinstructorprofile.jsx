import React , {useContext, useState} from "react";
import "./editprofile.css";
import swal from 'sweetalert';
import courseService from "../courseContainer";
import AuthContext, { AuthContextProvider } from"../context/AuthContext";

function Editinstructorprofile() {
  const {loggedIn,id,accepted,email,minibiography}=useContext(AuthContext);
    const [error , seterror] = useState("");
    const [minibiographyerror , setminibiographyerror] = useState("");

    const [data , setdata] = useState({
        email : email,
        minibiography : minibiography
    })

    async function submit(){
      if(!data.email && !data.minibiography){
        seterror(true);
      }
      if (data.minibiography !== 0 || data.email.length !== 0 ){
        swal({
          title: "Do you want to save the changes?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(async (willDelete) => {
          if (willDelete) {
            swal("your mini biography has been updated", {
              icon: "success",
            });
          }
          const res = await courseService.changeEmailorBiography(data);
        });
      }
    }
  const handleChange = (e, type)=>{
      let temp = {... data};
      temp[type] = e.target.value;
      seterror(false)
      setdata(temp);
  }
  return (
    <div className="card bg-light p-3 mt-3">
        <h2>Edit My information</h2>
            {error && <div className="alert alert-danger">You Must add Email or Minibigrapy</div>}
            <div className="form-floating mb-3">
                <input onChange={(e) => handleChange(e, 'email')} value={data.email} type="text" className="form-control" placeholder="Subject" />
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3" />
            <div className="form-floating mb-3">
                <textarea onChange={(e) => handleChange(e,'minibiography')} value={data.minibiography} name="summary" id="summary" className="form-control" placeholder="Leave a comment here" style={{ height: '100px' }}></textarea>
                <label htmlFor="floatingTextarea2">Minibiography</label>
            </div>
            <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                <button className="buttoon pt-2" style={{width:  '500px', margin : 0}} onClick={(e)=>submit()}> Save </button>
            </div>
    </div>
  );
}
export default Editinstructorprofile;