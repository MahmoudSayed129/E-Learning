import React from 'react';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit'


const Sections = ({section,count}) => {
    const [flag, setflag] = useState(false);
    return (
        <React.Fragment>
           <div>
            <MDBCard className="mb-2"> 
            <MDBRow>
                  <MDBCol sm="6">
                    <MDBCardText style={{color : "#a00407"}}>Section : {count}</MDBCardText>
                  </MDBCol>
                  
                </MDBRow>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color : "#a00407"}}>Title</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{section.title}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color : "#a00407"}}>Total Hours</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{section.totalHours}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color : "#a00407"}}>Summary </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{section.summary}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                <MDBCol sm="3">
                
                 </MDBCol>
                 </MDBRow>
                 <Collapse className='' in={flag}>
                    <div id="example-collapse-text">
                            {section.videos.map(video => 
                                    <div id="example-collapse-text">
                                        <MDBRow className=''>
                                        <MDBCol className='' sm="3">
                                            <MDBCardText className='' style={{color : "#a00407"}}>Title </MDBCardText>
                                        </MDBCol>
                                        <MDBCol className='' sm="9">
                                            <MDBCardText className="text-muted">{video.title}</MDBCardText>
                                        </MDBCol>
                                        </MDBRow>
                                    </div>
                                )}
                        </div>
                    
                    </Collapse>
                    <button  onClick={() => { console.log(flag);
                    setflag(!flag) }}
                                aria-controls="example-collapse-text" style={{margin : "0", width : '350px'}}
                                aria-expanded={flag} className="buttoon pt-2 mt-4" data-toggle="collapse" data-target="#collapseOne" >
                                {!flag ? "Show All Content" : "Hide All Content"}
                            </button >

              </MDBCardBody>
            </MDBCard>
            </div>








{/* 

            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button onClick={() => { setflag(!flag) }}
                                aria-controls="example-collapse-text"
                                aria-expanded={flag} className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" >
                                Section #1
                            </button>
                        </h5>
                    </div>

                    <Collapse in={flag}>
                <div id="example-collapse-text">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                    labore wes anderson cred nesciunt sapiente ea proident.
                </div>
            </Collapse>
                </div>

            </div> */}


        </React.Fragment >
    );
}

export default Sections;