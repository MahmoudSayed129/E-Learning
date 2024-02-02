import React from 'react';
import courseService from '../courseContainer';
import ReactLoading from 'react-loading';
import { useState } from 'react';

const ViewNotes = ({title,notes}) => {
    const [view, setView] = useState({download : true});
    const download = async()=>{
        setView({loading : true});
        await courseService.createAndDownloadPdf(title, notes);
        setView({done : true});
    }
    return ( 
        <React.Fragment>
        <div className="row">
            <div className="col-sm-10"> 
            { !view.loading &&
                <h2>Notes of {title} Course : 
                    {notes.length > 0 && view.download && <button onClick={()=>{download()}} className='btn btn-dark mx-4' style={{borderRadius : '25px'}}><i className="fa fa-download" aria-hidden="true"></i></button>}
                    {view.done && <img className='mx-2' src="../correct.png" alt="" width={'30px'}/>}
                </h2>
            }
            { view.loading &&
                <div className="row">
                    <div className="col-sm-11">
                        <h2>Notes of {title} Course : 
                            {notes.length >= 0 && view.download && <button onClick={()=>{download()}} className='btn btn-dark mx-4' style={{borderRadius : '25px'}}><i className="fa fa-download" aria-hidden="true"></i></button>}
                            {view.done && <img className='mx-4' src="../correct.png" alt="" width={'30px'}/>}
                        </h2>
                    </div>
                    <div className="col-sm-1 ">
                        <ReactLoading type={"bars"} color={'lightgreen'} height={'100%'} width={'100%'} />
                    </div>
                </div>
            }
            <hr />
            {notes.length === 0 ?
                <div className='row'>
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-4 px-4">
                        <img src="../empty-box.png" alt="" className='mt-5' width={'300px'}/>
                    </div>
                </div>
            :(
                <React.Fragment>
                    {notes.map((note,index)=>{
                    return <React.Fragment>
                        <span className='my-3'>{index + 1} - On Video : {note.title}.</span> <br />
                        <span className='mb-3'style={{fontWeight:'bolder', color :'red'}}>- {note.note}</span>  <hr />
                    </React.Fragment>
                    })}
                </React.Fragment>
            )
            }
            </div>
        </div>
        </React.Fragment>
     );
}
 
export default ViewNotes;