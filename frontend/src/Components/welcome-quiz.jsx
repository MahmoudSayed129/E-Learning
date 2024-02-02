import React, { useState } from 'react';
import { useEffect } from 'react';
import CourseService from '../courseContainer';
import { Link, useLocation } from 'react-router-dom';

const WelcomeQuiz = ({id ,grade, courseID}) => {
    return ( 
        <section className="page-section">
            <div className="container bg-light py-5" >
                {grade ? 
                    <h5 style={{fontFamily : 'cursive'}}>  
                            { grade >= 60 ? 
                                <div>
                                    You passed this quiz with grade : 
                                    <span className="badge bg-dark mx-3" style={{color : 'lightgreen'}}>
                                        {grade} %
                                    </span>
                                </div>
                            : ( <div>
                                    You failed in this quiz with grade : 
                                    <span className="badge bg-dark mx-3" style={{color : 'lightcoral'}}>
                                        {grade} %
                                    </span>
                            </div>
                            )}
                    </h5>
                :  (
                    <h5 style={{fontFamily : 'cursive'}}>
                        This is your first attempt 
                    </h5>
                    )   
                }
            <hr />
            <h6>Rules : </h6>
            <ol className='bg-dark' style={{fontWeight: 'bold', border : '1px solid lightcoral', borderRadius : '25px', color : 'white'}}>
                <li className="my-2">You Should check the box "I am ready" to be able to submit</li>
                <li className="my-2">You must get 60% or higher to pass this quiz</li>
                <li className="my-2">You can navigate between questions using the tow arrows</li>
                <li className="my-2">There are cards hold number represents Question when card is :
                    <ul style={{fontWeight: 'bold'}} className="my-2">
                            <li style={{color : 'lightcoral'}}> Red : Question has not been solved</li>
                            <li style={{color : 'lightgreen'}}> Green : Question has been solved (does not mean correct or not) </li>
                    </ul>
                </li>
            </ol>
            <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <Link to={`/quiz/${courseID}/${id}`} style={{width: '250px', margin:0}} className="buttoon pt-2">Start the Quiz <i className="fa fa-play" aria-hidden="true"></i></Link>
            </div>
            </div>
        </section>

     );
}
 
export default WelcomeQuiz;