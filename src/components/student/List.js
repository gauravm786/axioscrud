import { Typography,Box,ThemeProvider,TableContainer,Table,TableBody,TableCell,TableHead,TableRow,Paper,IconButton,Tooltip} from '@mui/material'
import { orange} from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Outlet } from "react-router-dom";
import { createTheme} from '@mui/material/styles'
import axios from "axios"
import {useState,useEffect} from "react"

// colors 
const useStyles = createTheme({
 palette:{
   stuListColor:{
     backgroundColor:orange[400],
     color:"white"
    },
    tableHeadCell: {
      backgroundColor:"#616161",
      colors: "white",
      fontWeight: "bold",
      fontSize: 16
    }
  } 
})

const List = () => {
  const[students,setStudents]=useState([])
  useEffect(()=>{
    async function getAllStudents(){
      try{
        const students = await axios.get("http://localhost:3333/students")
        // console.log(students.data)
        setStudents(students.data)
      }
      catch(error){
        console.log(error,"bad url request")
      }
    }
    getAllStudents()
  },[])

  const handleDelete = async (id) =>{
    await axios.delete(`http://localhost:3333/students/${id}`)
    var newList=students.filter((items)=>{
      return items.id !== id
    })
    setStudents(newList)
  }
  return (
    <>
    <ThemeProvider theme={useStyles}>
    <Box textAlign="center" p={2} bgcolor="stuListColor.backgroundColor">
    <Typography variant="h4" color="stuListColor.color">Student List</Typography>
   </Box>
    </ThemeProvider>

   <TableContainer component={Paper}>
    <Table>
     <TableHead>
        <ThemeProvider theme={useStyles}>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" color='tableHeadCell.colors' style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>No</TableCell>
       <TableCell align="center" color="tableHeadCell.colors" style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>Name</TableCell>
       <TableCell align="center" color="tableHeadCell.colors" style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>Email</TableCell>
       <TableCell align="center" color="tableHeadCell.colors" style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>Action</TableCell>
      </TableRow>
        </ThemeProvider>
     </TableHead>
     <TableBody>
      {
        students.map((student)=>{
          return (
         <TableRow key={student.id}>
          <TableCell align="center">{student.id}</TableCell>
          <TableCell align="center">{student.stuname}</TableCell>
          <TableCell align="center">{student.email}</TableCell>
          <TableCell align="center">
           <Tooltip title="View">
            <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={()=>handleDelete(student.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
          )
        })
      }
     </TableBody>
    </Table>
   </TableContainer>
   <Outlet />
    </>
  )
}

export default List