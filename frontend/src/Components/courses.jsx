import React from 'react';
import CourseCard from './courseCard';

const Courses = ({courses}) => {
    return ( 
        <React.Fragment>
            {courses.map(cousrs => 
                    <CourseCard key={id} />
            )}
        </React.Fragment>
     );
}
 
export default Courses;
