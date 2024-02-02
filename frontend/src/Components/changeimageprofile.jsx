import React , {useState} from 'react';
import Avatar from "react-avatar-edit";
import {Dialog} from 'primereact/dialog';
import { Button }from "primereact/button";
import {InputText} from 'primereact/inputtext'; 
import img from "./r1.jpg";

function Changeimageprofile(props) {
    const [image , setimage] = useState("");
    const [displayBasic, setDisplayBasic] = useState(false);
    const [dialogs, setdialogs] = useState(false);
    const [imageCrop , setimageCrop] = useState(false);
    const [src , setsrc] = useState(false);
    const [profile , setprofile] = useState([]);
    const [storeImage , setstoreImage] = useState([]);

    const profileImageShow = storeImage.map((item) => item.imageCrop);

    const onClose =()=>{
      setimageCrop(null);
    };

    const onCrop =(view)=>{
      setimageCrop(view);
    };

    const saveImage =()=>{
      setstoreImage([...storeImage , {imageCrop}]);
      setdialogs(false);
    };

    

  return (
    <div>
      <div className='profile_img text-center p-4'>
        <div className='div'>
          <img 
            style={{
              width : "175" , 
              height : "200" , 
              borderRadius : "50%" , 
              objectfit : "cover" ,
          }}
          src = {profileImageShow.length ? imageCrop : img} 
          alt = "" 
          onClick={() => setdialogs(true)}
          />
        <Dialog
          visible = {dialogs}
          header ={()=>(
            <p htmlFor= "" className='text-2xl font-semibold textColor'style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
            Updade Profile
            </p>
          )}
          onHide={()=>setdialogs(false)}
        >
  <div className='confirmation-content flex flex-column align-items-center' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div className="flex flex-column align-items-center mt-5 w-12">
      <div className="flex flex-column justify-column around w-12 mt-4">

      <Avatar width = {150}height = {150}onCrop={onCrop}onClose = {onClose}/>
        <Button onClick={saveImage} label = "Save" icon = "pi pi-check" className='btn btn-primary' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}/>
      </div>
    </div>
  </div>
</Dialog>
    </div>
    </div>
    </div>

  );
};

export default Changeimageprofile;