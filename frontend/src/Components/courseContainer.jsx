import React, { useState, useEffect } from 'react';
import Filters from './common/filters';
import courseService from '../courseContainer.js'
import CourseCard from './courseCard';
import axios from 'axios';
import ReactLoading from 'react-loading';

const CourseContainer = ({type, keyword, currency}) => {
    const [coursesOriginal, setCoursesOriginal] = useState([]);
    const [coursesOriginalV, setCoursesOriginalV] = useState([]);
    const [coursesOriginalP, setCoursesOriginalP] = useState([]);
    const [coursesDisplayed, setCoursesDisplayed] = useState([]);
    const [price, setPrice] = useState(Infinity);
    const [subject, setSubject] = useState("");
    const [rate, setRate] = useState(null);
    const [search, setSearch] = useState("");
    const [ready, setReady] = useState(false);
    const config = {headers : {"apikey" : "mg9jAAsEOiyrDEq4mw4wBarbgswdtryW"}};
    const [priceRate, serPriceRate] = useState(1);
    const [filterPage, serFilterPage] = useState("all");

    const handleCurrency = async (currency) => {
        let result = 1;
        if (currency) {
            const ConversionAPI = `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=USD&amount=1`;
            const {data} = await axios.get(ConversionAPI, config);
            result = data.info.rate;
        }
        return result;
    }

    useEffect(() =>{ 
        setReady(false);
        const getCourses = async (type, keyword) => {
            if(type === 'search') {
                const res = await courseService.getSearchCourses(keyword);
                setCoursesDisplayed(res);
                setCoursesOriginal(res);
                serPriceRate(await handleCurrency(currency));
                setReady(true);
            }
            else if(type === 'instructor'){
                const res = await courseService.getInstructorCourses();
                setCoursesDisplayed(res);
                setCoursesOriginal(res);
                console.log(res);
                serPriceRate(await handleCurrency(currency));
                setReady(true);
            }
            else if(type == 'student') {
                if(filterPage == 'all') {
                    const res = await courseService.getStudentCourses();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    console.log(res);
                    serPriceRate(await handleCurrency(currency));
                    setReady(true);
                }
                else if(filterPage == 'inprogress') {
                    const res = await courseService.getInprogressCourses();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    console.log(res);
                    serPriceRate(await handleCurrency(currency));
                    setReady(true);
                }
                else if(filterPage == 'completed') {
                    const res = await courseService.getCompletedCourses();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    console.log(res);
                    serPriceRate(await handleCurrency(currency));
                    setReady(true);
                }
            }
            else if(type == 'all') {
                if(filterPage == 'all') {
                    const res = await courseService.getAllCourses();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    console.log(res);
                    serPriceRate(await handleCurrency(currency));
                    setReady(true);
                }
                else if(filterPage == 'views') {
                    const res = await courseService.getAllCoursesViews();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    console.log("res");
                    serPriceRate(await handleCurrency(currency));
                    setReady(true);
                }
                else if(filterPage == 'popular') {
                    const res = await courseService.getAllCoursesPopular();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    console.log(res);
                    serPriceRate(await handleCurrency(currency));
                    setReady(true);
                }
            }
        };
        getCourses(type, keyword);
    },[currency, filterPage]);
 
    const handleChange = (filter, value) =>{
        console.log(value + filter);
        if(filter === "subject") {
            if( rate)
            setCoursesDisplayed(
                coursesOriginal.filter(course => {
                    if((course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now())) {
                        return course.subject.includes(value) && Math.round(((course.price * priceRate) - (course.price * priceRate * course.discount.promotion / 100))*100) / 100 <= price && Math.round(course.rate / course.numberofrates) === rate;
                    }
                    else {
                        return course.subject.includes(value) && Math.round((course.price * priceRate) * 100) / 100 <= price && Math.round(course.rate / course.numberofrates) === rate;   
                    }
                })
            )
            else 
                setCoursesDisplayed(
                    coursesOriginal.filter(course => {
                        if((course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now())) {
                            return course.subject.includes(value) && Math.round(((course.price * priceRate) - (course.price * priceRate * course.discount.promotion / 100))*100) / 100 <= price;
                        }
                        else {
                            return course.subject.includes(value) && Math.round((course.price * priceRate) * 100) / 100 <= price;   
                        }
                    })
            )
            setSubject(value);
        }
        else if(filter === "price") {
            if(!value)
                value = Infinity;
            // if(rate)
            // setCoursesDisplayed(
            //     coursesOriginal.filter(course => {
            //         return course.subject.includes(subject) && Math.round((course.price * priceRate) * 100) / 100 <= value && Math.round(course.rate / course.numberofrates) === rate;
            //     })
            // )
            // else 
            //     setCoursesDisplayed(
            //         coursesOriginal.filter(course => {
            //             return course.subject.includes(subject) && Math.round((course.price * priceRate) * 100) / 100 <= value;
            //         })
            // )
            if( rate)
            setCoursesDisplayed(
                coursesOriginal.filter(course => {
                    if((course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now())) {
                        return course.subject.includes(subject) && Math.round(((course.price * priceRate) - (course.price * priceRate * course.discount.promotion / 100))*100) / 100 <= value && Math.round(course.rate / course.numberofrates) === rate;
                    }
                    else {
                        return course.subject.includes(subject) && Math.round((course.price * priceRate) * 100) / 100 <= value && Math.round(course.rate / course.numberofrates) === rate;   
                    }
                })
            )
            else 
                setCoursesDisplayed(
                    coursesOriginal.filter(course => {
                        if((course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now())) {
                            return course.subject.includes(subject) && Math.round(((course.price * priceRate) - (course.price * priceRate * course.discount.promotion / 100))*100) / 100 <= value;
                        }
                        else {
                            return course.subject.includes(subject) && Math.round((course.price * priceRate) * 100) / 100 <= value ;   
                        }
                    })
            )
            setPrice(value);
        }
        else {
            if(value) {
                setCoursesDisplayed(
                    coursesOriginal.filter(course => {
                        if((course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now())) {
                            return course.subject.includes(subject) && Math.round(((course.price * priceRate) - (course.price * priceRate * course.discount.promotion / 100))*100) / 100 <= price && Math.round(course.rate / course.numberofrates) === value;
                        }
                        else {
                            return course.subject.includes(subject) && Math.round((course.price * priceRate) * 100) / 100 <= price && Math.round(course.rate / course.numberofrates) === value;   
                        }
                    })
                )
            }
            else {
                setCoursesDisplayed(
                    coursesOriginal.filter(course => {
                        if((course.discount && new Date(course.discount.startdate) <= Date.now() && new Date(course.discount.enddate) >= Date.now())) {
                            return course.subject.includes(subject) && Math.round(((course.price * priceRate) - (course.price * priceRate * course.discount.promotion / 100))*100) / 100 <= price;
                        }
                        else {
                            return course.subject.includes(subject) && Math.round((course.price * priceRate) * 100) / 100 <= price;   
                        };
                    })
                )
            }
            
            setRate(value);
        }
    };

    const handleSearch = () =>{
        console.log(search);
        setCoursesDisplayed(
            coursesOriginal.filter(
                (course) => {
                    return course.title.includes(search) || course.createdByName.includes(search);
                }
            )
        )
    }

    const handleRadio =(e)=>{
        console.log(e.target.value);
        serFilterPage(e.target.value);
    }

    return ( 
        <React.Fragment>
        <Filters handleChange={handleChange} page={type} handleRadio={handleRadio}/>
        {type === 'search' && <h3 className='p-2 mb-3'>Search results for {keyword} </h3>}
        {type === 'instructor' && 
            <div className='p-3 px-5 mb-3 bg-light text-center'>
                <div className="d-flex" role="search">
                    <input onChange={(e)=>setSearch(e.target.value)} style={{borderRadius : '25px'}} className="form-control me-2" type="search" placeholder="Search in my courses" aria-label="Search" />
                    <button onClick={handleSearch} className="btn btn-outline-dark" style={{borderRadius : '25px'}}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </div>}
        {ready ? 
            (
                coursesDisplayed.length ? 
                <div className="row p-3 justify-content-center"> 
                {coursesDisplayed.map((course) => <CourseCard currency={currency} priceRate={priceRate} key={course._id} page={type} course={course} />)}
                </div>
                : (  
                <div className='text-center m-5'>
                    <img width={'250px'} src='./no-results.png'/>
                    <div className="justify-content-center">
                        <div className='text-danger mt-3' style={{fontSize:'20px', fontWeight:'bold'}} role={'alert'}>There is no Course matches</div>
                    </div>
                </div>)
            )
            :
            (
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                    <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
                </div>
            )
        }
        </React.Fragment>
     );
}
 
export default CourseContainer;