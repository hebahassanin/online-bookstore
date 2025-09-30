import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ChangePassword() {

  const navigate = useNavigate();
  interface FormInput{
    password: string;
    password_new: string;
  }

  let {register,handleSubmit, formState:{errors}}= useForm<FormInput>();

  let onSubmit=async(data:FormInput)=>{
  console.log(data);
  
  try {
    // await axios.post("https://upskilling-egypt.com:3007/api/auth/change-passwordword",data);
    await axios.post(
      "https://upskilling-egypt.com:3007/api/auth/change-passwordword",
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
      <TextField type="password" id="OldPassword" label="Old Password" 
        variant="outlined" sx={{ width: "100%", marginTop: '15px' , marginBottom:'15px'}} 
        {...register("password",{required:"password is required"})}
        error={!!errors?.password}
        helperText={errors?.password?.message}
        />

      <TextField type="password" id="NewPassword" label="New Password" 
        variant="outlined" sx={{ width: "100%", marginTop: '15px' , marginBottom:'15px'}} 
        {...register("password_new",{required:"New Password is required"})}
        error={!!errors?.password_new}
        helperText={errors?.password_new?.message}
        />

     <Stack>
        <Button type="submit" variant="contained" className="orangeLight-bg" sx={{padding:"10px 0"}}>Save</Button>
      </Stack>
      </Box>

      
    </>
  )
}
