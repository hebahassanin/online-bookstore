
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Facebook, Twitter, Instagram, LinkedIn, YouTube} from "@mui/icons-material";

export default function Contact() {
  return (
    <>
      <Grid container direction={{xs:"column",sm:"row"}}
        sx={{ justifyContent: {xs:"center",sm:"space-between"},
        alignItems: "center", padding:"10px 20px",color:"white"}}
        className="purpule-bg">
        <Grid m={{xs:1, sm:0}}>
          <Typography variant='body1' display="flex" flexDirection='row' alignItems="center">
            <PhoneIcon sx={{marginRight:"4px"}}/>  +91 8374902234
          </Typography>
        </Grid>
        <Grid>
        <IconButton color="inherit" href="#">
         <Facebook />
        </IconButton>
       <IconButton color="inherit" href='#'>
        <Instagram />
       </IconButton>
       <IconButton color="inherit" href='#'>
        <LinkedIn/>
       </IconButton>
       <IconButton color="inherit" href='#'>
        <Twitter/>
       </IconButton>
       <IconButton color="inherit" href='#'>
        <YouTube/>
       </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
