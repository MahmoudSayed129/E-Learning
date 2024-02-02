import React,{ useContext }  from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FormControl,Select,InputLabel,MenuItem} from "@mui/material";
import coun_curr_code from '../coun-curr-code';
import { Link } from "react-router-dom";
import AuthContext, { AuthContextProvider } from"../context/AuthContext";
import LogoutBtn from "./Auth/LogoutBtn";
import img from './logo.png';
import imgS from './graduating-student.png';
import imgA from './admin.png';
import imgI from './instructor.png';

const NavBar = ({handleCountry}) => {
  const {loggedIn,id,type, username}=useContext(AuthContext);
    return (  
      <div>
      {/* conditionally rendering */}
      <div id="loginRegister">
      
      <div id='info'>
      <p>Phone: +201001004070</p>
      <p>Email: info@cancham.org.eg</p>
      </div>
      </div>
    <Navbar className="nav-color navbar-custom mr-auto"  expand="lg">
      <Container fluid>
        <Navbar.Brand id="brand" href="/">
            <img id="img" src={img} className="mx-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        
        <div id="nav-itemss">
          <Nav
            className=" ml-auto mx-5 my-2 my-lg-0 nav-links "
            id=""
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

          {(type=="student" || type=="corporatetrainees " )&& 
            <li id="nav-item3" className=""><a href="/student-profile" class=""><img id='sidebar' src={imgS} /></a> <span>{username}</span>
              <ul  class="submenu">
                  <li><Link to={"/student-profile"} >View Profile</Link><h1 className="fa fa-user dropdown" aria-hidden="true"></h1></li>
                  <li><a href={'/student-courses'}>My Courses</a><i className="fa fa-book dropdown"></i></li>
                  <li><LogoutBtn></LogoutBtn></li>
              </ul>
            </li>
          }

            {type=="administrator"&&<> 
            <li id="nav-item3" className=""><a href="/admin-profile" class=""><img id='sidebar' src={imgA} /></a> <span>{username}</span>
              <ul class="submenu">
                <li><LogoutBtn></LogoutBtn></li>
              </ul>
            </li>          
            </>
            }
            {type=="instructor"&&
             <li id="nav-item3" className=""><a href="/student-profile" class=""><img id='sidebar' src={imgI} /></a> <span>{username}</span>
             <ul  class="submenu">
                 <li><a href={"/instructor-profile"} >View Profile</a><h1 className="fa fa-user dropdown" aria-hidden="true"></h1></li>
                 <li><a href={'/instructor-courses'}>My Courses</a><i className="fa fa-book dropdown"></i></li>
                 <li><a href={'/instructor-add'}>Add Course/Promotion</a><i className="fa fa-book dropdown"></i></li>
                 <li><LogoutBtn></LogoutBtn></li>
             </ul>
           </li>
            }        
          </Nav>
        
        
          </div>
 

         
      
    
        </Navbar.Collapse>
        <Form id="nav-item1" className="d-flex mx-5 pr-5" action="/search" method="GET">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{borderRadius : '15px'}}
              name='keyword'
              sx={{minWidth: '600px'}}
            />
          </Form>

      </Container>
      <FormControl id="nav-item2" className="mx-5 pr-5" sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={ (e) => {handleCountry(e.target.value) ; console.log("NAV " +e.target.value);} }
                label="Country">
                {coun_curr_code.map(country => <MenuItem key={country.country} value={country.currency_code}>{country.country}</MenuItem>)}
            </Select>
          </FormControl>
          

        

    </Navbar>
    
   
        
         
          </div>
   
    );
}
 
export default NavBar;