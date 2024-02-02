import React, { useContext, useState } from 'react';
import {Rating} from "@mui/material";
import AuthContext, { AuthContextProvider } from"../../context/AuthContext";

const Filters = ({handleChange, page, handleRadio}) => {
    const [value, setValue] = useState(0);
    const {loggedIn,id,type}=useContext(AuthContext);
    return ( 
        <React.Fragment>
            <div style={{color : 'black'}} className='bg-light p-3 my-2'>
                <form action="/special-course" method='GET'>
                    <div className="row">
                        <div className="col-sm-1 pt-2">
                            <h6>Filter By : </h6>
                        </div>
                        <div className="col-sm-3 px-3 ">
                            <div className="input-group">
                                <span className="input-group-text">Subject</span>
                                <input onChange={(e)=>handleChange("subject", e.target.value)} type="search" name='subject' aria-label="Subject" className="form-control" />
                            </div>
                        </div>
                        <div className='col-sm-2 px-3 '>
                            <div className="row pt-1 text-center">
                                <div className='mr-2 col-sm-3 '><span className='badge bg-warning'>Rating :</span></div>
                                <div className="col-sm-8">
                                    <Rating name="rating" value={value} onChange={(event, newValue) => {handleChange("rate",newValue)
                                        setValue(newValue)}} />
                                </div>
                            </div>
                        </div>

                        {/* Conditionally rendered */}
                        {type != "corporatetrainees " && 
                        <div className="col-sm-2 px-3 text-center">
                            <div className="input-group col-sm-3">
                                <span className="input-group-text ">Highest price</span>
                                <input onChange={(e)=>handleChange("price", e.target.value)} type="number" name='price' min={0} aria-label="price" className="form-control" />
                            </div>
                        </div>
                        }
                        {page == 'all' &&
                            <div className="col-sm-4 px-3 text-center">
                                <div className="gender-details">
                                    <input type="radio" name="course" onChange={(e)=>handleRadio(e)} id="dot-1" value="all"/>
                                    <input type="radio" name="course" onChange={(e)=>handleRadio(e)} id="dot-2" value="views"/>
                                    <input type="radio" name="course" onChange={(e)=>handleRadio(e)} id="dot-3" value="popular"/>
                                    <div className="category">
                                        <label htmlFor="dot-1">
                                            <span className="dot one"></span>
                                            <span className="gender mx-2" >All</span>
                                        </label>
                                        <label htmlFor="dot-2">
                                            <span className="dot two"></span>
                                            <span className="gender mx-2" style={{width:'100px'}}>Most Viewd</span>
                                        </label>
                                        <label htmlFor="dot-3">
                                            <span className="dot three"></span>
                                            <span className="gender" style={{width:'110px'}}>Most Popular</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        }
                        {page == 'student' &&
                            <div className="col-sm-4 px-3 text-center">
                            <div className="gender-details">
                                <input type="radio" name="course" onChange={(e)=>handleRadio(e)} id="dot-1" value="all"/>
                                <input type="radio" name="course" onChange={(e)=>handleRadio(e)} id="dot-2" value="inprogress"/>
                                <input type="radio" name="course" onChange={(e)=>handleRadio(e)} id="dot-3" value="completed"/>
                                <div className="category">
                                    <label htmlFor="dot-1">
                                        <span className="dot one"></span>
                                        <span className="gender mx-2" >All</span>
                                    </label>
                                    <label htmlFor="dot-2">
                                        <span className="dot two"></span>
                                        <span className="gender mx-2" style={{width:'100px'}}>Inprogress</span>
                                    </label>
                                    <label htmlFor="dot-3">
                                        <span className="dot three"></span>
                                        <span className="gender" style={{width:'110px'}}>Completred</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </form>
            </div>
        </React.Fragment>
     );
}
 
export default Filters;
