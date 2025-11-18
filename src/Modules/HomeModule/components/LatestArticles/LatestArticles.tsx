import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import {Twitter, Instagram} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import { FaFacebookF } from "react-icons/fa6";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

// import images
import articlePhoto1 from '../../../../assets/images/home/articlesPhotoes/article1.jpg';
import articlePhoto2 from '../../../../assets/images/home/articlesPhotoes/article2.jpg';
import articlePhoto3 from '../../../../assets/images/home/articlesPhotoes/article3.jpg';


export default function LatestArticles() {
  return (
    <>
    <Box sx={{backgroundColor:"rgb(247, 252, 252)"}}>
      <Box  component="div" sx={{padding:"40px 0 20px",display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Typography variant="body1" color="textSecondary" 
        sx={{letterSpacing:"2px", fontSize:"18px",textTransform:"uppercase", fontWeight:"400"}}>
        Read our articles
        </Typography>
        <Typography variant="h4" className='blueBold-text' 
        sx={{fontWeight:"bold",margin:"10px 0",letterSpacing:"5px"}}>
        Latest Articles
        </Typography>
      </Box>


      <Grid container spacing={1} sx={{ margin:"1.5rem 3rem"}}>
        <Grid size={{xs:12,sm:6,md:4}}>
          <Card sx={{ width:"90%",boxShadow:"none", bgcolor:"transparent" }}>
            <CardMedia component="img" image={articlePhoto1} alt="articlePhoto"
            sx={{ width:"100%", height:"300px",objectFit:"fill",  borderRadius:"10px" }}/>
            <CardContent>
              <Typography variant="body2" color='textSecondary' sx={{marginBottom:"10px"}}>
                2 Aug, 2021
              </Typography>
              <Typography variant="h6" className='blueBold-text' 
              sx={{lineHeight:"1.7",letterSpacing:"2px",textTransform:"capitalize", marginBottom:"15px"}}>
                Reading books always makes the moments happy
              </Typography>
              {/* <hr style={{color:"#ddd",}}/> */}
              <Divider sx={{borderBottomWidth:2,borderColor:"rgba(0, 0, 0, 0.12)",}}/>
              <Box component="div" sx={{display:"flex",justifyContent:"flex-end",margin:"10px 0"}}>
                <IconButton color="inherit" href="#">
                  <FaFacebookF className='blueBold-text' size={13}/>
                </IconButton>
                <IconButton color="inherit" href='#'>
                  <Twitter className='blueBold-text' sx={{fontSize:"15px"}}/>
                </IconButton>
                <IconButton color="inherit" href='#'>
                  <Instagram className='blueBold-text'  sx={{fontSize:"15px"}}/>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12,sm:6,md:4}}>
          <Card sx={{ width:"90%",boxShadow:"none", bgcolor:"transparent" }}>
            <CardMedia component="img" image={articlePhoto2} alt="articlePhoto"
            sx={{ width:"100%", height:"300px",objectFit:"fill", borderRadius:"10px" }}/>
            <CardContent>
              <Typography variant="body2" color='textSecondary' sx={{marginBottom:"10px"}}>
                2 Aug, 2021
              </Typography>
              <Typography variant="h6" className='blueBold-text' 
              sx={{lineHeight:"1.7",letterSpacing:"2px",textTransform:"capitalize", marginBottom:"15px"}}>
                Reading books always makes the moments happy
              </Typography>
              {/* <hr style={{color:"#ddd",}}/> */}
              <Divider sx={{borderBottomWidth:2,borderColor:"rgba(0, 0, 0, 0.12)"}}/>
              <Box component="div" sx={{display:"flex",justifyContent:"flex-end",margin:"10px 0"}}>
                <IconButton color="inherit" href="#">
                  <FaFacebookF className='blueBold-text' size={13}/>
                </IconButton>
                <IconButton color="inherit" href='#'>
                  <Twitter className='blueBold-text' sx={{fontSize:"15px"}}/>
                </IconButton>
                <IconButton color="inherit" href='#'>
                  <Instagram className='blueBold-text'  sx={{fontSize:"15px"}}/>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12,sm:6,md:4}}>
          <Card sx={{ width:"90%",boxShadow:"none", bgcolor:"transparent" }}>
            <CardMedia component="img" image={articlePhoto3} alt="articlePhoto"
            sx={{ width:"100%", height:"300px",objectFit:"fill", borderRadius:"10px" }}
            />
            <CardContent>
              <Typography variant="body2" color='textSecondary' sx={{marginBottom:"10px"}}>
                2 Aug, 2021
              </Typography>
              <Typography variant="h6" className='blueBold-text' 
              sx={{lineHeight:"1.7",letterSpacing:"2px",textTransform:"capitalize", marginBottom:"15px"}}>
                Reading books always makes the moments happy
              </Typography>
              {/* <hr style={{color:"rgba(0, 0, 0, 0.12)",fontWeight:"bold",}}/> */}
              <Divider sx={{borderBottomWidth:2,borderColor:"rgba(0, 0, 0, 0.12)",}}/>
              <Box component="div" sx={{display:"flex",justifyContent:"flex-end",margin:"10px 0"}}>
                <IconButton color="inherit" href="#">
                  <FaFacebookF className='blueBold-text' size={13}/>
                </IconButton>
                <IconButton color="inherit" href='#'>
                  <Twitter className='blueBold-text' sx={{fontSize:"15px"}}/>
                </IconButton>
                <IconButton color="inherit" href='#'>
                  <Instagram className='blueBold-text'  sx={{fontSize:"15px"}}/>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Button variant="outlined" sx={{margin:"20px auto"
        ,width:"200px", display:"flex",    
        alignItems: "center",   
        justifyContent: "center",   
        padding:"12px 0",borderColor:"#173F5F",color:"#173F5F"}}>
          View More <ArrowRightAltOutlinedIcon/>
      </Button>
      </Box>
    </>
  )
}
