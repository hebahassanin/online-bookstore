import notFoundImg from "../../../../assets/images/notFound/Not found.gif";
import Box from '@mui/material/Box';


export default function NotFound() {
  return (
    <>
      <Box component="img" src={notFoundImg} 
      sx={{width:"65%",height:"100vh",marginX:"auto",
      display:"block"}}>
      </Box>
    </>
  )
}
