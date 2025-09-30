import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import booksOffers from '../../../../assets/images/home/books offers.png';

export default function BooksOffers() {
  return (
    <>
       <Grid container sx={{backgroundColor:"#FCEBEA",margin:"20px 3.5rem",padding:"3rem"}}>
      <Grid sx={{paddingTop:"2rem"}}>
        <Typography variant="h4" className="purpule-color" 
        sx={{fontWeight:'bold',marginBottom:"3px",letterSpacing:"2px"}}>
        All books are 50% off now!
        </Typography>
        <Typography variant="h4" className="purpule-color" 
        sx={{fontWeight:'bold',letterSpacing:"2px"}}>
        Don't miss such a deal!
        </Typography>

        <Typography variant="body1" className="purpule-color" 
        sx={{fontSize:"16px",letterSpacing:"2px",lineHeight:"2",margin:"15px 0"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <br/>Sed eu feugiat amet, libero ipsum enim pharetra hac.
        </Typography>

        <Stack direction="row" spacing={4} alignItems="center" sx={{}}>
          <Stack direction="column" alignItems="center" spacing={0.5}>
            <Typography variant="h6" className="orangeBold-text" sx={{fontWeight:"bold"}}>768</Typography>
            <Typography variant="body2" fontWeight="500" 
            sx={{letterSpacing:"3px",textTransform:"uppercase"}}>
              Days
            </Typography>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={0.5}>
          <Typography variant="h6" className="orangeBold-text" sx={{fontWeight:"bold"}}>01</Typography>
            <Typography variant="body2" fontWeight="500" 
            sx={{letterSpacing:"3px",textTransform:"uppercase"}}>
              Hour
          </Typography>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={0.5}>
          <Typography variant="h6" className="orangeBold-text" sx={{fontWeight:"bold"}}>27</Typography>
            <Typography variant="body2" fontWeight="500" 
            sx={{letterSpacing:"3px",textTransform:"uppercase"}}>
              Mint
          </Typography>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={0.5}>
          <Typography variant="h6" className="orangeBold-text" sx={{fontWeight:"bold"}}>55</Typography>
            <Typography variant="body2" fontWeight="500" 
            sx={{letterSpacing:"3px",textTransform:"uppercase"}}>
              Sec
          </Typography>
          </Stack>

        </Stack>


      </Grid>
      <Grid >
        <img src={booksOffers} alt="booksOffers" style={{width: "80%",marginLeft:"auto",display:"block"}}/>
      </Grid>
    </Grid>
    </>
  )
}
