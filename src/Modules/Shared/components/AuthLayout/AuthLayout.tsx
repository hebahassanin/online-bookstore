import { Outlet } from 'react-router-dom'
import authImg from '../../../../assets/bookstoreImg.jpg';
import logo from '../../../../assets/Logo.png';
import Grid  from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { Box } from '@mui/material';

export default function AuthLayout() {
  return (
    <Grid container justifyContent="center">
      <Grid size={{sm:12, md:6}} order={{xs:2, sm:2, md:0}}>
        <Item><img src={authImg} alt='book store image'  
        style={{objectFit:"cover", width:"100%",height:"100vh"}}/>
        </Item>
      </Grid>

      <Grid size={{sm:12, md:6}} order={{xs:1, sm:1, md:2}}>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', height:'100vh'}}>
          <img src={logo} alt='logo' className='mb-5'/>
          <Item sx={{width:'70%'}}> <Outlet/></Item>
        </Box>
      </Grid>
     
    </Grid>
  )
}