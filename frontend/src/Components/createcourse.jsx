import React, { useContext } from 'react';
import courseService from '../courseContainer';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import ReactLoading from 'react-loading';

<link rel="stylesheet" href="index.css" />

function Createcourse(props) {
    const {loggedIn,id,accepted}=useContext(AuthContext);
    const [accept, setAccept] = useState(accepted);
    const [totalhours, sethours] = useState("");
    const [done, setdone] = useState(false);
    const [titleofsubtitle, settitle] = useState("");
    const [summaryofsubtitle, setsummary] = useState("");
    const [video, setvideo] = useState("");
    const [videotitle, setvideotitle] = useState("");
    const [viddiscription, setviddiscription] = useState("");
    const [boolquiz, setboolquiz] = useState(true);
    const [texterror, settexterror] = useState("");
    const [titlerror, settitlerror] = useState("");
    const [videoerror, setvideoerror] = useState("");
    const [quizID, setquizID] = useState(null);
    const [ready, setReady] = useState(true);
    const [boolsection, setboolsection] = useState(false);


    const [data, setdata] = useState({
        subject: "",
        totalHours: "",
        title: "",
        price: "",
        summary: "",
        image: "",
        totalItems : 1,
        overviewvideo:"",
        subtitles: []
    })



    const [subtitles, setsubtitles] = useState([]);
    const [videos, setVideos] = useState([]);
    //const [images,setImages] = useState([]);

    const [counter, setCounter] = useState(0);
    const [quiz, setQuiz] = useState([]);
    

    const [newQuestion, setNewQuestion] = useState(true);
    const [quizdata, setquizdata] = useState({
        title: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        explaination: "",
        correctanswer: ""


    })
    const [questionerror, setquestionerror] = useState("");

    function handle1(e) {
        const newdata = { ...quizdata }
        newdata[e.target.id] = e.target.value
        setquizdata(newdata);
        console.log(newdata);
        setquestionerror(false);
    }
    function handleChange1 (e)  {
        const newdata = { ...quizdata };
        newdata.correctanswer = e.target.value;
        setquizdata(newdata);
    }

    function addquestion() {

        if (quizdata.answer1.length === 0 || quizdata.answer2.length === 0 || 
            quizdata.answer3.length === 0 || quizdata.answer4.length === 0 
            || quizdata.explaination.length === 0 || quizdata.correctanswer.length==0 || quizdata.title.length==0) setquestionerror(true)
        else {
            let question = {};  
            question['questionText'] = quizdata.title;
            question['explanation'] = quizdata.explaination;
            let options = [];
            options[0] = {text : quizdata.answer1}; 
            options[1] = {text : quizdata.answer2}; 
            options[2] = {text : quizdata.answer3}; 
            options[3] = {text : quizdata.answer4};
            console.log(quizdata.correctanswer);
            options[Number(quizdata.correctanswer) - 1].correct = true;
            question['options'] = options;
            let temp = [... quiz];
            temp.push(question);
            setQuiz(temp);
            console.log(question);
            setquizdata({
                title: "",
                answer1: "",
                answer2: "",
                answer3: "",
                answer4: "",
                explaination: "",
                correctanswer: ""
        
        
            })
        }
        console.log(quizdata);
    }

    async function submit() {
        //e.preventdefault(e);
        if (data.totalHours.length === 0 || data.subject.length === 0 || 
            data.title.length === 0 || data.price.length === 0 || 
            data.summary.length === 0 || data.image.length === 0 || 
            data.overviewvideo.length==0) settexterror(true)

        else {
            settexterror(false);
            data.subtitles = subtitles;
            console.log(data);
            const res = await courseService.addCourse(data);
            setdone(true);
        }
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setdata(newdata);
        console.log(newdata);
    }

    function addtitle() {
        let section = { totalHours: totalhours, title: titleofsubtitle, summary: summaryofsubtitle, videos: videos ,quizs: quizID }

        if (totalhours === 0 || titleofsubtitle.length === 0 || summaryofsubtitle.length === null) {
            settitlerror(true);
        }
        else {
            subtitles.push(section)
            settitlerror(false);
            sethours("");
            settitle("");
            setsummary("");
            setvideotitle("");
            setviddiscription("");
            sethours("");
            setvideo("");
            setVideos([]);
            setboolquiz(true);
            setboolsection(false);
        }
        console.log(subtitles);
    }

    function addvideo() {
        let Video = { url : video, title: videotitle, discription : viddiscription }
        if (video.length === 0 || videotitle.length === 0) setvideoerror(true)
        else {
            videos.push(Video)
            let temp = {...data};
            temp.totalItems = temp.totalItems + 1;
            setdata(temp);
            setvideoerror(false);
            setvideo("");
            setvideotitle("");
            setviddiscription("");
        }
        console.log(videos);
    }

     function addquiz (){
        setboolquiz(false);
        setboolsection(false);
     }
     function addsuptitle(){
        setboolsection(true);

        setboolquiz(false);
     }
     
     async function submitquiz(){
        addquestion(); 
        if(!(quizdata.answer1.length === 0 || quizdata.answer2.length === 0 || 
            quizdata.answer3.length === 0 || quizdata.answer4.length === 0 
            || quizdata.explaination.length === 0 || quizdata.correctanswer.length==0 || quizdata.title.length==0)){
        setboolsection(true);
        const result = {questions : quiz};
        const res = await courseService.addQuiz(result);
        let temp = {...data};
        temp.totalItems = temp.totalItems + 1;
        setdata(temp);
        setquizID(res._id);
        console.log(res);
        setquizdata({
            title: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            explaination: "",
            correctanswer: ""
        })
        setQuiz([]);
    }


        

     }

    async function acceptTerms (){
        setReady(false);
        setAccept(true);
        await courseService.acceptTerms();
        setReady(true);
    }
    if(ready) {
        if(accept) {
            if(boolquiz){
                return (
                    <React.Fragment>
                        {!done ? 
                        <div className="row">
                            <div className="col-sm-1">
                            </div>
                            <div className="col-sm-10">
                                <div className='text-center p-2 my-2 bg-light' style={{ border: '1px solid black', borderRadius: '15px' }}>
                                <h4 style={{fontFamily : 'cursive'  }}>Add Course</h4>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => handle(e)} id="subject" value={data.subject} type="text" className="form-control" placeholder="Subject" />
                                        <label htmlFor="floatingInput">Subject</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => handle(e)} id="title" value={data.title} type="text" className="form-control" placeholder="Title" />
                                        <label htmlFor="floatingInput">Title</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => handle(e)} id="totalHours" value={data.totalHours} type="number" className="form-control" placeholder="Title" />
                                        <label htmlFor="floatingInput">Course Hours</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => handle(e)} id="price" value={data.price} type="number" className="form-control" min={0} placeholder="Price" />
                                        <label htmlFor="price">Price</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea onChange={(e) => handle(e)} value={data.summary} name="summary" id="summary" className="form-control" placeholder="Leave a comment here" style={{ height: '100px' }}></textarea>
                                        <label htmlFor="floatingTextarea2">Summry</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    {/* <label for="input" id='label'><input onChange={(e) => setimage(e.target.files[0])} type="file" name="cover" id="input" accept="image/*" />Upload Course Cover</label> */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => handle(e)} id="image" value={data.image} type="text" className="form-control" placeholder="image" />
                                        <label htmlFor="img">Image Link</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => handle(e) } id="overviewvideo" value={data.overviewvideo} type="text" className="form-control" placeholder="image" />
                                        <label htmlFor="img">overviewVideo Link</label>
                                    </div>
                                    <div>
                                        {texterror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    {/* <div className="p-3 m-3" style={{borderRadius : '25px', border :'1px solid black'}}>
                                        Subtitle {subtitles.length + 1}
                                    <div className="form-floating mb-3" />
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => { settitle(e.target.value) }} id="titleofsubtitle" value={titleofsubtitle} type="text" className="form-control" placeholder="Subtitle" />
                                        <label htmlFor="floatingInput">Title</label>
                                    </div>
                                    <div>
                                        {titlerror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => { sethours(e.target.value) }} type="number" id="totalhours" value={totalhours} className="form-control" min={0} placeholder="Totalhours" />
                                        <label htmlFor="price">Totalhours</label>
                                    </div>
                                    <div>
                                        {titlerror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea onChange={(e) => { setsummary(e.target.value) }} id="summaryofsubtitle" value={summaryofsubtitle} className="form-control" placeholder="Leave a comment here" style={{ height: '100px' }}></textarea>
                                        <label htmlFor="floatingTextarea2">Summry of Subtitle</label>
                                    </div>
                                    <div>
                                        {titlerror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <button className='btn btn-primary' onClick={(e) => addquiz()}>Add Quiz</button>
                                    <div className="bg-light p-3 m-3" style={{borderRadius : '25px', border:'1px solid black'}}>
                                    <h6>Video {videos.length + 1} for Subtitle {subtitles.length + 1}</h6>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => { setvideotitle(e.target.value) }} id="videotitle" value={videotitle} type="text" className="form-control" placeholder="Video Title" />
                                        <label htmlFor="floatingInput">Video Title {videos.length + 1} for section {subtitles.length + 1}</label>
                                    </div>
                                    <div>
                                        {videoerror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => { setvideo(e.target.value) }} id="video" value={video} type="text" className="form-control" placeholder="Video" />
                                        <label htmlFor="floatingInput">Video Link</label>
                                    </div>
                                    <div>
                                        {videoerror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={(e) => { setviddiscription(e.target.value) }} id="video" value={viddiscription} type="text" className="form-control" placeholder="Video" />
                                        <label htmlFor="floatingInput">Video Discription</label>
                                    </div>
                                    <div>
                                        {videoerror ? <label className="l1">You must fill it</label> : ""}
                                        <div className="form-floating mb-3" />
                                    </div>
                                    <button className='btn btn-primary' onClick={() => addvideo()}>Add Video</button>
                                    </div>
                                    <button className='btn btn-primary' onClick={() => addtitle()}>Add Subtitle</button>
                                    </div> */}
                                    <button className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={() => addsuptitle()}>Add Subtitle</button>
                 
                                    <br></br>
                                    <br></br>
            
                                    <button className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={(e) => submit()}>Create Course</button>
                                </div>
                            </div>
                        </div>
                        :(
                            <React.Fragment>
                                <div className='p-5 bg-light' >
                                    <h1 style={{color:'green'}} className='mb-4'>Course added successfully</h1>
                                    <Link style={{width:'300px'}}  to={'/instructor-courses'} className='buttoon pt-2' >Go to My Courses</Link>
                                </div>
                            </React.Fragment>
                        )
                        }
                    </React.Fragment>
                )
                }else if (boolsection){
                    return(
                    <div className="p-3 m-3" style={{borderRadius : '25px', border :'1px solid black'}}>
                        Subtitle {subtitles.length + 1}
                    <div className="form-floating mb-3" />
                    <div className="form-floating mb-3">
                        <input onChange={(e) => { settitle(e.target.value) }} id="titleofsubtitle" value={titleofsubtitle} type="text" className="form-control" placeholder="Subtitle" />
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    <div>
                        {titlerror ? <label className="l1">You must fill it</label> : ""}
                        <div className="form-floating mb-3" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => { sethours(e.target.value) }} type="number" id="totalhours" value={totalhours} className="form-control" min={0} placeholder="Totalhours" />
                        <label htmlFor="price">Totalhours</label>
                    </div>
                    <div>
                        {titlerror ? <label className="l1">You must fill it</label> : ""}
                        <div className="form-floating mb-3" />
                    </div>
                    <div className="form-floating mb-3">
                        <textarea onChange={(e) => { setsummary(e.target.value) }} id="summaryofsubtitle" value={summaryofsubtitle} className="form-control" placeholder="Leave a comment here" style={{ height: '100px' }}></textarea>
                        <label htmlFor="floatingTextarea2">Summry of Subtitle</label>
                    </div>
                    <div>
                        {titlerror ? <label className="l1">You must fill it</label> : ""}
                        <div className="form-floating mb-3" />
                    </div>
                    <button className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={(e) => addquiz()}>Add Quiz</button>
                    <div className="bg-light p-3 m-3" style={{borderRadius : '25px', border:'1px solid black'}}>
                    <h6>Video {videos.length + 1} for Subtitle {subtitles.length + 1}</h6>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => { setvideotitle(e.target.value) }} id="videotitle" value={videotitle} type="text" className="form-control" placeholder="Video Title" />
                        <label htmlFor="floatingInput">Video Title {videos.length + 1} for section {subtitles.length + 1}</label>
                    </div>
                    <div>
                        {videoerror ? <label className="l1">You must fill it</label> : ""}
                        <div className="form-floating mb-3" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => { setvideo(e.target.value) }} id="video" value={video} type="text" className="form-control" placeholder="Video" />
                        <label htmlFor="floatingInput">Video Link</label>
                    </div>
                    <div>
                        {videoerror ? <label className="l1">You must fill it</label> : ""}
                        <div className="form-floating mb-3" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => { setviddiscription(e.target.value) }} id="video" value={viddiscription} type="text" className="form-control" placeholder="Video" />
                        <label htmlFor="floatingInput">Video Discription</label>
                    </div>
                    <div>
                        {videoerror ? <label className="l1">You must fill it</label> : ""}
                        <div className="form-floating mb-3" />
                    </div>
                    <button className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={() => addvideo()}>Add Video</button>
                    </div>
                    <button className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={() => addtitle()}>Submit Subtitle</button>
                    </div>
                    )
                }
                else{
                    return(
                    <div className="container">
                        <div className="container" style={{ width: '800px' }}>
                            <h3 className="text-center">Question {quiz.length + 1}</h3>
                            {questionerror && <div className="alert alert-danger" >You must add querstion text , explanation , 4 options
                                and choose the correct one
                            </div>}
                            <div className="form-group">
                                <label htmlFor="QuestionText" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Enter The Question text :-
                                </label>
                                <textarea onChange={(e) => handle1(e)} id="title" value={quizdata.title} className="form-control" aria-label="Text input with radio button" cols="30" rows="2"></textarea>
                            </div>
                            <div className="text-center">
                                <hr className="divider" />
                            </div>
                            <div className="text-center" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                                Enter 4 options for the question and choose the correct one
                            </div>
                            <div className="input-group my-2">
                                <textarea placeholder='option 1' onChange={(e) => handle1(e)} id="answer1" value={quizdata.answer1} className="form-control" aria-label="Text input with radio button" cols="30"
                                    rows="2"></textarea>
                            </div>
                            <div className="input-group my-2">
                                <textarea placeholder='option 2' onChange={(e) => handle1(e)} id="answer2" value={quizdata.answer2} className="form-control" aria-label="Text input with radio button" cols="30"
                                    rows="2"></textarea>
                            </div>
                            <div className="input-group my-2">
                                <textarea placeholder='option 3' onChange={(e) => handle1(e)} id="answer3" value={quizdata.answer3} className="form-control" aria-label="Text input with radio button" cols="30"
                                    rows="2"></textarea>
                            </div>
                            <div className="input-group my-2">
                                <textarea placeholder='option 4' onChange={(e) => handle1(e)} id="answer4" value={quizdata.answer4} className="form-control" aria-label="Text input with radio button" cols="30"
                                    rows="2"></textarea>
                            </div>
                            <div className="text-center">
                                <hr className="divider" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="QuestionText" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Enter The  
                                    correct choice number from 1 to 4
                                    :-</label>
                                <input onChange={(e) => handle1(e)} id="correctanswer" min={1} max={4} type="number" value={quizdata.correctanswer} className="form-control" aria-label="Text input with radio button"
                                    cols="30" rows="2"></input>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="QuestionText" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Enter The explanations
                                    for the
                                    correct choice
                                    :-</label>
                                <textarea onChange={(e) => handle1(e)} id="explaination" value={quizdata.explaination} className="form-control" aria-label="Text input with radio button"
                                    cols="30" rows="2"></textarea>
                            </div>
                            <br></br>
                            <div className="text-center"><button className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={() => addquestion()} type="submit" >Add Another Question <i
                                className="fa fa-step-htmlForward" aria-hidden="true"></i></button></div>
                                <br></br>
                            <div className="text-center" ><button
                               className="buttoon pt-2 mt-4" style={{margin : "0", width : '350px'}} onClick={() => submitquiz()}>Save the Quiz <i className="fa fa-floppy-o"
                                    aria-hidden="true"></i></button></div>
                        </div>
                    </div>
                )
                }
        }
        else {
            return (
                <React.Fragment>
                    <h1>Terms and Condition :</h1>
                    <ul>
                        <li>role</li>
                        <li>role</li>
                        <li>role</li>
                        <li>role</li>
                        <li>role</li>
                        <li>role</li>
                    </ul>
                    <button className='buttoon pt-2' onClick={()=>acceptTerms()}>Accept</button>
                </React.Fragment>
            )
        }
    }
    else {
        <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
            <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
        </div>
    }

}

export default Createcourse;