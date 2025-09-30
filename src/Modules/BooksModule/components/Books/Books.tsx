import { Box, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// import Images
import bookImage1 from '../../../../assets/images/books/book1.png'; 
import bookImage2 from '../../../../assets/images/books/book2.png';
import bookImage3 from '../../../../assets/images/books/book3.png';
import bookImage4 from '../../../../assets/images/books/book4.png';
import bookImage5 from '../../../../assets/images/books/book5.png';
import bookImage6 from '../../../../assets/images/books/book6.png';
import bookImage7 from '../../../../assets/images/books/book7.png';
import bookImage8 from '../../../../assets/images/books/book8.png';
import { FadeLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../Redux/store';
import { addItemToCart } from '../../../../Redux/cartSlice';

interface Book{
  _id: number;
  name: string;
  author: string;
  description: string;
  price: number;
  imageUrl? : string;
}
export default function Books() {
  const [books, setBooks]= useState<Book[]>([]);
  const navigate= useNavigate();
  const [loading, setLoading]= useState(true);
    const Images =[bookImage1, bookImage2, bookImage3,bookImage4,
         bookImage5,bookImage6, bookImage7,bookImage8];

  
  const dispatch = useDispatch<AppDispatch>();       

    const getBooks=async()=>{
        try {
          setLoading(true);
            const response = await axios.get("https://upskilling-egypt.com:3007/api/book");
            console.log(response?.data?.data);
            setBooks(response?.data?.data);
            
        } catch (error) {
            console.log(error)
        }finally{
          setLoading(false);
        }
    }

    useEffect(()=>{
        getBooks();
    },[])
  return (
    <>
    {loading ? (
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px", }}>
          <FadeLoader  color="#393280" width={7} height={20}/>
        </Box>
      ):(  
    <Grid container spacing={2} sx={{margin:"20px"}} >
      {books.map((book,index)=>{
        const img = Images[index % Images.length];
        return(
          <Grid size={4} sx={{marginBottom:"2rem"}}  key={book._id}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Card sx={{ width:"70%", bgcolor:"transparent" }} elevation={5}>
              <Box className="image-box" sx={{position:"relative", width:"100%"}}>
                  <CardMedia className='book-image'
                    component="img" 
                    image={img} 
                    alt={book.description} 
                    sx={{ width: "auto",maxWidth:"70%" ,margin:"0 auto",height:"300px", objectFit:"contain", borderRadius:"10px" }}
                  />
                  <Button variant="contained" className='add-to-cart-btn'
                  onClick={()=> dispatch(addItemToCart({bookId:String(book._id), quantity:1}))}
                  >Add to cart</Button>
              </Box>
                
              </Card>
              <Box textAlign="center" mt={2}>
              <Typography gutterBottom variant="h5" textAlign="center" className='purpule-color'
                  sx={{cursor:"pointer"}} >
                    {book.name}
                </Typography>
                <Typography gutterBottom variant="subtitle1" textAlign="center" color="textSecondary">
                    {book.author}
                </Typography>
                <Typography gutterBottom variant="h6" textAlign="center" className='orangeBold-text'>
                     $ {book.price}
                </Typography>

                <Button variant="outlined" className="purpule-color"    
                sx={{margin:"10px auto",width:"150px"
                ,padding:"10px 0",borderColor:"#393280"}}
                onClick={()=>navigate(`/dashboard/books/${book._id}`, {state:{image: img}})}>
                  view details 
                  <ArrowRightAltOutlinedIcon/>
                </Button>
              </Box>  
              </Box>
             
           </Grid>
        )
      })}
      </Grid>
      )}
    </>
  )
}
