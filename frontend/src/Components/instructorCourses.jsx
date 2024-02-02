import React from 'react';
import CourseContainer from './courseContainer';

const InstructorCourses = ({props}) => {
    return ( 
        <React.Fragment>
            <CourseContainer type='instructor' />
        </React.Fragment>
     );
}
 
export default InstructorCourses;