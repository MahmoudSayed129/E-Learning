import React, { useContext, useState }  from 'react';
import { useEffect } from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import AuthContext, { AuthContextProvider } from"../context/AuthContext";

function Sidebar({refund ,subtitles, overviewvideo, completedVideos, attemptedQuizs, choosevideo}) {
    const [items, setItems] = useState([]);
    const {loggedIn,id,type}=useContext(AuthContext);
    useEffect(()=>{
        console.log(type);
        let itemTemp = [{title : overviewvideo.title, itemId : [overviewvideo.url,overviewvideo.description, overviewvideo.title], elemBefore: () => <i style={{color: 'green'}} className="fa fa-check-circle" aria-hidden="true"></i>}];
        subtitles.map((subtitle, index) => {
            itemTemp.push({
                            title: subtitle.title,
                            itemId: [subtitle.title]
                        });
        itemTemp[index + 1].subNav = [];
        subtitle.videos.map((video) => {
            itemTemp[index + 1].subNav.push({
                                    title: video.title,
                                    itemId: [video.url, video.discription, video.title],
                                    elemBefore: () => {   if(completedVideos.includes(video.url))
                                                            return <i style={{color: 'green'}} className="fa fa-check-circle" aria-hidden="true"></i>}
                                    })
                            });
        if(subtitle.quizs) {
            subtitle.quizs.map((quiz, i) =>{
                itemTemp[index + 1].subNav.push({
                    title: `Quiz ${i+1}`,
                    itemId: ["quiz", quiz],
                    elemBefore: () => { 
                        for (let j = 0; j < attemptedQuizs.length; j++) { 
                            if(attemptedQuizs[j].id === quiz){
                                    if(attemptedQuizs[j].grade >= 60){
                                        return <i style={{color: 'green'}} className="fa fa-check-circle" aria-hidden="true"></i>
                                    }
                                    else {
                                        return <i style={{color: 'red'}} className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                    }
                            }
                        }
                    }
                    })
            });
        }
        
                        
        setItems(itemTemp);
        });
        let issues = {title : "Course Issues", itemId:["fds"], subNav:[]};
        issues.subNav.push({title: 'Report a Problem' ,itemId:["report","report",""]});
        issues.subNav.push({title: 'Previous Problems' ,itemId:["previousproblems","previousproblems",""]});
        if(refund && type === 'student'){
            issues.subNav.push({title: 'Refund the Course' ,itemId:["refund","refund",""]}) ;
        }
        itemTemp.push(issues);
        itemTemp.push({title: 'Notes' ,itemId:["notes","notes","botes"]}) ;
        setItems(itemTemp);
    },[completedVideos])
    return (
      <>
        <Navigation
            // you can use your own router's api to get pathnam
            activeItemId={overviewvideo}
            onSelect={({itemId}) => {
                choosevideo(itemId);
            }}
            items={items}
          />
      </>
    );
}

export default Sidebar;