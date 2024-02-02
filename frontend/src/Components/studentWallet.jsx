import React from 'react';

const StudentWallet = ({wallet}) => {
    return ( 
        <React.Fragment>
            <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '350px'}}>
                <h3 className='text-left'><img src="./wallet.png" className='mx-3 pb-2' width={'50px'} alt="" /> {Number(wallet).toFixed(2)} USD</h3>
            </div>
        </React.Fragment>
     );
}
 
export default StudentWallet;