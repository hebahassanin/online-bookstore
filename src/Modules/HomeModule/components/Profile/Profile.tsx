import { Stack, Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../Redux/store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { FadeLoader } from "react-spinners";


export default function Profile() {
   const {user,loading} =useSelector((state:RootState)=> state.auth);

   if(loading) {
    return  (
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",minHeight:"200px", }}>
        <FadeLoader  color="#393280" width={7} height={20}/>
      </Box>
    )  
  }

  return (
    <>
    <Stack className="purpule-color profile-bg" sx={{display:"flex", alignItems:"center", 
    justifyContent:"center", paddingY:"25px"}}>
        <Typography variant="h4">Profile</Typography>
    </Stack>
    {user ?(
        <>
        <Grid container spacing={4} sx={{my:3, py:5,px:3}}>
        <Grid  size={6} className="profile-bg" sx={{display:"flex",flexDirection:"column" ,alignItems:"center", 
        justifyContent:"center", borderRadius:"12px",boxShadow:"0 4px 10px rgba(0,0,0,0.6)"}}>
            <Avatar className="purpule-bg" sx={{width:90, height:90,fontSize:"40px"}}>
                {user.first_name[0].toUpperCase()}
            </Avatar>
            <Typography variant="h4" sx={{marginTop:"10px",marginBottom:"5px",textTransform:"capitalize"}}>
                {user.first_name} {user.last_name}
            </Typography>
            <Box  sx={{display:"inline-block",backgroundColor:"#d4edda",
             color:"#155724",fontWeight: 600,fontSize:"22px" ,borderRadius:"8px",width:"fit-content", 
             padding:"10px",textTransform:"capitalize"}}>
                {user.status}
            </Box>
        </Grid>

        <Grid size={6}>
        <TableContainer component={Box} className="profile-bg"
        sx={{maxWidth: 600, marginRight:"auto",p:5,boxShadow:"0 4px 10px rgba(0,0,0,0.6)",borderRadius:"12px"}}>
          <Typography variant='h5' sx={{fontWeight:"bold", marginBottom:"20px"}}>
          Personal Info
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{fontWeight:"bold",fontSize:"20px"}}>Full name:</TableCell>
                <TableCell sx={{fontSize:"18px"}}>
                  {user.first_name} {user.last_name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold",fontSize:"20px"}}>Email:</TableCell>
                <TableCell sx={{fontSize:"18px"}}>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold",fontSize:"20px"}}>Role:</TableCell>
                <TableCell sx={{fontSize:"18px"}}>{user.role}</TableCell>
              </TableRow>
              
            </TableBody>
          </Table>

        </TableContainer>
        
        </Grid>
        </Grid>
        </>

    ):(
        <Typography variant="h5" p={3}>No user found</Typography>
    )}
   
      
    </>
  )
}
