import { Typography,Box,ThemeProvider,Grid,TextField,Button} from '@mui/material'
import {deepPurple, green} from '@mui/material/colors'
import { createTheme} from '@mui/material/styles'
import { useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"


const useStyles = createTheme({
 palette:{
     headingColor: {
         backgroundColor: deepPurple[400],
         color: "white"
        },
        addStuColor: {
            backgroundColor: green[400],
            color: "white"
        },
    }   
});

const Edit = () => {

  const [student, setStudent] = useState({
   stuname: "",
   email: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();



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

      function onTextField(e){
        setStudent({
        ...student, //using spread operator to get previous value 
        [e.target.name]: e.target.value}) //changes all the textfield
      }

      
      async function onFormSubmit(e){
        e.preventDefault()
        try{
          await axios.put(`http://localhost:3333/students/${id}`,student)
        }
        catch(error){
          console.log(error,"bad url request")
        }
      }

      function handlClick(){
        navigate("/")
      }
 return (
  <>
      <ThemeProvider theme={useStyles}>
    <Box textAlign="center" bgcolor="headingColor.backgroundColor" p={2} mb={3}>
    <Typography variant="h2" color="headingColor.color">React CRUD with API Call</Typography>
   </Box>
    </ThemeProvider>

   <Grid container justifyContent="center" spacing={4}>
    <Grid item md={6} xs={12}>
    <ThemeProvider theme={useStyles}> 
     <Box textAlign="center" p={2} bgcolor="addStuColor.backgroundColor" mb={2}>
      <Typography variant="h4" color="addStuColor.color">Edit Student</Typography>
     </Box>
     </ThemeProvider>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" value={student.stuname} onChange={e=>onTextField(e)}/>
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={student.email} onChange={e=>onTextField(e)}/>
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)} > Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handlClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid >
  </>
 )
}

export default Edit