import axios from "axios";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import slider2Img1 from '../../../../assets/images/slider2/slider2-img1.jpg';
import slider2Img2 from '../../../../assets/images/slider2/slider2-img2.jpg';
import slider2Img3 from '../../../../assets/images/slider2/slider2-img3.jpg';
import slider2Img4 from '../../../../assets/images/slider2/slider2-img4.jpg';
import slider2Img5 from '../../../../assets/images/slider2/slider2-img5.jpg';
import slider2Img6 from '../../../../assets/images/slider2/slider2-img6.jpg';
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface category{
  _id:string;
  title:string;
}

export default function Categories() {
  

  const Images=[slider2Img1,slider2Img2,slider2Img3,slider2Img4,slider2Img5,slider2Img6];

  const [categories, setCategories]= useState<category []>([]);
  const [loading, setLoading]= useState(true);
  const navigate= useNavigate();
  

  const getAllCategories=async()=>{
    try {
      setLoading(true);
      const response = await axios.get("https://upskilling-egypt.com:3007/api/category");
      console.log(response?.data);
      
      setCategories(response?.data);
      
    } catch (error) {
      console.error("Error fetching categories", error);
      
      
    }finally{
      setLoading(false);

    }
  }
  useEffect(()=>{
    getAllCategories();
  },[])

  return (
    <>
     {loading ? (
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px"}}>
          <FadeLoader  color="#393280" width={7} height={20}/>
        </Box>
      ):(   
    <Grid container spacing={2} sx={{margin:"20px 10px 10px 3rem"}}>
    {categories.map((category, index)=>{
            const img = Images[index % Images.length];
            return(
              <Grid size={{xs:12,sm:6,md:4}} sx={{marginBottom:"2rem"}} key={category._id}>
              <Card sx={{ width:"80%", bgcolor:"transparent",cursor:"pointer"}} elevation={5} 
              onClick={()=> navigate(`/dashboard/books?category=${category._id}`)}>
                  <CardMedia 
                    component="img" 
                    image={img} 
                    alt={category.title} 
                    sx={{ width:"100%", minHeight:"60%", objectFit:"cover", borderRadius:"10px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" textAlign="center">
                      {category.title}
                    </Typography>
                  </CardContent>
                </Card>
                </Grid>
                  )
                })}
    </Grid>
      )}
      
    </>
  )
}
