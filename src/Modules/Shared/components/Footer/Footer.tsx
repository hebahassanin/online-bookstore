import Grid from '@mui/material/Grid';
import { Box,Typography } from "@mui/material";
import footerLogo from '../../../../assets/images/footer/logo.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Twitter,LinkedIn, YouTube} from "@mui/icons-material";
import { FaFacebook } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';


export default function Footer() {
  return (
    <>
      <Grid container className="orangeBold-bg" sx={{padding:"5rem 5rem 2rem"}}>
        <Grid size={{xs:6, md:4}} display="flex" flexDirection="column" alignItems="center"
        sx={{marginBottom:{xs:3}}}>
          <img src={footerLogo} alt="logo" style={{width:"15%"}}/>
          <Typography variant="body2" sx={{fontSize:"1rem",marginBottom:"20px" ,marginTop:"30px",
           color:"#fff",letterSpacing:"1.5px",lineHeight:"1.8", textAlign:'center'}}>
          Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </Typography>
         
          <Box component="div" sx={{marginY:"10px"}}>
                <IconButton href="#">
                <FaFacebook  className='w-50' style={{color:"#fff"}}/>
                </IconButton>
                <IconButton href='#'>
                  <LinkedIn  className='w-50' sx={{fontSize:"30px",color:"#fff",
                  marginX:{xs:"5px",md:'15px'} }}/>
                </IconButton>
                <IconButton href='#'>
                  <Twitter  className='w-50' sx={{fontSize:"30px",color:"#fff",
                  marginLeft:{xs:"5px",md:'15px'} }}/>
                </IconButton>
                <IconButton href='#'>
                  <YouTube  className='w-50'  sx={{fontSize:"30px",color:"#fff"}}/>
                </IconButton>
              </Box>
        </Grid>

        <Grid size={{xs:6, md:4}} display="flex" flexDirection="column" 
        alignItems="center" justifyContent="center" sx={{marginBottom:{xs:3}}}>
          <Typography variant="h5" sx={{color:"#fff",fontWeight:"bold"}}>Company</Typography>

          <List>
            <ListItem component={NavLink} to="/dashboard"
            sx={{textDecoration:"none",color:"#fff",paddingY:"5px"}}>
              <ListItemText primary="Home"/>
            </ListItem>
            <ListItem component={NavLink} to="#"
            sx={{textDecoration:"none",color:"#fff",paddingY:"5px"}}>
              <ListItemText primary="About us"/>
            </ListItem>
            <ListItem component={NavLink} to="/dashboard/books"
            sx={{textDecoration:"none",color:"#fff",paddingY:"5px"}}>
              <ListItemText primary="Books"/>
            </ListItem>
            <ListItem component={NavLink} to="#"
            sx={{textDecoration:"none",color:"#fff",paddingY:"5px"}}>
              <ListItemText primary="New Release"/>
            </ListItem>
            <ListItem component={NavLink} to="#"
            sx={{textDecoration:"none",color:"#fff",paddingY:"5px"}}>
              <ListItemText primary="Contact us"/>
            </ListItem>
            <ListItem component={NavLink} to="#"
            sx={{textDecoration:"none",color:"#fff",paddingY:"0"}}>
              <ListItemText primary="Blog"/>
            </ListItem>
          </List>
        </Grid>

        <Grid size={{xs:6, md:4}} display="flex" flexDirection="column" alignItems="center"
        sx={{marginBottom:{xs:3}}}>
        <Typography variant="h5"sx={{color:"#fff",fontWeight:"bold"}}>
          Importent Links
        </Typography>

        <List>
          <ListItem component={NavLink} to="#"
          sx={{textDecoration:"none",color:"#fff",paddingY:"5px" ,"& .MuiTypography-root":{fontSize:"1rem"}}}>
            <ListItemText primary="Privacy Policy"/>
          </ListItem>
          <ListItem component={NavLink} to="#"
          sx={{textDecoration:"none",color:"#fff",paddingY:"5px", "& .MuiTypography-root":{fontSize:"1rem"}}}>
            <ListItemText primary="FAQs"/>
          </ListItem>
          <ListItem component={NavLink} to="#"
          sx={{textDecoration:"none",color:"#fff",paddingY:"5px", "& .MuiTypography-root":{fontSize:"1rem"}}}>
            <ListItemText primary="Terms of Service"/>
          </ListItem>
          </List>

        </Grid>
      </Grid>

      <Divider sx={{marginX:"2rem"}} color="#fff" />
      <Grid container  className="orangeBold-bg"
        sx={{ justifyContent: {xs:"center",sm:"space-between"},alignItems: "center",
         padding:"20px 50px",color:"white"}}>
        <Grid size={{xs:12,sm:6}} sx={{textAlign:{xs:"center",sm:"left"}}}>
          <Typography variant='body1'>
           © 2022 Arihant. All Rights Reserved.
          </Typography>
        </Grid>
        <Grid size={{xs:12,sm:6}} sx={{textAlign:{xs:"center",sm:"right"}}}>
         <Typography variant='body1'>
         Privacy | Terms of Service
         </Typography>
        
        </Grid>
      </Grid>
    </>
  )
}
