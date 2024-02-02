import React from 'react'
import "./rate.css"
import "./review.css"
import "./comments.css"
import "./img1.jpg";

function Reviewsoncourse() {
  return (
    <div className='instructorrate'>
      <div class="rating mb-3">
        <input type="radio" name="star"/><span class="star"> </span>
        <input type="radio" name="star"/><span class="star"> </span>
        <input type="radio" name="star"/><span class="star"> </span>
        <input type="radio" name="star"/><span class="star"> </span>
        <input type="radio" name="star"/><span class="star"> </span>
        <span class="emo"> </span>
      </div>
      <div>
<span class="heading">User Rating</span>
<span >Total rating 254</span>
<p>4.1 average based on 254 reviews.</p>
<hr style={{border:'3px solid #f1f1f1'}}/>
</div>
<div class="row">
  <div class="side">
    <div>5 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-5"></div>
    </div>
  </div>
  <div class="side right">
    <div>150</div>
  </div>
  <div class="side">
    <div>4 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-4"></div>
    </div>
  </div>
  <div class="side right">
    <div>63</div>
  </div>
  <div class="side">
    <div>3 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-3"></div>
    </div>
  </div>
  <div class="side right">
    <div>15</div>
  </div>
  <div class="side">
    <div>2 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-2"></div>
    </div>
  </div>
  <div class="side right">
    <div>6</div>
  </div>
  <div class="side">
    <div>1 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-1"></div>
    </div>
  </div>
  <div class="side right">
    <div>20</div>
  </div>
</div>
<div>
<section id="testimonials">
        <div class="testimonial-heading">
            <span>Comments</span>
            <h1>Students Says</h1>
        </div>
        <div class="testimonial-box-container">
            <div class="testimonial-box">
                 
                <div class="box-top">
                       
                    <div class="profilee">
                         
                        <div class="profile-img">
                        </div>
                          
                        <div class="name-user">
                            <strong>3bto saeed</strong>
                            <span>@abdo</span>
                        </div>
                    </div>
                     
                    <div class="reviews">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i> 
                    </div>
                </div>
                 
                <div class="client-comment">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
                </div>
            </div>
            <div class="testimonial-box">
                 
                <div class="box-top">
                       
                    <div class="profilee">
                         
                        <div class="profile-img">
                        </div>
                          
                        <div class="name-user">
                            <strong>Mahmoud Sayed</strong>
                            <span>@7oda</span>
                        </div>
                    </div>
                     
                    <div class="reviews">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i> 
                    </div>
                </div>
                 
                <div class="client-comment">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
                </div>
            </div>
            <div class="testimonial-box">
                 
                <div class="box-top">
                       
                    <div class="profilee">
                         
                        <div class="profile-img">
                        </div>
                          
                        <div class="name-user">
                            <strong>Osama elsaid</strong>
                            <span>@osama</span>
                        </div>
                    </div>
                     
                    <div class="reviews">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i> 
                    </div>
                </div>
                 
                <div class="client-comment">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
                </div>
            </div>
             
            <div class="testimonial-box">
                 
                <div class="box-top">
                       
                    <div class="profilee">
                         
                        <div class="profile-img">
                        </div>
                          
                        <div class="name-user">
                            <strong>Abdelrahman sallam</strong>
                            <span>@sallamjj</span>
                        </div>
                    </div>
                     
                    <div class="reviews">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i> 
                    </div>
                </div>

                <div class="client-comment">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
                </div>
            </div>
        </div>
    </section>
</div>
    </div>
  )
}

export default Reviewsoncourse;