import React from 'react';
import CourseContainer from './courseContainer';

const StudentCourses = ({props}) => {
    return ( 
        <React.Fragment>
            <CourseContainer type='student' />
        </React.Fragment>
     );
}
 
export default StudentCourses;