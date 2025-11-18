import {Box,Typography, Button, Grid, Divider} from '@mui/material';
import Stack from '@mui/material/Stack';
import { AddressElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../../Redux/store';
import type { FormEvent } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { fetchCartItems } from '../../../../Redux/cartSlice';


export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  let navigate = useNavigate();


  const {cart}= useSelector((state:RootState)=> state.cart);
  const {token: authToken}  =useSelector((state:RootState)=> state.auth);

  const dispatch = useDispatch<AppDispatch>();

  // check if cart is not null
  if(!cart){
    return <Typography>Error: Cart is not avaliable</Typography>
  }

  const handleSubmit = async (e:FormEvent)=>{
    e.preventDefault();

    /* i make condition , if there aren't stripe or elements 
    ,no error will occur */
    if (!stripe || !elements){
      return;
    }


    /* i make two variables, the first contains of details the first form(payment credit card details),
    the second variable contains of details the second form(address)
    */
    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement(AddressElement);

    /* if there aren't details from the first form or second , no error will occur */
    if(!cardElement || !addressElement){
      return;
    }

    const address = await addressElement.getValue();
    const { error, token } = await stripe.createToken(cardElement);

    console.log({token});
    console.log("address", address);

    if(error){
      toast.error(error.message) 
    }else{
      if(address.complete){
        const id = cart?._id;
        const data = {
          token: "tok_visa",
          delivery_address:{
            country: address.value.address.country,
            city: address.value.address.city,
            state: address.value.address.state,
            building: 1,
            street: "street",
            floor: 1,
            appartment: 1,
            mobile: address.value.phone,
            additional_info: "additional_info",
            location: {
              type: "Point",
              coordinates: [30.0444,31.2357],
            },
          },
        };

        try{
          // const authToken = localStorage.getItem("accessToken")
         
          const response = await axios.post(`https://upskilling-egypt.com:3007/api/order/${id}`, data,
          {
            headers:{
              Authorization:`Bearer ${authToken}`,
            },
          });
          console.log(response);

          const orderId = response.data.data._id;
          const totalAmount = response.data.data.total;
          toast.success(response.data.message);

          navigate("/dashboard/confirmation", {
            state: {orderId, totalAmount},
          });

          // getCart 
         const test= await dispatch(fetchCartItems());
         console.log(test);
         
          

        }catch(error){
          console.log(error);
          
        }



      }else{
        toast.error("complete missing fields");
      }
    }
    

  }


  return (
    <>
    <Box>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} display="flex" flexDirection="column" sx={{marginX: "40px"}}>
               <Grid size={{xs:12, md:4, lg:4}}  sx={{padding:3, marginTop: 6,
                boxShadow:"0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: 2,
                backgroundColor: "#f9f9f9", ml:2}}>
                    
                    <Typography variant="h5" 
                    sx={{fontWeight:"bold", textAlign:"center",color: "#333", mb:2}}>
                        Payment Info
                    </Typography>
                    <Divider sx={{mb:2}}/>
                    <CardElement/>
               </Grid>
               <Divider sx={{mb:2}}/>
               <Grid size={{xs:12, md:4, lg:4}} sx={{padding: 3,
                marginTop: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                backgroundColor: "#f9f9f9", ml: 2}}>
                <Typography variant="h5"
                sx={{fontWeight:"bold", textAlign:"center",color: "#333", mb:2}}>
                  Shipping Data
                </Typography>
                <Divider sx={{mb:2}}/>
                <AddressElement
                options={{
                  mode: "shipping",
                  fields:{
                    phone: "always",
                  },
                }}/>
              </Grid>
              </Grid>

            <Stack width="100%" pt={6}>
              <Button type="submit" variant='contained' className='orangeBold-bg' sx={{textTransform:"uppercase", width:"400px", m:3}}>proceed to chechout</Button>
            </Stack>
        </form>
    </Box>
      
    </>
  )
}
