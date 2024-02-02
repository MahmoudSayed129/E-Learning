import React  from 'react';
import CourseContainer from './courseContainer';
import { useLocation } from "react-router-dom";

const SearchResult = ({currency}) => {
    const search = useLocation().search;
    const keyword=new URLSearchParams(search).get("keyword");
    
    return ( 
        <React.Fragment>
            <CourseContainer currency={currency} keyword={keyword} type='search'/>
        </React.Fragment>
     );
}
 
export default SearchResult;