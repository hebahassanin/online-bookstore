import { CircularProgress, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();

  interface FormInputs {
    email: string;
    password?: string;
  }

  let {register, handleSubmit, formState:{errors, isSubmitting}}= useForm<FormInputs>();

  let onSubmit=async(data:FormInputs)=>{
   try {
    // console.log(data);
    await axios.post("https://upskilling-egypt.com:3007/api/auth/forgot-password",data);
    navigate('/reset-pass');

    
   } catch (error) {
    console.log(error);    
   }

  }

  return (
    <>
      <Box mb={4} textAlign="start">
        <Typography variant="body1" color="textSecondary" >
          welcome back!
        </Typography>
        <Typography variant="h4">
         Forget Password !!
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField type="email" id="email"  label='email'
      variant="outlined" sx={{width:"100%"}}
      {...register("email",{required:"email is required"})}
      error={!!errors?.email}
      helperText={errors?.email?.message}
       />

      <Stack marginTop={3}>
        <Stack>
        <Button type="submit" variant="contained" fullWidth className="orangeLight-bg"
        sx={{padding:"10px 0",fontSize:"16px"}} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span>Sending...</span>
              <CircularProgress size={20} sx={{color: '#fff'}}  thickness={5}/>
            </>
          ) : 'Send'}
        </Button>
        </Stack>

      </Stack>
      </Box>
    </>
  )
}


