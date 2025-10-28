import {Box,Typography, Button, Grid, Divider} from '@mui/material';
import Stack from '@mui/material/Stack';
import { AddressElement, CardElement } from '@stripe/react-stripe-js';


export default function Payment() {
  return (
    <>
    <Box>
        <form>
            <Grid container spacing={2} display="flex" flexDirection="column">
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
              <Button variant='contained' className='orangeBold-bg' sx={{textTransform:"uppercase", width:"400px", m:3}}>proceed to chechout</Button>
            </Stack>
        </form>
    </Box>
      
    </>
  )
}
