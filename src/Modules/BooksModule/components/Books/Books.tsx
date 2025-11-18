import { Box, Divider, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { FadeLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../Redux/store';
import { addItemToCart } from '../../../../Redux/cartSlice';
import { toast } from 'react-toastify';

import GridOnIcon from '@mui/icons-material/GridOn';
import ListIcon from '@mui/icons-material/List';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

import { useLocation } from 'react-router-dom';


interface Book{
  _id: number;
  name: string;
  author: string;
  description: string;
  price: number;
  image? : string;
  category?: string
}

interface category{
  _id:string;
  title:string;
}
export default function Books() {
  const [books, setBooks]= useState<Book[]>([]);
  const navigate= useNavigate();
  const [loading, setLoading]= useState(true);

  const [isListView, setIsListView] = useState(false);

  const location= useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");

  // state to store categories
  const [categories, setCategories]= useState<category []>([]);

  // state to store category that i selected.
  const [selectedCategories, setSelectedCategories] = useState<string []>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  // function to getAllCategories 
  const getAllCategories=async()=>{
    try {
      const response = await axios.get("https://upskilling-egypt.com:3007/api/category");
      console.log(response?.data);
      
      setCategories(response?.data);
      
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    let newSelected = [...selectedCategories];
  
    if (newSelected.includes(categoryId)) {
      newSelected = newSelected.filter((id) => id !== categoryId);
    } else {
      newSelected.push(categoryId);
    }
  
    setSelectedCategories(newSelected);
  
    // فلترة الكتب بناءً على الكاتيجوريات المختارة
    if (newSelected.length === 0) {
      setBooks(allBooks); // لو مفيش فلترة، رجع كل الكتب
    } else {
      const filteredBooks = allBooks.filter((book) =>
        newSelected.includes(String(book.category))
      );
      setBooks(filteredBooks);
    }
  };
  
  // to make sort by name from a to z and z to a
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const handleSortByName =()=>{
    const sortedBooks = [...books].sort((a,b)=>{
      if(sortByNameAsc){
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setBooks(sortedBooks);
    setSortByNameAsc(!sortByNameAsc);
  }

  // To make Sort by price
  const[sortByPriceAsc, setSortByPriceAsc]=useState(true);
  const handleSortByPrice =()=>{
    const sortedBooks = [...books].sort((a,b)=>{
      if(sortByPriceAsc){
        return a.price - b.price;
      } else{
        return b.price - a.price;
      }
    });

    setBooks(sortedBooks);
    setSortByPriceAsc(!sortByPriceAsc);
  }
    

  
  const dispatch = useDispatch<AppDispatch>();   
  
  // function to add book to cart
  const handleAddToCart=(book:Book)=>{
    dispatch(addItemToCart({bookId:String(book._id), quantity:1}));
    toast.success(`${book.name} added to cart!`,{
      position:"top-right",
      autoClose:2000
    });
  }

  // function to getAllBooks
    const getBooks=async()=>{
        try {
          setLoading(true);
            const response = await axios.get("https://upskilling-egypt.com:3007/api/book?limit=16");
            console.log(response?.data?.data);
            setAllBooks(response?.data?.data)
            setBooks(response?.data?.data);
            
        } catch (error) {
            console.log(error)
        }finally{
          setLoading(false);
        }
    }

    useEffect(()=>{
      getBooks();
      getAllCategories();
    },[])

    useEffect(()=>{
      if(categoryId){
        const filteredBooks = allBooks.filter(book=> String(book.category) === categoryId);
        setBooks(filteredBooks);
        setSelectedCategories([categoryId]);
      }else{
        setBooks(allBooks)
        
      }

      
    },[categoryId, allBooks]);
  return (
    <>
    {loading ? (
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px", }}>
          <FadeLoader  color="#393280" width={7} height={20}/>
        </Box>
      ):(  
        <>
        
    <Grid container spacing={2} sx={{margin:"20px"}}>

        {/* Filter Accordion  */}
      <Grid size={{xs:12, md:2}} mt={9}>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography sx={{fontWeight:"bold"}}> Filter By Category</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{maxHeight:"350px", overflow:"auto"}}>
          {categories.map((category)=>(
            <Box key={category._id} display="flex" alignItems="center">
              <Checkbox checked={selectedCategories.includes(category._id)} 
              onChange={()=> handleCategoryChange(category._id)}/>
              <Typography>{category.title}</Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      </Grid>
       
     {/* Books */}
     <Grid container size={{xs:12, md:10}} spacing={2}>
      {/* Sort by Name and price & View Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center"
             mb={3} mx={3} width="100%">
              <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" sx={{color:"#333", fontSize:"30px"}}> Sort by:</Typography>

            {/* Sort by Name button */}
            <Button variant="contained" onClick={handleSortByName}
            sx={{textTransform:"none", fontWeight:"bold", fontSize:"18px",
            backgroundColor: sortByNameAsc ? "#ef6b4a":"#f0f0f0",
            transition:"all 0.3s ease",
            color: sortByNameAsc ? "#fff": "#333",
            "&:hover":{backgroundColor: "#ef6b4a"
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderRadius: "8px",
            padding:"8px 16px"}}>
              Name
              {sortByNameAsc ?(
                <ArrowUpwardIcon sx={{fontSize:"1.5rem"}}/>
              ):(
                <ArrowDownwardIcon sx={{fontSize:"1.5rem"}}/>
              )
            } 
            </Button>
            
              {/* Sort by Price button */}
            <Button variant="contained" onClick={handleSortByPrice}
            sx={{textTransform:"none", fontWeight:"bold", fontSize:"18px",
            backgroundColor: sortByPriceAsc ? "#ef6b4a" : "#f0f0f0",
            transition:"all 0.3s ease",
            color: sortByPriceAsc ? "#fff" : "#333",
            "&:hover":{
              backgroundColor:"#ef6b4a"
            },
            display:"flex", alignItems:"center", gap:1, 
            borderRadius: "8px", padding:"8px 16px"
            }}>
              Price
              {sortByPriceAsc ?(
                <ArrowUpwardIcon sx={{fontSize:"1.5rem"}}/>
              ):(
                <ArrowDownwardIcon sx={{fontSize:"1.5rem"}}/>
              )}
            </Button>
          </Box>
        
        {/* -Icons to view books either grid (row) or list (column) */}
        <Box>
          <IconButton onClick={()=> setIsListView(false)}>
            <GridOnIcon  sx={{fontSize:"2rem",strokeWidth:1, color:!isListView ? "#ef6b4a": "#333"}}/>
          </IconButton>
          
          <IconButton onClick={()=>setIsListView(true)}>
            <ListIcon  sx={{fontSize:"2.5rem",color: isListView ? "#ef6b4a": "#333"}}/>
          </IconButton>
        </Box>
        </Box>

       <Grid container spacing={2} direction={isListView ? "column":"row"}>
      {books.map((book)=>{
        return(
          <>
          <Grid size={books.length ===1 ? 12: isListView ? 12 : 4} sx={{marginBottom:"2rem", paddingLeft:isListView ? "100px":0}}  key={book._id} >
            <Box display="flex" flexDirection={isListView ? "row" : "column"} 
            alignItems="center"
            gap={isListView ? 7 :0}>
              <Card sx={{ width: isListView ? "25%":"70%", bgcolor:"transparent", }} elevation={5}>
              <Box className="image-box" sx={{position:"relative", width:"100%"}}>
                  <CardMedia className='book-image'
                    component="img" 
                    image={book.image} 
                    alt={book.description} 
                    sx={{ width: "100%",margin:"0 auto",height:"300px",
                    objectFit:"contain", borderRadius:"10px" }}
                  />
                  <Button sx={{fontSize:{xs:"20px",md:"25px"}}} variant="contained" className='add-to-cart-btn'
                    onClick={()=>handleAddToCart(book)}>
                      Add to cart
                  </Button>
              </Box>
                
              </Card>
              <Box flex={1} textAlign={isListView ? "left" :"center"} mt={3} ml={5}>
              <Typography gutterBottom variant="h5"  className='purpule-color'
                  sx={{cursor:"pointer"}} >
                    {book.name}
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                    {book.author}
                </Typography>
                <Typography gutterBottom variant="h6"  className='orangeBold-text'>
                     $ {book.price}
                </Typography>

                <Button variant="outlined" className="purpule-color"    
                sx={{margin:"10px auto",width:"150px"
                ,padding:"10px 0",borderColor:"#393280"}}
                onClick={()=>navigate(`/dashboard/books/${book._id}`)}>
                  view details 
                  <ArrowRightAltOutlinedIcon/>
                </Button>
              </Box>  
              </Box>
             
           </Grid>
           <Divider sx={{display:isListView ?"block":"none", mb:"15px"}} />
           </>
        )
      })}
      </Grid>
      </Grid>
      </Grid>
      </>
      
      )}
    </>
  )
}

// ()=> dispatch(addItemToCart({bookId:String(book._id), quantity:1}))