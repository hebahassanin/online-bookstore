import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';

import slider2Img1 from '../../../../assets/images/slider2/slider2-img1.jpg';
import slider2Img2 from '../../../../assets/images/slider2/slider2-img2.jpg';
import slider2Img3 from '../../../../assets/images/slider2/slider2-img3.jpg';
import slider2Img4 from '../../../../assets/images/slider2/slider2-img4.jpg';
import slider2Img5 from '../../../../assets/images/slider2/slider2-img5.jpg';
import slider2Img6 from '../../../../assets/images/slider2/slider2-img6.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './categorySlider.css';

// import required modules
import { Autoplay,Navigation } from 'swiper/modules';
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

// import { LiaArrowAltCircleLeft, LiaArrowAltCircleRight } from 'react-icons/lia';

interface category{
  _id:string;
  title:string;
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<category []>([]);
  const [loading, setLoading]= useState(true);
  const navigate =useNavigate();

  const Images=[slider2Img1,slider2Img2,slider2Img3,slider2Img4,slider2Img5,slider2Img6];

  const getCategories= async()=>{
    try {
      setLoading(true);
      const response = await axios.get("https://upskilling-egypt.com:3007/api/category");
      console.log(response?.data);
      setCategories(response?.data);
      
    } catch (error) {
      console.error("Error fetching categories", error);
      
    } finally{
      setLoading(false);

    }
  }

  useEffect(()=>{
    getCategories();
  },[])

  return (
    <>
     <Box sx={{margin:"3rem 5rem"}}>
        <Typography variant="h6"  className="line" sx={{color:"#ED553B",fontWeight:"bold",paddingLeft:"60px"}}>
          Categories
        </Typography>
        <Typography variant="h5" className="purpule-color" sx={{fontWeight:"bold",margin: "10px 0"}}>
          Explore our Top Categories
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px"}}>
          <FadeLoader  color="#393280" width={7} height={20}/>
        </Box>
      ):(   

        <Box sx={{ position: "relative", marginX:"5rem" }}>
        {/* Navigation Arrows */}
        <Box sx={{ position: "absolute", top: "-80px", right: 0, display: "flex", gap: 2 }}>
          <div className="category-prev">
            <IconButton>
            {/* <LiaArrowAltCircleLeft className="arrow" style={{ fontSize: "40px", color: "rgba(123, 116, 116, 0.77)"}}/> */}
        
            <ArrowBackIosNewIcon className="arrow" sx={{ fontSize: 30, color: "rgba(123, 116, 116, 0.77)" }} />
            </IconButton>
          </div>
          <div className="category-next">
          <IconButton>
          {/* <LiaArrowAltCircleRight className="arrow" style={{ fontSize: "40px", color: "rgba(123, 116, 116, 0.77)"}}/> */}
            <ArrowForwardIosIcon className="arrow" sx={{ fontSize: 30, color: "rgba(123, 116, 116, 0.77)" }} />
            </IconButton>
          </div>
        </Box>

        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay,Navigation]}
          navigation={{
            nextEl:".category-next",
            prevEl:".category-prev"
          }}
          breakpoints={{
            320:{slidesPerView: 1},
            768: {slidesPerView: 2},
            1024: {slidesPerView: 3}
          }}
          className="categorySwiper">

          {categories.map((cat, index)=>{
            const img = Images[index % Images.length];
            return(
              <SwiperSlide className="slider2" key={cat._id}>
                <Card sx={{ width:"100%", border:"none", boxShadow:"none", bgcolor:"transparent" }}>
                  <CardMedia 
                    component="img" 
                    image={img} 
                    alt={cat.title} 
                    sx={{ width:"100%", height:"80%", objectFit:"cover", borderRadius:"10px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" textAlign="center">
                      {cat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
      )}

     
      <Button variant="outlined" className="purpule-color" 
        sx={{margin:"20px auto",width:"200px", display:"flex",    
        alignItems: "center",   
        justifyContent: "center", 
        gap: "8",   
        padding:"12px 0",borderColor:"#393280"}}
        onClick={()=>navigate("/dashboard/categories")}>
          View More <ArrowRightAltOutlinedIcon/>
      </Button>

    </>
  )
}
