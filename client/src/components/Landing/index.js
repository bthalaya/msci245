import React, { Component, useEffect } from 'react';
import {createTheme, ThemeProvider, styled} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemButton from '@material-ui/core/ListItemButton';
import history from '../Navigation/history';
//import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from "@material-ui/core/Menu";
import Toolbar from '@material-ui/core/Toolbar';

const serverURL = "";

const opacityValue = 0.9;
 
const lightTheme = createTheme({
 palette: {
   type: 'light',
   background: {
     default: "#ffffff"
   },
   primary: {
     main: '#ef9a9a',
     light: '#ffcccb',
     dark: '#ba6b6c',
     background: '#eeeeee'
   },
   secondary: {
     main: "#b71c1c",
     light: '#f05545',
     dark: '#7f0000'
   },
 },
});
 

const MainGridContainer = styled(Grid)(({ theme }) => ({
 margin: theme.spacing(4),
}))

const Landing = () => {
 
return (
   <ThemeProvider theme={lightTheme}>
     <Box
       sx={{
         height: '100vh',
         opacity: opacityValue,
         overflow: "hidden",
         backgroundColor: lightTheme.palette.background.default,
 
       }}
     >
       <MainGridContainer
         container
         spacing={3}
         style={{ maxWidth: '50%' }}
         direction="column"
         justify="flex-start"
         alignItems="stretch"
       >
         <div>
         <Navigation/>
         <br></br>
         <br></br>
         <br></br>
         <Typography variant="h3" gutterBottom component="div">
           Welcome to My Reviews!
         </Typography>
          <br></br>
          <br></br>
         <Typography variant="h7" gutterBottom component="div">
           Users can input reviews on the 'Movie Review' page, add recommendations on the 'Recommendations' page, and search the movie database by actors, directors and movie.
         </Typography>
         </div>
        
       </MainGridContainer>
     </Box>
   </ThemeProvider>
 );

}

const Navigation =() =>{
  
  return(
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
         // onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          
           <div>  
            <Button 
            sx={{ color: '#fff' }} 
            onClick={() => history.push('/Reviews')}
            >
              Movie Review
            </Button>
            <Button 
            sx={{ color: '#fff' }}
            onClick={() => history.push('/Search')}
            >
              Search
            </Button>
            <Button 
            sx={{ color: '#fff' }}
            onClick={() => history.push('/Recommendations')}
            >
              Recommendations
            </Button>
            <Button 
            sx={{ color: '#fff' }}
            onClick={() => history.push('/')}
            >
              Home
            </Button>
          </div> 
      
        </Box>
      </Toolbar>
    </AppBar>
    <Box component="nav">
      
    </Box>
    </Box>
  )


}


export default Landing;