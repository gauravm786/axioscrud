import React from 'react'
import List from '../student/List'
import { Typography,Box,ThemeProvider,Grid,TextField,Button} from '@mui/material'
import {deepPurple, green} from '@mui/material/colors'
import { createTheme} from '@mui/material/styles'
import axios from "axios"
import {useState} from "react"

const useStyles = createTheme({
palette:{
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
   },
   addStudentColor:{
    backgroundColor:green[400],
    color:"white"
   }
}
})

const Home = () => {
  //Adding inserting data to API
  // now we will send data to db.json 
  //before using post request we will put form data in state and then it will send data in API in db.json 
  const[student,setStudent]=useState({
    stuname:"",
    email:""
  })

  //so instead of defining val
  // function onNameChange(e){
  //   setStudent({
  //     'stuname':e.target.value
  //   })
  // }

  //now we will set value for each and every field without making different function for each field like above
  function onTextField(e){
    setStudent({
    ...student, //using spread operator to get previous value 
    [e.target.name]: e.target.value})
    //to check whether onchange event is working properly or not when we type any data in TextField
    // console.log(student) //working properly and here we get data in our state
    //now we will send data through POST request in our API IN db.json and now with the help of onFormSubmit Event data will be sent to API
  }

  async function onFormSubmit(e){
    e.preventDefault()
    try{
      await axios.post("http://localhost:3333/students",student)
      setStatus(true) //bydefault value is false and will not show the page and because if true it will show the page
      setStudent("")
    }
    catch(error){
      console.log(error,"bad url request")
    }
  }
  //now we are getting data into API but after refreshing the page we can see data on the webpage but we cannot see it directly after clicking on ADD button so to deal with it we will show student's data directly on the webpage depending on status

  const[status,setStatus]=useState()
  if(status){ //if status is true then render/call the Home page again
    return (<Home />)
  }

  return (
    <>
    {/* <h1>This is Home Page</h1> */}
    {/* style={{backgroundColor:"#ab47bc",color:"white"}} */}


    {/* navbar */}
    <ThemeProvider theme={useStyles}>
      {/* <CssBaseline /> */}
    <Box textAlign="center" bgcolor="headingColor.backgroundColor" p={2} mb={3}>
    <Typography variant="h2" color="headingColor.color">React CRUD with API Call</Typography>
   </Box>
    </ThemeProvider>


    {/* grid body  */}

    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
    <ThemeProvider theme={useStyles}>
        {/* <h1>Add Student</h1> */}
        <Box textAlign="center" p={2} mb={2} bgcolor="addStudentColor.backgroundColor">
        <Typography variant="h4" color="addStudentColor.color">Add Student</Typography>
        </Box>
    </ThemeProvider>

    <form noValidate>
<Grid container spacing={2}>
 <Grid item xs={12} >
  <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" 
  onChange={e=>onTextField(e)}/>
 </Grid>
 <Grid item xs={12}>
  <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address"
  onChange={e=>onTextField(e)}/>
 </Grid>
</Grid>
<Box m={3}>
 <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)}>Add</Button>
</Box>
</form>
    </Grid>

      <Grid item md={6} xs={12}>
        <List />
      </Grid>
    </Grid>
    </>
  )
}

export default Home

// preventDefault
// Definition and Usage
// The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

// For example, this can be useful when:

// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL
//In other words we can also say that preventDefault submit data without refreshing the page or without re-rendering(calling twice) the page.