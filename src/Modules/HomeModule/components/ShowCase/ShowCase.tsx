import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import IconButton from '@mui/material/IconButton';
import slideImage1 from '../../../../assets/images/slider1/slider1-img1.png';
import slideImage2 from '../../../../assets/images/slider1/slider1-img2.png';
import slideImage3 from '../../../../assets/images/slider1/slider1-img3.png';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


export default function ShowCase() {

  const slides = [
    {text:" Ipsum dolor si",description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
    lacus ut magna velit eleifend. Amet, quis urna, a eu.`,img:slideImage1},
    {text:" Ipsum dolor si",description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
    lacus ut magna velit eleifend. Amet, quis urna, a eu.`,img:slideImage2},
    {text:" Ipsum dolor si",description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
    lacus ut magna velit eleifend. Amet, quis urna, a eu.`,img:slideImage3}
  ];
  return (
    <>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl:'.custom-next',
          prevEl:'.custom-prev'
        }}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper">

        {slides.map((slide,index)=>(
          <SwiperSlide key={index} className='slider1'>
            <Grid container direction={{xs:"column", md:"row"}} sx={{mb:2}}>
              <Grid size={{xs:12, md:6}} sx={{display:"flex", flexDirection:"column", justifyContent:"center",
                paddingLeft:{xs:"1rem",md:"7rem"},paddingRight:{xs:"1rem",sm:0},paddingTop:{xs:"1rem",md:0}}}>
                <Typography variant='h4' className='purpule-color' sx={{marginTop:{xs:"30px"},
                fontSize:{xs:"2.3rem",sm:"3.5rem"},fontWeight:"bold",textTransform:"capitalize",
                letterSpacing:{xs:"2px",sm:"3px"}}} >
                  {slide.text}
                </Typography>
                <Typography variant='body1' className='purpule-color' sx={{fontSize:{xs:"1.2rem",sm:"1.5rem"},letterSpacing:"1px",
                margin:"15px 0", lineHeight:"1.5"}}>
                  {slide.description}
                </Typography>
                <Button variant="outlined" className='purpule-color' 
                  sx={{borderColor:"#393280",width:"200px",padding:"12px 0",borderRadius:"6px",fontSize:"1rem",
                   marginBottom:"4rem", }}>
                    read more 
                  <ArrowForwardOutlinedIcon sx={{marginLeft:"5px"}}/>
                </Button>
              </Grid>
              <Grid size={{xs:12, md:6}} sx={{display:"flex", justifyContent:{xs:"center", sm:"center", md:"flex-start"},
              alignItems:{xs:"center", sm:"center"},
              minHeight:{xs:"420px", md:"auto"}}}>
                <Box component="img" src={slide.img} alt="slideImage" 
                  sx={{width:"100%", height:"auto", maxWidth:{xs:"300px",sm:"250px",md:"300px"}}}/>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}

         {/* Custom Navigation Buttons */}
            <Box className="custom-prev">
              <IconButton >
                <ArrowCircleLeftOutlinedIcon sx={{fontSize:"3rem",color:"#ef6b4a"}}/>
              </IconButton>
            </Box>

            <Box className="custom-next">
              <IconButton>
                <ArrowCircleRightOutlinedIcon sx={{fontSize:"3rem",color:"#ef6b4a"}}/>
              </IconButton>
            </Box>
            
      </Swiper>

      
    </>
  )
}
