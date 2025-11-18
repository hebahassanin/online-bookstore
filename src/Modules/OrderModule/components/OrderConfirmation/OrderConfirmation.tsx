import {Box,Typography, Button,Divider} from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const {state} =useLocation();
  console.log('state', state)
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{width:"40%", marginX:"auto",marginY:"20px",padding:"30px",boxShadow: '0px 0px 10px 5px rgba(240, 240, 240)', borderRadius: '10px',textAlign:"center"}}>
        <FaCheckCircle color='green' size={70} />
        <Typography variant="h3" sx={{marginY:"20px",textTransform:"capitalize"}}>order confirmed!</Typography>
        <Typography variant="body1" sx={{fontSize:"20px", color:"gray"}}>
          your order has been placed successfully. Thank you for shopping with us!
        </Typography>
        <Divider sx={{ marginY: '30px' }} />

        
          <Typography variant="h5" sx={{textTransform:"capitalize", fontWeight:"bold"}}>order number:</Typography>
          <Typography variant="body1" sx={{fontSize: '20px',color:"gray",marginBottom:"20px"}}>{state.orderId}</Typography>
          <Typography variant="h5" sx={{textTransform:"capitalize",fontWeight:"bold"}}>total amount:</Typography>
          <Typography variant="body1" sx={{fontSize: '20px',color:"gray",marginBottom:"20px"}}>{state.totalAmount}</Typography>

          <Button variant="contained" color="primary" 
          sx={{width:"100%",letterSpacing:"3px", paddingY:"10px", fontSize:"18px"}} 
          onClick={()=>navigate('/dashboard')}>
            back to home
          </Button>
        
      </Box>
    </>
  )
}
