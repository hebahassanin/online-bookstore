import { Box, Typography } from '@mui/material'
import axios from 'axios';
import  { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

// import Images
import bookImage1 from '../../../../assets/images/books/book1.png'; 
import bookImage2 from '../../../../assets/images/books/book2.png';
import bookImage3 from '../../../../assets/images/books/book3.png';
import bookImage4 from '../../../../assets/images/books/book4.png';
import bookImage5 from '../../../../assets/images/books/book5.png';
import bookImage6 from '../../../../assets/images/books/book6.png';
import bookImage7 from '../../../../assets/images/books/book7.png';
import bookImage8 from '../../../../assets/images/books/book8.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { EffectCoverflow, Autoplay,Pagination } from 'swiper/modules';

interface Book{
  _id: number;
  description: string;
}

export default function BooksSlider() {
    const [books, setBooks]= useState<Book[]>([]);
    const Images =[bookImage1, bookImage2, bookImage3,bookImage4,
         bookImage5,bookImage6, bookImage7,bookImage8];

    const getBooks=async()=>{
        try {
            const response = await axios.get("https://upskilling-egypt.com:3007/api/book");
            console.log(response?.data?.data.slice(0,15));
            setBooks(response?.data?.data.slice(0,15));
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBooks();
    },[])
  return (
    <>
    <Box  component="div" sx={{padding:"50px 0",backgroundColor: "#FCEBEA"}}>
        <Box sx={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="body1" color="textSecondary" 
            sx={{letterSpacing:"2px", fontSize:"18px",textTransform:"uppercase", fontWeight:"400"}}>
            Some quality items
            </Typography>
            <Typography variant="h4" className='purpule-color' 
            sx={{fontWeight:"bold",margin:"10px 0",letterSpacing:"5px"}}>
            New Release Books
            </Typography>
        </Box>

       <Box component="div" sx={{margin:"30px"}}>
         <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        spaceBetween={0}
        autoplay={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1.5,
          slideShadows: true,
        }}
        pagination={{
          clickable:true
        }}
        modules={[EffectCoverflow,Autoplay,Pagination]}
        className="BooksSlider"
      >
        {books.map((book, index)=>{
            const img = Images[index % Images.length];
            return(
            <SwiperSlide className="slider3" key={book._id}>
            <Card sx={{ width:"100%",boxShadow:"none", bgcolor:"transparent" }}>
                <Box className="image-box" sx={{position:"relative", width:"100%"}}>
              <CardMedia 
                component="img" 
                image={img} 
                alt={book.description} 
                sx={{ width:"100%", height:"80%", objectFit:"cover", borderRadius:"10px" }}
              />
              <Button variant="contained" className='add-to-cart-btn'>Add to cart</Button>
              </Box>

              {/* <CardContent>
                <Typography gutterBottom variant="h6" textAlign="center">
                  {book.name}
                </Typography>
                <Typography gutterBottom variant="h6" textAlign="center">
                  {book.author}
                </Typography>
                <Typography gutterBottom variant="h6" textAlign="center">
                  {book.price}
                </Typography>
              </CardContent> */}
            </Card>
          </SwiperSlide>

            )
            })}
        
        
      </Swiper>
      </Box>

      <Box component="div" sx={{
        display: 'flex',marginTop:"50px",
        justifyContent: 'flex-end', marginRight:"5rem",alignItems:"center"}}>
      <Link href="/dashboard/books" underline="none" className='orangeBold-text' 
      sx={{fontSize:"20px",textTransform:"capitalize",color:"#ED553B",alignItems:"center"}}>
        view all books 
      </Link>
      <ArrowRightAltOutlinedIcon className='orangeBold-text'/>
      </Box>

    </Box>
      
    </>
  )
}
