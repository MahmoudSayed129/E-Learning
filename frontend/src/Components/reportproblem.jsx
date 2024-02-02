import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import courseService from '../courseContainer';



function Reportproblem({ courseID }) {
  const [texterror, settexterror] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setdata] = useState({
    question: "",
    answer: "",
    type: "",
    answered: false,
    courseID: courseID,

  });
  async function submit(e) {
    if (data.question.length == 0 || !data.type || data.type === 'Select Type of Problem') {
      settexterror(true);
    }
    else {
      settexterror(false);
      setdata({
        question: "",
        answer: "",
        type: "",
        answered: false,
        CourseID: courseID,

      });
      console.log(data);
      const res = await courseService.addproblems(data);
      setDone(true);

    }
  }

  function handle(e) {
    settexterror(false);  
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setdata(newdata);
    console.log(newdata);
  }
  return (
    <React.Fragment>
      <div className="card col-sm-8 mt-3" style={{  display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <h3 className='text-center my-2'>Write Your Problem</h3>
          {done && <div className="alert alert-success">We have recieved your problem</div>}
          {texterror ? <div className="alert alert-danger">You must write the problem and select its type.</div> : ""}
        <div className="form-floating mb-3">
          <textarea onChange={(e) => handle(e)} value={data.question} name="summary" id="question" className="form-control" placeholder="Enter your problem ." style={{ width: '600px',height: '100px' }}></textarea>
          <label htmlFor="floatingTextarea2">Enter your problem .</label>
        </div>
        

        <select onChange={(e) => handle(e)} id="type" value={data.type} className='form-control my-3 ' placeholder='type'>
          <option value="">Select Type of Problem</option>
          <option value="technical">Technical</option>
          <option value="financial">Financial</option>
          <option value="other">Other</option>
        </select>
        <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <button className="buttoon pt-2" style={{width : '450px', margin : '0px'}} onClick={(e) => submit(e)} id="type">Send the Problem</button>
        </div>
      </div>
    </React.Fragment>

  );
}

export default Reportproblem;