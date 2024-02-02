import React ,{useState} from 'react'
import swal from 'sweetalert';
import courseService from '../courseContainer';
import "./rate.css";
import {Link, useNavigate, useParams} from 'react-router-dom';

function Rateinstructor() {
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const [data , setdata] = useState({
      rate :"",
      review : ""
  })
  const {id} = useParams();
  const {insturctorID} = useParams();
  const [error, setError] = useState(false);
  async function rateCourse(){
      if(data.review && data.rate) {
        swal({
          title: "Do you want to submit your rating?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(async (willDelete) => {
          if (willDelete) {
            swal("Your rating has been recorded", {
              icon: "success",
            });
          }
          console.log(data);
          const res = await courseService.rateInstructor(data.review,data.rate,insturctorID);
          navigate(`/take-course/${id}`);
          setDone(true);
        });
      }
      else {
          setError(true)
      }
  }
  async function skip(){
      //e.preventdefault(e);
      swal({
          title: "Want to skip?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
        });
  }

  const handle = (e)=>{
    let temp = {... data};
    temp[e.target.className] = e.target.value;
    setdata(temp);
    setError(false);
  }
  const handlereview = (e)=>{
    let temp = {... data};
    temp['review'] = e.target.value;
    setdata(temp);
    setError(false);
  }

return (
  <div className="row">
   {!done ? 
     <React.Fragment>
      <div className="col-sm-3">
     </div>
  <div className="col-sm-6">
<div className='text-center p-2 my-2 bg-light' style={{border : '1px solid black', borderRadius : '15px'}}>
{error && <div className='alert alert-danger'> You must fill all the data</div>}  
<div class="rating">
 <input type="radio" onClick={(e)=>{handle(e)}} className='rate' value={5} name="star"/><span class="star"> </span>
 <input type="radio" value={4} onClick={(e)=>{handle(e)}} className='rate' name="star"/><span class="star"> </span>
 <input type="radio" value={3} onClick={(e)=>{handle(e)}} className='rate' name="star"/><span class="star"> </span>
 <input type="radio" value={2} onClick={(e)=>{handle(e)}} className='rate' name="star"/><span class="star"> </span>
 <input type="radio" value={1} onClick={(e)=>{handle(e)}} className='rate' name="star"/><span class="star"> </span>
 <span class="emo"> </span>
</div> 
<div className="form-floating mb-3">
<textarea onChange={(e)=>{handlereview(e)}}  id = "review" value={data.review} className="form-control" placeholder="Leave a comment here" style={{height: '100px'}}></textarea>
<label htmlFor="floatingTextarea2">Let Us know your opinion about the course</label>
</div>
<div className="form-floating mb-3" />
 <button className='buttoon pt-2 mx-5' style={{margin:0}} onClick={(e)=>rateCourse()}>Rate Instructor</button>
<div className="form-floating mb-3" />
 {/* <button className='btn btn-primary' onClick={(e)=>skip()}>Skip Rating</button> */}
</div>
 </div>
     </React.Fragment>
    : (
        <React.Fragment>
          <h1>Success process</h1>
          <Link to={`/take-course/${id}`} className='btn btn-primary' >back</Link>
        </React.Fragment>
      )
   }
  </div>
);
}

export default Rateinstructor