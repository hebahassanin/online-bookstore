import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box,Typography} from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../Redux/store";
import { useEffect } from "react";
import { fetchCartItems } from "../../../../Redux/cartSlice";
import { FadeLoader } from "react-spinners";


export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const {cart,loading,error}= useSelector((state:RootState) => state.cart);

  useEffect(()=>{
    dispatch(fetchCartItems());
  },[dispatch])

  if(loading) {
    return  (
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px", }}>
      <FadeLoader  color="#393280" width={7} height={20}/>
    </Box>
    )  
  }

   if(error){
    return <Typography color='error'>{String(error)}</Typography>
   }   
  return (
    <>
    
    <TableContainer component={Paper}>
      <Typography variant='h6'>Products Detailes</Typography>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Num</TableCell>
          <TableCell align="right">Book</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Cost</TableCell>
          <TableCell align="right">Subtotal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cart?.items.map((item, index) => {

          const isBookObj = typeof item.book !== "string";
          const cost = isBookObj? item.book.price :0; 
          const bookId = isBookObj? item.book._id : item.book;
          const subtotal = cost * item.quantity;
          return(
            <TableRow
            key={item._id}>
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="right">{bookId ?? "No Book"}</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">{cost}</TableCell>
            <TableCell align="right">{subtotal}</TableCell>
          </TableRow>
          )
        }
         
        )}
      </TableBody>
    </Table>
  </TableContainer>

  </>


  )
}
