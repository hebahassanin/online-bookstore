import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
// import { useLocation} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, Divider, Typography } from '@mui/material';
import { FadeLoader } from "react-spinners";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../Redux/store";
import { addItemToCart } from "../../../../Redux/cartSlice";
import { toast } from "react-toastify";


interface Book{
  id: number;
  name: string;
  author: string;
  description: string;
  price: number;
  image? : string;
}

export default function BookDetails() {
  const {bookId} = useParams();
  // const location = useLocation();
  // const {image} = location.state || {};
  const[ book, setBook] = useState<Book |null>(null);
  const token = localStorage.getItem("accessToken");
  const navigate =useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart=(book:Book)=>{
    dispatch(addItemToCart({bookId:String(bookId), quantity:1}));
    toast.success(`${book.name} added to cart!`,{
      position:"top-right",
      autoClose:2000
    });
  }

  const getBookDatails = async()=>{
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3007/api/book/${bookId}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
      }
      });
    setBook(response?.data)
    console.log(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getBookDatails();
  },[bookId])

  if(!book){
    return  <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px"}}>
              <FadeLoader  color="#393280" width={7} height={20}/>
            </Box>
  }
  return (
    <>
     <Grid container spacing={2} sx={{marginBottom:"2rem", padding:"20px"}}>

      <Grid size={6} sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
      <Card sx={{ width:"50%", bgcolor:"transparent" }} elevation={5}>
        <CardMedia 
          component="img" 
          image={book.image} 
          alt={book.description} 
          sx={{ width: "100%",height:"500px", objectFit:"contain", borderRadius:"10px" }}
        />   
      </Card>
      </Grid>
      <Grid size={6}>
      <Typography gutterBottom variant="h3" className='purpule-color'
         sx={{textTransform:"capitalize"}}>
              featured book
      </Typography>
      <Divider sx={{borderBottomWidth:2,borderColor:"#ED553B",
       width:"10rem",marginTop:"2rem",marginBottom:"10px"}}/>

        <Typography gutterBottom variant="subtitle1" color="textSecondary"
            sx={{cursor:"pointer"}} >
             By {book.author}
          </Typography>
          <Typography gutterBottom variant="h5" className="purpule-color" sx={{marginY:"2rem"}}>
              {book.name}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" >
              {book.description}
          </Typography>
          <Typography gutterBottom variant="h6" className='orangeBold-text' sx={{marginY:"15px"}}>
              $ {book.price}
          </Typography>
          <Box sx={{marginY:"20px"}}>
          <Button  variant="contained" className="orangeBold-bg" 
          onClick={()=> handleAddToCart(book)} 
          sx={{padding:"10px 20px",marginRight:"4rem"}}>
            Add To Cart
          </Button>
          <Button  variant="outlined" className="purpule-color"
          sx={{padding:"10px 20px",borderColor:"#393280"}} onClick={()=> navigate("/dashboard/books")}>
            Back To Books</Button>

          </Box>
          
      </Grid>

     </Grid>
    </>
  )
}
