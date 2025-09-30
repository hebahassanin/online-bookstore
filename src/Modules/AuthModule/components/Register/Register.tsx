import { Box, TextField, Typography } from "@mui/material";
import { useForm,Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from "@mui/material/FormHelperText";



export default function Register() {
  const navigate= useNavigate();

  interface FormInputs {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
  }

  let{register, handleSubmit,control, formState:{errors}}=useForm<FormInputs>();

  let onSubmit=async(data:FormInputs)=>{
    console.log(data);
    

    try {
      await axios.post("https://upskilling-egypt.com:3007/api/auth/register",data);
      toast.success("Registration completed successfully, welcome to book store");
      navigate("/");
      
    } catch (error) {
      toast.error("Registration failed");
      
    }

  }

  
  return (
    <>
      <Box mb={4} mt={4} textAlign="start">
        <Typography variant="body1" color="textSecondary">
          Create new acccount
        </Typography>
        <Typography variant="h4">
         Register
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2}>
        <TextField type="text" id="first_name" label="First Name" variant="outlined"
        {...register("first_name", { required: "first_name is required" })}
        error={!!errors?.first_name}
        helperText={errors?.first_name?.message}
        />
        <TextField type="text" id="last_name" label="Last Name" variant="outlined" 
         {...register("last_name", { required: "last_name is required" })}
         error={!!errors?.last_name}
         helperText={errors?.last_name?.message}
        />
        </Stack>

        <TextField type="email" id="email" label="Email" 
        variant="outlined" fullWidth sx={{margin:"15px 0"}} 
        {...register("email", { required: "email is required" })}
        error={!!errors?.email}
        helperText={errors?.email?.message}
        />
        <TextField type="password" id="password" label="password" variant="outlined" fullWidth 
         {...register("password", { required: "password is required" })}
         error={!!errors?.password}
         helperText={errors?.password?.message}
        />

        {/* <FormControl
          fullWidth
          error={!!errors.role}
          sx={{ marginTop: "15px" }}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            defaultValue=""
            {...register("role", { required: "Role is required" })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl> */}

      <FormControl
          fullWidth
          error={!!errors.role}
          sx={{ marginTop: "15px" }}
        >
          <InputLabel id="role-select-label">Role</InputLabel>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} labelId="role-select-label">
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl>

        <Stack spacing={1.5}>
          <Stack>
            <Button type="submit" variant="contained" className="orangeLight-bg"
            sx={{padding:"10px 0"}}>
              Register
            </Button>
          </Stack>

          <Stack>
            <Button onClick={()=> navigate('/')} variant="outlined"
            sx={{padding:"10px 0"}}>
              Login
            </Button>
          </Stack>
        </Stack>


      </Box>
    </>
  )
}
