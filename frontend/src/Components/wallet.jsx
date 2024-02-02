import React, { useState } from 'react';
import { useEffect } from 'react';
import courseService from '../courseContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactLoading from 'react-loading';

const Wallet = () => {
    const [wallet, setWallet] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const getWallet = async () =>{
            const res = await courseService.getWallet();
            setWallet(res);
            if(!res) 
                setWallet({total:0.0, details:[]});
            setReady(true);
        }
        getWallet();
    }, [])
    return ( 
        <React.Fragment>
            {ready && 
                    <div className="bg-light p-3" style={{borderRadius : '25px', border : '1px solid black'}}>
                        <img src="./wallet.png" width={'30px'} alt="" /> <span className='mx-2' style={{color : 'green'}}> {Number(wallet.total).toFixed(2)} </span> USD.
                        <TableContainer component={Paper} className="my-2">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Month</TableCell>
                                    <TableCell align="right">Money</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {wallet.details.map((earn, i) => (
                                    <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center"> {new Date(earn.month).getMonth() + 1} - {new Date(earn.month).getFullYear() }</TableCell>
                                    <TableCell align="right" color='green'>+{Number(earn.total).toFixed(2)} USD</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                    </div>
            }
            {!ready && 
                <div style={{  display: 'flex',justifyContent: 'center',alignItems: 'center', height : '500px'}}>
                <ReactLoading type={"bars"} color={'#a00407'} height={'5%'} width={'5%'} />
            </div>
            }
        </React.Fragment>
     );
}
 
export default Wallet;