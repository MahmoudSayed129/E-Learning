import React, { useEffect, useState } from 'react';
import courseService from '../courseContainer';
import swal from 'sweetalert';
import {Rating, ThemeProvider} from "@mui/material";
import ReactLoading from 'react-loading';

const SetPromotions = ({role}) => {
    const [ready, setReady] = useState(false);
    const [coursesOriginal, setCoursesOriginal] = useState([]);
    const [coursesDisplayed, setCoursesDisplayed] = useState([]);
    const [filters, setFilters] = useState({subject:'',price:Infinity, title:''});
    const [promotion, setPromotion] = useState({promotion: 0, startdate:"", enddate:''});
    const [checkall, setCheckall] = useState(false);
    const [error, setError] = useState(false);
    const [Checked, setChecked] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() =>{
        setReady(false);
        const getCourses = async () => {
                if(role == 'admin') {
                    const res = await courseService.getAllCourses();
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    setReady(true);
                } else if(role == 'instructor') {
                    const res = await courseService.getInstructorCourses();
                    console.log(res);
                    setCoursesDisplayed(res);
                    setCoursesOriginal(res);
                    setReady(true);
                }
        };
        getCourses();
    },[reload]);
    const handle = (e)=>{
        let temp = {... filters};
        if(e.target.value)
            temp[e.target.id] = e.target.value;
        else if(e.target.id == 'price')
            temp['price'] = Infinity;
        else 
            temp[e.target.id] = "";
        setCoursesDisplayed(
            coursesOriginal.filter(course=>{
                return course.subject.includes(temp.subject) && course.title.includes(temp.title) && course.price <= temp.price;
                }
        ));
        setFilters(temp);
    }

    const handleSelect = (e) =>{
        const {id, checked} = e.target;
        console.log(Checked);
        setChecked([...Checked, id]);
        if (!checked) {
            setChecked(Checked.filter(item => item !== id));
        }
    }

    const handleSelectAll = () => {
        setCheckall(!checkall);
        setChecked(coursesDisplayed.map(li => li._id));
        if (checkall) {
            setChecked([]);
        }
    };

    const handlePromotion = (e) =>{
        let temp = {... promotion};
        temp[e.target.id] = e.target.value;
        setError(false);
        setPromotion(temp);
    }

    const submit = () => {
        console.log(promotion);
        if(!promotion.enddate|| !promotion.startdate || !promotion.promotion || Checked.length === 0 || new Date(promotion.enddate) < Date.now()|| new Date(promotion.startdate) > new Date(promotion.enddate))
            setError(true);
        else {
            swal({
                title: `Do you really want to add ${promotion.promotion} % on the selected courses` ,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(async (willDelete) => {
                if (willDelete) {
                  swal("The promotion has been add", {
                    icon: "success",
                  });
                }
                const res = await courseService.adminAddPromotions(Checked,promotion);
                setReload(!reload);

              });
        }
    }
    return ( 
        <React.Fragment>
        {ready && 
            <React.Fragment>
                {error && <div className="alert alert-danger">
                    You Must Select at least one course and add Promotion and valid start and expiry date
                </div>}
                <div className="card bg-light">
                    <div className="row">
                        <div className="form-floating col-sm-2">
                            <input onChange={(e)=>{handlePromotion(e)}} id="promotion"  type="Number" max={100} className="form-control" placeholder="Promotion" />
                            <label htmlFor="subject">Promotion %</label>
                        </div>
                        <div className="form-floating col-sm-3">
                            <input onChange={(e)=>{handlePromotion(e)}} id="startdate"  type="date" className="form-control" placeholder="When will it start ?" />
                            <label htmlFor="date">When will it start ?</label>
                        </div>
                        <div className="form-floating col-sm-3">
                            <input onChange={(e)=>{handlePromotion(e)}} id="enddate"  type="date" className="form-control" placeholder="When will it expire ?" />
                            <label htmlFor="date">When will it expire ?</label>
                        </div>
                        <div className="form-floating col-sm-4 pt-2">
                        <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                            <button onClick={()=>submit()} className='buttoon pt-2' style={{margin : '2px'}}>Add Promotion</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-light mt-2">
                    <h4>Search for specific courses :</h4>
                    <div className="row">
                        <div className="form-floating col-sm-4">
                            <input onChange={(e)=>{handle(e)}}  id="subject"  type="text" max={100} className="form-control" placeholder="Subject" />
                            <label htmlFor="subject">Subject</label>
                        </div>
                        <div className="form-floating col-sm-4">
                            <input onChange={(e)=>{handle(e)}} id="title"  type="text" className="form-control" placeholder="Title" />
                            <label htmlFor="date">Title</label>
                        </div>
                        <div className="form-floating col-sm-4">
                            <input onChange={(e)=>{handle(e)}} id="price"  type="number" min={0} className="form-control" placeholder="Highest Price" />
                            <label htmlFor="date">Highest Price</label>
                        </div>
                    </div>
                </div>
                <div className="my-2">
                    <input onChange={()=>{handleSelectAll()}} checked={coursesDisplayed.length == Checked.length} class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."/> choose all courses.
                </div>
                {coursesDisplayed.map(course => {
                    return <div key={course._id} className="card bg-light m-2">
                        <div className="row">
                            <div className="col-sm-1">
                            <div className="form-check">
                                <input onChange={(e)=>{handleSelect(e)}} checked={Checked.includes(course._id)} className="form-check-input position-static" type="checkbox" id={course._id} value="option1" aria-label="..."/>
                            </div>
                            </div>
                            <div className="col-sm-1">
                                <img src={course.image} alt="" width={'60px'}/>
                            </div>
                            <div className="col-sm-10">
                                <span style={{fontWeight:"bolder"}}>Title : </span> {course.title} 
                                <span style={{fontWeight:"bolder"}}> Subject : </span> {course.subject}    
                                <span style={{fontWeight:"bolder"}}> Instructor  : </span> {course.createdByName}
                                <span style={{fontWeight:"bolder"}}> Price : </span> {course.price} USD <br />
                                <Rating name="rating" value={course.rate} readOnly/>
                                {course.discount && new Date(course.discount.enddate) >= Date.now()&& new Date(course.discount.startdate) <= Date.now() && <span className='mx-2' style={{fontWeight:"bolder", color:'coral'}}>Already has a promotion of {course.discount.promotion}%</span>}
                            </div>
                        </div>
                    </div>
                })}
            </React.Fragment>
        }
        {!ready && 
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
            </div>
            }
        </React.Fragment>
     );
}
 
export default SetPromotions;