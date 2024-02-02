import React, { useEffect } from 'react'
import "./rate.css"
import "./review.css"
import "./comments.css"
import "./img1.jpg";
import courseService from '../courseContainer';
import { useState } from 'react';
import {Rating} from "@mui/material";

function Reviewsoninstructor() {
  const [ratedetails, setratedetails] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [rate, setrate] = useState(0);
  const [numrate, setnumrate] = useState(0);
  useEffect(()=>{
    const getData = async()=>{
      const res = await courseService.getRatingsAndReviews();
      console.log(res);
      setratedetails(res.ratedetails);
      setnumrate(res.numberofrates);
      setrate(res.rate);
      setreviews(res.reviews);
    }
    getData();
  },[]);
  return (
    <div className='instructorrate'>
      <Rating precision={0.1} name="rating" value={(rate/numrate).toFixed(1)} readOnly/>
      <div>
        <span class="heading">User Rating</span>
        <span >Total rating </span>
        <p>{(rate/numrate).toFixed(1)} average based on {numrate} reviews.</p>
        <hr style={{border:'3px solid #f1f1f1'}}/>
      </div>
    <div class="row">
      <div class="side">
        <div>5 star</div>
      </div>
      <div class="middle">
        <div class="bar-container">
          {ratedetails[5] > 0 ? <div class="bar-5" style={{width : (ratedetails[5]/numrate)*100+'%'}}></div>
          :
              <div class="bar-5" style={{width : '0%'}}></div>
          }
        </div>
      </div>
      <div class="side right">
        <div>{ratedetails[5]}</div>
      </div>
      <div class="side">
        <div>4 star</div>
      </div>
      <div class="middle">
        <div class="bar-container">
        {ratedetails[4] > 0 ? <div class="bar-4" style={{width : (ratedetails[4]/numrate)*100+'%'}}></div>
          :
              <div class="bar-4" style={{width : '0%'}}></div>
          }
        </div>
      </div>
      <div class="side right">
        <div>{ratedetails[4]}</div>
      </div>
      <div class="side">
        <div>3 star</div>
      </div>
      <div class="middle">
        <div class="bar-container">
        {ratedetails[3] > 0 ? <div class="bar-3" style={{width : (ratedetails[3]/numrate)*100+'%'}}></div>
          :
              <div class="bar-3" style={{width : '0%'}}></div>
          }
        </div>
      </div>
      <div class="side right" >
        <div>{ratedetails[3]}</div>
      </div>
      <div class="side">
        <div>2 star</div>
      </div>
      <div class="middle">
        <div class="bar-container">
        {ratedetails[2] > 0 ? <div class="bar-2" style={{width : (ratedetails[2]/numrate)*100+'%'}}></div>
          :
              <div class="bar-2" style={{width : '0%'}}></div>
          }
        </div>
      </div>
      <div class="side right">
        <div>{ratedetails[2]}</div>
      </div>
      <div class="side">
        <div>1 star</div>
      </div>
      <div class="middle">
        <div class="bar-container">
        {ratedetails[1] > 0 ? <div class="bar-1" style={{width : (ratedetails[1]/numrate)*100+'%'}}></div>
          :
              <div class="bar-1" style={{width : '0%'}}></div>
          }
        </div>
      </div>
      <div class="side right" >
        <div>{ratedetails[1]}</div>
      </div>
    </div>
    <div>
    <section id="testimonials">
        <div class="testimonial-heading">
            <span>Comments</span>
            <h1>Students Says</h1>
        </div>
        <div class="testimonial-box-container">
            {reviews.map(review=>{
                return (
                  <div class="testimonial-box">
                    <div class="box-top">
                        <div class="profilee">
                            <div class="profile-img">
                            </div>
                            <div class="name-user">
                                <strong>{review.username} </strong>
                                <span>@{review.username} </span>
                            </div>
                        </div>
                        <div class="reviews">
                            {ratedetails.map((ra, i)=>{
                                if(i < review.rate){
                                  return <i class="fas fa-star"></i>;
                                }
                            })}
                        </div>
                    </div>
                    <div class="client-comment">
                        <p>{review.text}</p>
                    </div>
                </div>
                )
            })}
        </div>
    </section>
</div>
    </div>
  )
}

export default Reviewsoninstructor;