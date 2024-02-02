import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect } from 'react';
import CourseService from '../courseContainer';
// import quizExample from '../quiz';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './sidebar';
import courseService from '../courseContainer';
import ReactLoading from 'react-loading';

const Quiz = () => {
    const [quiz, setQuiz] = useState({});
    const [ready, setReady] = useState(false);
    const [readyTosubmit, setReadyTosubmit] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [counter, setCounter] = useState(0);
    const [answer, setAnswer] = useState({});
    const [checked, setChecked] = useState({});
    const [color, setColor] = useState('lightcoral');
    const [percentage, setPercentage] = useState(0);
    const {id}=useParams();
    const navigate = useNavigate();
    const {courseID}=useParams();
    useEffect(()=>{
        const getquiz = async ()=>{
            const res = await CourseService.getQuiz(id);
            if(!res) {
                navigate('/not-found');
            }
            console.log(res);
            setQuiz(res);
            setReady(true);
        }
        getquiz();
    },[]);

    const answerQuestion = (number, option)=>{
        let checkedTemp = {... checked};
        let answerTemp = {... answer};
        checkedTemp[number] = option.text;
        answerTemp[number] = option.correct;
        setAnswer(answerTemp);
        setChecked(checkedTemp);
    }
    const submit = async () => {
        let correct = 0;
        for (let index = 0; index < quiz.questions.length; index++) {
            if(answer[index])
                correct++;
        }
        let res = ((correct / quiz.questions.length) * 100).toFixed(2);
        setPercentage(res);
        if(res >= 60) {
            setColor('lightgreen');
        }
        setCounter(0);
        setSubmitted(true);
        const data = await courseService.saveQuiz(id, courseID, res);
    }

    return (
        <React.Fragment>
                {ready &&
                    <React.Fragment>
                        <div className="card my-4" style= {{border: '1px solid #a00407'}} >
                        {submitted && <Link className='buttoon pt-2 col-sm-3 mb-2' style={{width : '350px', margin:0}} to={`/take-course/${courseID}`}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back to the course</Link>}
                        <div className="d-flex justify-content-around px-3">
                            {submitted && 
                                <div style={{ width: 50, height: 50 }}><CircularProgressbar styles={buildStyles({pathColor: color})} value={percentage} text={`${percentage}%`} /></div>
                            }
                            <div className="question-remaining">
                                <span style={{fontStyle: 'italic'}}>
                                    Question {counter + 1} of {quiz.questions.length}
                                </span>
                            </div>
                            {submitted &&
                                <React.Fragment>
                                    {checked[counter] ? 
                                        <React.Fragment>
                                            {answer[counter] ? 
                                                <span style={{color : 'green'}}>Correct answer</span>
                                            :   (<span style={{color : 'red'}}>Wrong answer</span>)
                                            }
                                        </React.Fragment>
                                    : (
                                        <span style={{color : 'red'}}>You did not answer</span>
                                    )
                                    }
                                </React.Fragment>
                            // : (<div className="timer">
                            //      </div>)
                            }

                        </div>
                        <div className="text-center">
                            <hr className="divider" />
                        </div>
                        <div className=" my-3 text-center">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <div className="row">
                                        {quiz.questions.map((q,num)=>{
                                            return (
                                                <React.Fragment key={num}>
                                                    {!submitted && 
                                                        <div className="col-sm-1">
                                                        {checked[num] ? 
                                                            <div className="card num text-center mb-2" onClick={() => setCounter(num)} style={{backgroundColor : 'lightgreen'}}>
                                                            {num + 1}
                                                        </div>
                                                        : (
                                                        <div className="card num text-center mb-2" style={{backgroundColor : 'lightcoral'}} onClick={() => setCounter(num)}>
                                                            {num + 1}
                                                        </div>
                                                        )}
                                                    </div>}
                                                    {submitted && 
                                                        <div className="col-sm-1">
                                                        {answer[num] ? 
                                                            <div className="card num text-center mb-2" onClick={() => setCounter(num)} style={{backgroundColor : 'lightgreen'}}>
                                                            {num + 1}
                                                        </div>
                                                        : (
                                                        <div className="card num text-center mb-2" style={{backgroundColor : 'lightcoral'}} onClick={() => setCounter(num)}>
                                                            {num + 1}
                                                        </div>
                                                        )}
                                                    </div>}
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="question">
                            <div className="card">
                                <div className="row">
                                    <h3  className="text-right col-sm-12">{quiz.questions[counter].questionText}</h3>
                                </div>
                            </div>
                            <div className="options">
                                    {quiz.questions[counter].options.map(option =>{
                                        return (
                                            <React.Fragment key={option.text}>
                                                {!submitted && 
                                                <li onClick={()=>{answerQuestion(counter, option)}}>
                                                {checked[counter] === option.text && 
                                                <div className="card" style={{backgroundColor : 'bisque'}}>
                                                    {option.text}
                                                </div>}
                                                {checked[counter]  !== option.text && 
                                                    <div className="card" style={{backgroundColor : 'white'}}>
                                                    {option.text}
                                                </div>}
                                            </li>}
                                            {submitted && <li>
                                                {option.correct && 
                                                <div className="card" style={{backgroundColor : 'lightgreen'}}>
                                                    {option.text}
                                                </div>}
                                                {checked[counter] === option.text && !option.correct && 
                                                    <div className="card" style={{backgroundColor : 'lightcoral'}}>
                                                    {option.text}
                                                </div>}
                                                {checked[counter] !== option.text && !option.correct && 
                                                    <div className="card" style={{backgroundColor : 'white'}}>
                                                    {option.text}
                                                </div>}
                                            </li>}
                                            </React.Fragment>
                                        );
                                    })}
                            </div>
                            {submitted && <React.Fragment>
                                {answer[counter] ? 
                                <div className='alert alert-success'>{quiz.questions[counter].explanation}</div>
                                :(<div className='alert alert-danger'>{quiz.questions[counter].explanation}</div>)    
                                }
                                </React.Fragment>
                            }
                            <div className="d-flex justify-content-between">
                                <button disabled={counter === 0} className="btn my-3" onClick={()=>{setCounter(counter-1)}}><i style={{color : '#a00407'}} className="fa fa-chevron-left fa-3x" aria-hidden="true"></i></button>
                                <button disabled={counter === quiz.questions.length - 1}  onClick={()=>{setCounter(counter+1)}} className="btn my-3"><i style={{color : '#a00407'}} className="fa fa-chevron-right fa-3x " aria-hidden="true"></i></button>
                            </div>
                        </div>
                        {!submitted && <div className="text-center mt-4">
                            <div className="custom-control custom-checkbox">
                                <input onClick={()=>setReadyTosubmit(!readyTosubmit)}  type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" htmlFor="customCheck1"> I am ready to submit</label>
                            </div>
                            <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                                <button disabled={!readyTosubmit} style={{margin : "0", width : '350px'}} className="buttoon pt-2 mb-3" onClick={()=>{submit()}}>Submit
                                </button>
                            </div>
                        </div>}
                    </div>
                    </React.Fragment>
                }
            {!ready && 
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                    <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
                </div>
            }
        </React.Fragment>
    )
}
export default Quiz;