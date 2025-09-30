import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid  from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { toast } from "react-toastify";

export default function ResetPassword() {

  const navigate= useNavigate();

  interface FormInputs {
    email: string;
    password: string;
    otp:string;
  }
  let {register,handleSubmit,formState:{errors}}=useForm<FormInputs>();

  let onSubmit=async(data:FormInputs)=>{

    try {
      let response= await axios.post("https://upskilling-egypt.com:3007/api/auth/reset-password",data)
      console.log(response);
      localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      // toast.success("logged success, welcome to book store");
      navigate('/login');
      
    } catch (error) {
      toast.error("reset failed");
      
      
    }
   
    

  }

  
  return (
    <>
      <Box mb={4} textAlign="start">
        <Typography variant="body1" color="textSecondary">
         welcome back!
        </Typography>
        <Typography variant="h4">
         Reset Your Password Now !
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField type="email" id="email" label="Email" variant="outlined" sx={{ width: "100%" }}
          {...register("email", { required: "email is required" })}
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
         <TextField type="otp" id="otp" label="otp" variant="outlined" 
          sx={{ width: "100%", marginTop: '15px' }}
          {...register("otp", { required: "otp is required" })}
          error={!!errors?.otp}
          helperText={errors?.otp?.message}
        />
        <TextField type="password" id="password" label="password" 
        variant="outlined" sx={{ width: "100%", marginTop: '15px' , marginBottom:'15px'}} 
        {...register("password",{required:"password is required"})}
        error={!!errors?.password}
        helperText={errors?.password?.message}
        />

        <Grid container sx={{justifyContent:"space-between"}}>
          <Stack display="flex" flexDirection="row" alignItems="center">
            <Checkbox/>
            <Typography variant="body2">Remember me</Typography>
          </Stack>

        </Grid>

        <Stack spacing={1.5}>
          <Stack>
            <Button type="submit" variant="contained" fullWidth className="orangeLight-bg"
            sx={{padding:"10px 0"}}>
              Reset
            </Button>
          </Stack>

          <Stack>
            <Button onClick={()=> navigate('/')} 
            variant="outlined" sx={{padding:"10px 0"}}>
              Login
            </Button>
          </Stack>

        </Stack>
      </Box>
    </>
  )
}
