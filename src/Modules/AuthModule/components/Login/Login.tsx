import { Box, TextField, Typography,IconButton, InputAdornment } from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Grid  from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useDispatch} from "react-redux";
import { setCredentials } from "../../../../Redux/authSlice";
import { useState } from "react";




export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  interface FormInputs {
    email: string;
    password: string;
  }

  let { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  let onSubmit = async(data: FormInputs) => {
    // console.log(data);
    

      try {
      let response = await axios.post("https://upskilling-egypt.com:3007/api/auth/login", data);
      localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      console.log(response?.data?.data?.accessToken);

      const userData = response?.data?.data?.profile;
      const token = response?.data?.data?.accessToken;

      // store userdata in redux
      dispatch(setCredentials({
        user:{
          id: userData._id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          status: userData.status,
          role: userData.role
        },
        token: token
      }));

      
      toast.success(`logged success, welcome ${userData.first_name}`,{ autoClose: 2000});
      navigate("/dashboard");

        }catch (error) {
      toast.error("logged failed. please check your email or password");

    }
  }



  return (
    <>
      <Box mb={4} mt={4}>
        <Typography variant="body1" color="textSecondary" >
          welcome back!
        </Typography>
        <Typography variant="h4" sx={{fontSize:{xs:'20px !important', sm:'33px !important'}}}>
          Login to your account
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField type="email" id="email" label="Email" variant="outlined" sx={{ width: "100%" }}
          {...register("email", { required: "email is required" })}
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <TextField type={showPassword? 'text':'password'} id="password" label="password" 
        variant="outlined"
        
         sx={{ width: "100%", marginTop: '15px' , marginBottom:'15px'}} 
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        />

        <Grid container sx={{justifyContent:"space-between"}}>
          <Stack display="flex" flexDirection="row" alignItems="center">
            <Checkbox/>
            <Typography variant="body2">Remember me</Typography>
          </Stack>

          <Stack sx={{cursor:'pointer'}} onClick={()=> navigate('/forget-pass')} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2">Forget Password</Typography>
          </Stack>
        </Grid>

        <Stack spacing={1.5}>
          <Stack>
            <Button type="submit" variant="contained" fullWidth className="orangeLight-bg"
            sx={{padding:"10px 0"}}>
              Login
            </Button>
          </Stack>

          <Stack>
            <Button onClick={()=> navigate('/register')} 
            variant="outlined" sx={{padding:"10px 0"}}>
              Register
            </Button>
          </Stack>

        </Stack>
      </Box>

    </>
  )
}
