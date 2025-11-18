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


        <SwiperSlide className='slider1'>
          <Grid container direction={{xs:"column", md:"row"}} sx={{mb:2}}>
            <Grid size={{xs:12, md:6}} sx={{display:"flex", flexDirection:"column", justifyContent:"center",paddingLeft:"7rem"}}>
              <Typography variant='h4' className='purpule-color' sx={{marginTop:{xs:"30px !important"},fontSize:{xs:"2.5rem",sm:"3.5rem"},fontWeight:"bold",textTransform:"capitalize",
              letterSpacing:{xs:"4px",sm:"3px"}}} >
              Ipsum dolor si
              </Typography>
              <Typography variant='body1' className='purpule-color' sx={{fontSize:{xs:"1.2rem",sm:"1.5rem"},letterSpacing:"1px",
              margin:"15px 0", lineHeight:"1.5"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
              lacus ut magna velit eleifend. Amet, quis urna, a eu.
              </Typography>
              <Button variant="outlined" className='purpule-color' 
                sx={{borderColor:"#393280",width:"200px",padding:"10px 0"}}>
                read more 
                <ArrowForwardOutlinedIcon sx={{marginLeft:"5px"}}/>
              </Button>
            </Grid>
            <Grid size={{xs:12, md:6}} sx={{display:"flex", justifyContent:{xs:"center", sm:"center", md:"flex-start"},
             alignItems:{xs:"center", sm:"center", md:"flex-start"},
             mx:{xs:2, sm:2, md:0}}}>
              <img src={slideImage1} alt="slideImage" style={{width:"100%", maxWidth: "300px", height:"auto"}}/>
            </Grid>
          </Grid>
        </SwiperSlide>

        <SwiperSlide className='slider1'>
        <Grid container direction={{xs:"column", md:"row"}} sx={{mb:2}}>
            <Grid size={{xs:12, md:6}} sx={{display:"flex", flexDirection:"column", justifyContent:"center",paddingLeft:"7rem"}}>
              <Typography variant='h4' sx={{marginTop:{xs:"30px !important"},fontSize:{xs:"2.5rem",sm:"3.5rem"},fontWeight:"bold",textTransform:"capitalize",
              color:"#393280",letterSpacing:{xs:"4px",sm:"3px"}}} >
              Ipsum dolor si
              </Typography>
              <Typography variant='body1' sx={{fontSize:{xs:"1.2rem",sm:"1.5rem"},letterSpacing:"1px",color:"#393280",
               margin:"15px 0", lineHeight:"1.5"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
              lacus ut magna velit eleifend. Amet, quis urna, a eu.
              </Typography>
              <Button variant="outlined" className='purpule-color' 
                sx={{borderColor:"#393280",width:"200px",padding:"10px 0"}}>
                read more 
                <ArrowForwardOutlinedIcon sx={{marginLeft:"5px"}}/>
              </Button>
            </Grid>
            <Grid size={{xs:12, md:6}} sx={{display:"flex", justifyContent:{xs:"center", sm:"center", md:"flex-start"},
             alignItems:{xs:"center", sm:"center", md:"flex-start"},
             mx:{xs:2, sm:2, md:0}}}>
              <img src={slideImage2} alt="slideImage" style={{width:"100%", maxWidth: "300px", height:"auto"}}/>
            </Grid>
          </Grid>
        </SwiperSlide>
        <SwiperSlide className='slider1'>
        <Grid container direction={{xs:"column", md:"row"}} sx={{mb:2}}>
            <Grid size={{xs:12, md:6}} sx={{display:"flex", flexDirection:"column", justifyContent:"center",paddingLeft:"7rem"}}>
              <Typography variant='h4' sx={{marginTop:{xs:"30px !important"},fontSize:{xs:"2.5rem",sm:"3.5rem"},fontWeight:"bold",textTransform:"capitalize",
              color:"#393280",letterSpacing:{xs:"4px",sm:"3px"}}} >
              Ipsum dolor si
              </Typography>
              <Typography variant='body1' sx={{fontSize:{xs:"1.2rem",sm:"1.5rem"},letterSpacing:"1px",color:"#393280",
              margin:"15px 0", lineHeight:"1.5"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
              lacus ut magna velit eleifend. Amet, quis urna, a eu.
              </Typography>
              <Button variant="outlined" className='purpule-color' 
                sx={{borderColor:"#393280",width:"200px",padding:"10px 0"}}>
                read more 
                <ArrowForwardOutlinedIcon sx={{marginLeft:"5px"}}/>
              </Button>
            </Grid>
            <Grid size={{xs:12, md:6}} sx={{display:"flex", justifyContent:{xs:"center", sm:"center", md:"flex-start"},
             alignItems:{xs:"center", sm:"center", md:"flex-start"},
             mx:{xs:2, sm:2, md:0}}}>
              <img src={slideImage3} alt="slideImage" style={{width:"100%", maxWidth: "300px", height:"auto"}}/>
            </Grid>
          </Grid>
        </SwiperSlide>

         {/* Custom Navigation Buttons */}
            <Box className="custom-prev">
            <IconButton >
            <ArrowCircleLeftOutlinedIcon sx={{fontSize:"3rem",color:"#ef6b4a",}}/>
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
