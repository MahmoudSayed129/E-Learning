const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const middelware = require('./middelware');

router.get('/', (req,res)=>{
    res.send("API WORKS")
})

router.post('/add-user', controller.addUser);
router.get('/all-courses', controller.getAllCourses);
router.get('/all-courses-views', controller.getAllCoursesViews);
router.get('/all-courses-popular', controller.getAllCoursesPopular);
router.get('/search/:keyword', controller.getSearchCourses); 
router.get('/course/:id', controller.getCourse);
router.get('/instructor-courses', controller.getInstructorCourses);
router.get('/get-register-course/:id', controller.getRegisterCourse);
router.get('/get-quiz/:id', controller.getQuiz);
router.post('/save-quiz/:courseID/:id', controller.saveQuiz);
router.post('/save-progress', controller.saveProgress);
///////mahmoud yassin //////
router.post('/rate-instructor/:id', controller.addInstructorRate);
router.post('/rate-course/:id', controller.addCourseRate);
router.get('/reviews-ratings', controller.getReviewsAndRatings);
router.post('/change-password', controller.ChangePassword);
router.post('/change-email-biography', controller.changeEmailorBiography);
//////////////////////////////////////////////
//////////3bto/////////
router.post('/add-quiz', controller.addQuiz);
router.post('/add-course', controller.addCourse);
/////////////////
router.get('/courses-requests-pending', controller.getCoursesRequestsPending);
router.get('/courses-requests-approved', controller.getCoursesRequestsApproved);
router.get('/courses-requests-rejected', controller.getCoursesRequestsRejected);
router.get('/courses-problems-pending', controller.getCoursesProblemsPending);
router.get('/courses-problems-resolved', controller.getCoursesProblemsResolved);
router.get('/courses-problems-unseen', controller.getCoursesProblemsUnseen);
router.post('/mark-pending/:id',controller.MarkAsPending);
router.post('/mark-resolved/:id',controller.MarkAsResolved);
router.post('/admin-add-promotion', controller.AdminAddPromotions);
router.post('/admin-grant-access', controller.AdminGrantAccess);
router.post('/admin-revoke-access', controller.AdminRevokeAccess);
router.get('/completed-courses', controller.getCompletedCourses);
router.get('/inprogress-courses', controller.getInProgressCourses);
router.get('/student-courses', controller.getStudentCourses);
router.post('/create-pdf', controller.createPDF);
router.get('/fetch-pdf', controller.fetchPDF);
router.post('/create-certificate', controller.createCertificate);
router.get('/fetch-certificate', controller.fetchCertificate);
router.post('/save-data', controller.SaveData);
/////// Payment /////
router.post('/payment/create', controller.createPayment);
router.post('/buy-course', controller.buyCourse);
router.get('/wallet', controller.getWallet);
router.get('/accept-terms', controller.AcceptTerms);
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/logout', controller.Logout);
router.get('/loggedin', controller.LoggedIn);
/////////////////
router.post('/request', controller.RequestCourse);
router.post('/add-problem', controller.addproblem);
router.post('/add-followup', controller.addfollow);
router.get('/get-problems/:id', controller.getproblem);
router.post('/refund-course/:id', controller.refundcourse);
router.post('/refund', controller.AdminRefundCourse);
router.post('/reject-refund', controller.RejectRefund);
router.get('/refund-requests', controller.getRefundRequests);
router.post('/forget-password', controller.forgotPassword);
router.post('/verify-link', controller.Linkverify);
router.post('/reset-password', controller.ResetPassword);
router.post('/send-certificate', controller.sendMail);
router.get('/verify-register-course/:id', controller.VerifyRegisterCourse);
router.get('/student-refund-requests', controller.StudentRefundRequests);
router.get('/student-course-requests', controller.StudentCourseRequests);


module.exports = router;