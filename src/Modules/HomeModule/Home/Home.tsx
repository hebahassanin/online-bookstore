// import Categories from "../Categories/Categories";
import CategorySlider from "../components/CategorySlider/CategorySlider";
import ShowCase from "../components/ShowCase/ShowCase";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import BooksOffers from "../components/BooksOffers/BooksOffers";
import BooksSlider from "../components/BooksSlider/BooksSlider";
import LatestArticles from "../components/LatestArticles/LatestArticles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../Redux/store";
import { useEffect } from "react";
import { fetchCartItems } from "../../../Redux/cartSlice";


export default function Home() {

  const dispatch= useDispatch<AppDispatch>();

  useEffect(()=>{
    /* to show number of items that added in cart icon in home 
    after user is logged*/
    dispatch(fetchCartItems());
  },[dispatch])
  
  return (
    <>
    <ShowCase/>
    <CategorySlider/>
    <BooksSlider/>
    <BooksOffers/>
    <NewsLetter/>
    <LatestArticles/>

   

   
      
    </>
  )
}
