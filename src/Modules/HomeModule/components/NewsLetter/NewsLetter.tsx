import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { InputAdornment } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline'


export default function NewsLetter() {
  return (
    <>
    <Stack sx={{backgroundColor:"#FCEBEA",paddingBottom:'3rem',position:"relative"}}>
      <Stack className="orangeBold-bg" 
        sx={{color:"white",padding:"3rem 0 6rem", width:"80%", margin:"0 auto"}}
        display="flex" direction="column" 
        alignItems="center" justifyContent="flex-start">
          <Typography variant="h3" sx={{fontWeight:"bold",
          letterSpacing:"4px",marginBottom:"15px"}}>
            Subscibe to Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{
          fontSize:"18px",letterSpacing:"2px",lineHeight:"2"}}>
            Sed eu feugiat amet, libero ipsum enim 
          pharetra hac dolor sit amet,<br/> consectetur. 
          Elit adipiscing enim pharetra hac.
          </Typography>
      </Stack>

      <Stack  sx={{position:"absolute",bottom:"28px",left:"25%"}}>
        <TextField variant="outlined" placeholder='Enter Your email'
        sx={{width:"600px",backgroundColor:"white",
        "& .MuiOutlinedInput-root":{
          height:"60px",
          "& fieldset":{
            borderColor:"transparent"
          },
          "&:hover fieldset":{
            borderColor:"transparent"

          },
          "&.Mui-focused fieldset":{
            borderColor:"transparent"
          }
        }

      
      }}
        slotProps={{
          input:{
            startAdornment:(
              <InputAdornment position='start'>
                <MailOutlineIcon sx={{color:"text.disabled"}}/>
              </InputAdornment>
            ),
            endAdornment:(
              <InputAdornment position='end'>
                <Button variant="contained" className='orangeBold-bg' size="large">Subscribe</Button>
              </InputAdornment>

            )
          }
        }}/>
      </Stack>
    </Stack>
      
    </>
  )
}
