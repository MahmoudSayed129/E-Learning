import './App.css';
import NavBar from './Components/navBar';
import React, { useEffect, useState,useContext} from 'react';
import CourseContainer from './Components/courseContainer';
import {Route, Routes } from 'react-router-dom';
import Editinstructorprofile from './Components/editinstructorprofile';
import Instructorprofile from './Components/instructorprofile';
import Edituserprofile from './Components/edituserprofile';
import Instructorsidebar from './Components/instructorsidebar'
import Reviewsoninstructor from './Components/reviewsoninstructor';
import Reviewsoncourse from './Components/reviewsoncourse';
import Ratecourse from './Components/ratecourse';
import Rateinstructor from './Components/rateinstructor';
import TakeCourse from './Components/takeCourse';
import Quiz from './Components/quiz';
import SearchResult from './Components/search'
import CourseOverview from './Components/courseOverview';
import Createcourse from './Components/createcourse';
import AdminView from './Components/adminView'
import ProfileView from './Components/profileView';
import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import PayCourse from './Components/payCourse';
import InstructorView from './Components/instructorView';
import Certificate from './Components/certificate';
import NotFound from './Components/notfound';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import axios from "axios";
import RegisterFooter from './registerFooter';
import Footer from './Components/footer';
import TermsAndConditions from './Components/termsandconditions';
import ResetPassword from './Components/ResetPassword';
import ForgetPassword from './Components/ForgetPassword'
axios.defaults.withCredentials=true;


function App() {
  const [currency, setCurrency] = useState('');
  const handleCountry = (curr) => {
      setCurrency(curr);
  }
  return (
    <React.Fragment>
    <AuthContextProvider>
      <NavBar handleCountry ={handleCountry}/>
      <Routes>
        <Route path='/editinstructorprofile' element={<Editinstructorprofile />} />
        <Route path='/ratecourse/:id' element={<Ratecourse />} />
        <Route path='/rateinstructor/:id/:insturctorID' element={<Rateinstructor />} />
        <Route path='/edituserprofile' element={<Edituserprofile />} />
        <Route path='/instructorprofile' element={<Instructorprofile />} />
        <Route path='/instructorsidebar' element={<Instructorsidebar />} />
        <Route path='/reviewsoninstructor' element={<Reviewsoninstructor />} />
        <Route path='/reviewsoncourse' element={<Reviewsoncourse />} />
        <Route path='/instructor-courses' element={<CourseContainer currency={currency} type="instructor"/>} />
        <Route path='/student-courses' element={<CourseContainer currency={currency} type="student"/>} />
        <Route path='/search' element={<SearchResult currency={currency}/>} />
        <Route path='/create-course' element={<Createcourse />} />
        <Route path='/admin-profile' element={<AdminView />} />
        <Route path='/student-profile' element={<ProfileView />} />
        <Route path='/instructor-profile' element={<InstructorView type={'profile'} />} />
        <Route path='/instructor-add' element={<InstructorView type={'add'} />} />
         {/* for getting sepcific course */}
        <Route path='/course/:id' element={<CourseOverview currency={currency}/>} />
        <Route path='/take-course/:id' element={<TakeCourse />} />
        <Route path='/quiz/:courseID/:id' element={<Quiz />} />
        <Route path='/payment/:id' element={<PayCourse />} />
        <Route path='/certificate/:id' element={<Certificate type={'certificate'}/>} />
        <Route path='/verify-certificate/:id' element={<Certificate type={'verify'}/>} />
        <Route path='/' exact element={<CourseContainer currency={currency} type="all"/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/termsandconditions' element={<TermsAndConditions />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <RegisterFooter></RegisterFooter>
      <Footer></Footer>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
