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

import { motion } from "motion/react";


export default function LatestArticles() {

  const articles = [
  {
    id: 1,
    image: articlePhoto1,
    date: "2 Aug, 2024",
    title: "Reading books always makes the moments happy",
  },
  {
    id: 2,
    image: articlePhoto2,
    date: "5 Aug, 2024",
    title: "The joy of discovering a new book",
  },
  {
    id: 3,
    image: articlePhoto3,
    date: "10 Aug, 2024",
    title: "Why reading is good for your mind",
  },
 ];
  return (
    <>
    <Box sx={{backgroundColor:"rgb(247, 252, 252)"}}>
      <Box  component="div" sx={{padding:"40px 0 20px",display:"flex", flexDirection:"column",
        justifyContent:"center",alignItems:"center"}}>
        <Typography variant="body1" color="textSecondary" sx={{letterSpacing:"2px", 
        fontSize:"18px",textTransform:"uppercase", fontWeight:"400"}}>
        Read our articles
        </Typography>
        <Typography variant="h4" className='blueBold-text' 
        sx={{fontWeight:"bold",margin:"10px 0",letterSpacing:"5px"}}>
        Latest Articles
        </Typography>
      </Box>


      <Grid container spacing={1} sx={{ margin:"1.5rem 3rem"}}>

        {articles.map((article) => (

        
        <Grid size={{xs:12,sm:6,md:4}} key={article.id} >
          <Card component={motion.div} whileHover={{ y: -7 }}
          transition={{ duration: 0.3, ease: "easeOut" }} sx={{ width:"90%",boxShadow:"none",
          bgcolor:"transparent",border: "1px solid transparent", borderRadius: "10px",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",           
          "&:hover": {
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          borderColor: "rgba(23,63,95,0.15)",
           }, 
          }}>
            <CardMedia component="img" image={article.image} alt={article.title}
            sx={{ width:"100%", height:"300px",objectFit:"fill",  borderRadius:"10px" }}/>
            <CardContent>
              <Typography variant="body2" color='textSecondary' sx={{marginBottom:"10px"}}>
                {article.date}
              </Typography>
              <Typography variant="h6" className='blueBold-text' 
              sx={{lineHeight:"1.7",letterSpacing:"2px",textTransform:"capitalize", marginBottom:"15px"}}>
                {article.title}
              </Typography>
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
        ))}
        

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
