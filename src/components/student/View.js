import { Typography, Box, ThemeProvider, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@mui/material"
import { yellow } from '@mui/material/colors';
import { createTheme} from '@mui/material/styles'
import {useParams,useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios"


const useStyles = createTheme({
  palette:{ 
 stuListColor: {
  backgroundColor: yellow[900],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
}
});
const View = () => {

  // using useParams
  const {id}=useParams()
  // console.log(id)
  //now based on id we will fetch data from API and then we will call API using useEffect hook and then data recieved from API will be stored in state.
//  axios helps us to call API 

const [student,setStudent]=useState([])

useEffect(()=>{
  async function getStudent(){
    try{
      const student = await axios.get(`http://localhost:3333/students/${id}`)
      // console.log(student.data)
      setStudent(student.data)
    }
    catch(error){
      console.log(error,"bad url request")
    }
  }
  getStudent()
},[id])


const navigate = useNavigate()

function handleClick(){
  navigate("/")
}

  return (
  <>
    <ThemeProvider theme={useStyles}>
    <Box textAlign="center" bgcolor="stuListColor.backgroundColor" p={2}>
    <Typography variant="h4" color="stuListColor.color">Student Detail</Typography>
   </Box>
    </ThemeProvider>  
    
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <ThemeProvider theme={useStyles}>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" color="tableHeadCell.color" style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>ID</TableCell>
       <TableCell align="center" color="tableHeadCell.color" style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>Name</TableCell>
       <TableCell align="center" color="tableHeadCell.color" style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>Email</TableCell>
      </TableRow>
      </ThemeProvider>
     </TableHead>
     <TableBody>
      <TableRow>
       <TableCell align="center">{student.id}</TableCell>
       <TableCell align="center">{student.stuname}</TableCell>
       <TableCell align="center">{student.email}</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
  </>
 )
}

export default View