import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import {Box,Typography, Button} from '@mui/material';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../Redux/store";
import { useEffect, useState } from "react";
import { deleteCartItem, fetchCartItems, updateCart } from "../../../../Redux/cartSlice";
import { FadeLoader } from "react-spinners";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import Payment from '../../../OrderModule/components/Payment/Payment';

interface Book{
  _id: string;
  name: string;
  author: string;
  description: string;
  price: number;
  image? : string;
}

export default function Cart() {
  const [books, setBooks]= useState<Book[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const {cart,loading,error}= useSelector((state:RootState) => state.cart);

  const total:any= cart?.items.reduce((acc, item)=>{
    const bookDetails= books.find((b)=>b._id === item.book);
    return acc + (bookDetails?.price ?? 0) * item.quantity;
  },0);

  const tax = total * 0.1;
  const totalCost = total + tax;

  // this is a function to Book quantity Increased
  const handleIncrease= async (bookId:string, currentQty:number)=>{

    if(!cart?._id){
      toast.error("Cart ID not found");
      return;
    }
    try {
      const response = await dispatch(fetchCartItems());

      // ignore book that i will update, means i will retrieve items without item that i updated.
      const otherItems =response?.payload?.items.filter((item:any)=>
      item.book !== bookId);

      const formattedItems = otherItems.map((item:any)=>({
        book: item.book, quantity: item.quantity,
      }))

      console.log(formattedItems);


      await  dispatch(updateCart({cartId:cart._id,bookId, quantity: currentQty+1,
      items: formattedItems})).unwrap();
      toast.success("Book quantity increased successfully");

      
        dispatch(fetchCartItems());
      
    } catch (error) {
      toast.error("happened error during Increase quantity");
    }
  };

  // this is a function to Book quantity Decreased
  const handleDecrease= async (bookId:string, currentQty:number)=>{
    if(currentQty <= 1){
      toast.info("quantity cann't less than 1");
      return;
    }
    if(!cart?._id){
      toast.error("Cart ID not found");
      return;
    }
    try {

      const response =await dispatch(fetchCartItems());
      const otherItems =response?.payload?.items.filter((item:any)=>
      item.book !== bookId);

      const formattedItems = otherItems.map((item:any)=>
      ({book: item.book, quantity: item.quantity,}))

      await dispatch(updateCart({cartId:cart._id,bookId ,quantity:currentQty-1,
      items: formattedItems})).unwrap();

      toast.success("Book quantity decreased successfully");

      await dispatch(fetchCartItems());
     
      
    } catch (error) {
      toast.error("happened error during Decrease quantity") 
    }

  };

  
  // Delete item
  const handleDelete = async (itemId: string) => {
    try{
     await dispatch(deleteCartItem(itemId)).unwrap();
        toast.success("Item deleted successfully");
       await dispatch(fetchCartItems()).unwrap();

    }catch{
        toast.error("Failed to delete item");
      }
  };

  const getBooks=async()=>{
    try {
      
        const response = await axios.get("https://upskilling-egypt.com:3007/api/book?limit=16");
        console.log(response?.data?.data);
        setBooks(response?.data?.data);
        
    } catch (error) {
        console.log(error)
    }
}


  useEffect(()=>{
    getBooks();
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
    <Stack display="flex" alignItems="center" justifyContent="center" 
      className='purpule-color cart-bg' sx={{paddingY:"25px", marginTop:{xs:"30px",sm:0}}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" className='purpule-color' sx={{fontWeight:500, fontSize:"20px"}}
        color="inherit" href="/dashboard">
          Home
        </Link>
        <Typography variant='h6' className='purpule-color'>Cart</Typography>
      </Breadcrumbs>
    </Stack>

    <Grid container spacing={4} sx={{margin:"40px 60px"}}>
      <Grid size={{xs:12, md:7, lg:7}}>
        <TableContainer component={Box} className="purpule-color cart-bg" 
          sx={{marginTop:3,minWidth: 400, marginLeft:"auto",padding:"20px", borderRadius:2}}>
          <Typography variant='h5' sx={{fontWeight:"bold", marginBottom:"10px"}}>
            Cart Detailes
          </Typography>

          <Table sx={{ minWidth: 300,marginTop:"20px" }} aria-label="simple table">
            <TableHead sx={{borderTop: "2px solid #ccc", borderBottom:"2px solid #ccc",}}>
              <TableRow >
                <TableCell sx={{fontSize:"18px"}}>Num</TableCell>
                <TableCell align="center" sx={{fontSize:"18px"}}>Book</TableCell>
                <TableCell align="left" sx={{fontSize:"18px"}}>Amount</TableCell>
                <TableCell align="left" sx={{fontSize:"18px"}}>Cost</TableCell>
                <TableCell align="left" sx={{fontSize:"18px"}}>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {cart?.items.length ===0 ?(
                <TableRow>
                  <TableCell>
                    <Typography variant='h6' sx={{color:"#000"}}>your cart is empty.</Typography>
                  </TableCell>
                </TableRow>
              ):(
              cart?.items.map((item, index) => {
                const bookDetails =
                books.find((b)=>b._id === item.book);
                
                /* if there isn't book, it will render null. 
                that's avoid showing price without value and rest details to book
                // if(!bookDetails){
                //   return null;
                // }*/
                const cost = bookDetails?.price ?? 0;
                const subtotal = cost * item.quantity;
                return(
                  <TableRow
                  key={item._id}>
                  <TableCell component="th" scope="row" sx={{fontSize:"15px",fontWeight:"500"}}>
                    {index + 1}
                  </TableCell>
                <TableCell>
                  {/* <img src={bookDetails?.image} alt={bookDetails?.name} style={{width:"20%"}}/> */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img 
                      src={bookDetails?.image} 
                      alt={bookDetails?.name} 
                      style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: 500 }}>
                      {bookDetails?.name}
                    </Typography>
                  </Box>
                  </TableCell>
                  <TableCell align="left" sx={{fontSize:"15px"}}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                    <Button variant="contained" size="small" 
                    sx={{minWidth:"32px",height:"32px",borderRadius:"4px",fontWeight:"bold",mr:1}}
                    className='purpule-bg' onClick={()=> handleIncrease(String(bookDetails?._id),item.quantity)}>
                      +
                    </Button>
                     <Typography component="span" sx={{minWidth:"24px", textAlign:"center"}}> {item.quantity}</Typography>
                    <Button variant="contained" size="small" 
                    sx={{minWidth:"32px",height:"32px",borderRadius:"4px",fontWeight:"bold",ml:1}}
                    onClick={()=> handleDecrease(String(bookDetails?._id), item.quantity)}className='purpule-bg'>
                      -
                    </Button>

                    </Box>
                    
                  </TableCell>
                    
                  <TableCell align="left" sx={{fontSize:"15px"}}>{cost}</TableCell>
                  <TableCell align="left" sx={{fontSize:"15px"}}>{subtotal}</TableCell>
                  <TableCell> 
                    <IconButton color="error"
                    onClick={() => handleDelete(item._id)}>
                  <DeleteIcon/>
                </IconButton>
                </TableCell>
                 
                </TableRow>
                );
              })
              
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid size={{xs:12, md:5, lg:5}}>
        <TableContainer component={Box} className="purpule-color cart-bg" 
        sx={{marginTop:3,maxWidth: 400, marginLeft:{md:"auto"},padding:"20px",borderRadius:2}}>
          <Typography variant='h5' sx={{fontWeight:"bold", marginBottom:"20px"}}>
            Cart Total Cost
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{fontSize:"18px"}}>Total</TableCell>
                <TableCell align="right" sx={{fontSize:"15px"}}>
                  $ {total.toFixed(0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontSize:"18px"}}>Tax (10%)</TableCell>
                <TableCell align="right" sx={{fontSize:"15px"}}>$ {tax.toFixed(0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold",fontSize:"18px"}}>Total Cost</TableCell>
                <TableCell align="right" sx={{fontSize:"15px"}}>$ {totalCost.toFixed(0)}</TableCell>
              </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>

    <Payment/>
  </>


  )
}
