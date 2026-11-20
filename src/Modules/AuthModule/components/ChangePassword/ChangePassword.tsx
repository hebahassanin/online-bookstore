import { Box, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  interface FormInput{
    password: string;
    password_new: string;
  }

  let {register,handleSubmit, formState:{errors, isSubmitting}}= useForm<FormInput>();

  let onSubmit=async(data:FormInput)=>{
  console.log(data);
  
  try {
    // await axios.post("https://upskilling-egypt.com:3007/api/auth/change-password",data);
    await axios.post(
      "https://upskilling-egypt.com:3007/api/auth/change-password",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`, 
        }
      }
    );
    toast.success("The password has been changed");
    navigate("/");

    
  } catch (error:any) {
    toast.error(error.response?.data?.message || "There is something wrong");
    
  }
    

  }
  return (
    <>
       <Box mb={4} textAlign="start">
        <Typography variant="body1" color="textSecondary" >
          welcome back!
        </Typography>
        <Typography variant="h5">
         Change Your Password Easily
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField type={showPassword ? 'text' : 'password'} id="OldPassword" label="Old Password" 
        variant="outlined" sx={{ width: "100%", marginTop: '15px' , marginBottom:'15px'}} 
        {...register("password",{required:"password is required"})}
        error={!!errors?.password}
        helperText={errors?.password?.message}

         slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        />

      <TextField type={showNewPassword ? 'text' : 'password'} id="NewPassword" label="New Password" 
        variant="outlined" sx={{ width: "100%", marginTop: '15px' , marginBottom:'15px'}} 
        {...register("password_new",{required:"New Password is required"})}
        error={!!errors?.password_new}
        helperText={errors?.password_new?.message}

         slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        />

     <Stack>
        <Button type="submit" variant="contained" className="orangeLight-bg" 
        sx={{padding:"10px 0",fontSize:"16px"}} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span>Changing password...</span>
              <CircularProgress size={20} sx={{color: '#fff'}}  thickness={5}/>
            </>
          ) : 'Save'}
        </Button>
      </Stack>
      </Box>

      
    </>
  )
}
