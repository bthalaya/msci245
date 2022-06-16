import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme, ThemeProvider, styled} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles"
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
 
 
//Dev mode
const serverURL = "https://ov-research-4.uwaterloo.ca:9090"; //enable for dev mode
 
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
 
const opacityValue = 0.9;

const useStyles = makeStyles((theme)=> ({
 rootReviewTitle: {
  margin: theme.spacing(1),
  width: 200,
},
 rootReviewBody: {
  margin: theme.spacing(1),
  width: 200,
 }
})
)

const classes = useStyles()

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
 
function App (){

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
          spacing={1}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Typography variant="h3" gutterBottom component="div">
            Movie Review
          </Typography>

          <MovieSelection/>
          <hr></hr>
          <ReviewTitle/>
          <hr></hr>
          <ReviewBody/>
          <hr></hr>
        </MainGridContainer>
      </Box>
    </ThemeProvider>
  );
}
 
function MovieSelection () {
 
 const [movie, setMovie] = React.useState('');
 
 const handleChange = (event) => {
   setMovie(event.target.movie);
 };
 
 return (
    <form className={classes.formControl} noValidate autoComplete='off'>
     <FormControl>
       <InputLabel id="demo-simple-select-label">Movie</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         movie={movie}
         label="Movie"
         onChange={handleChange}
       >
         <MenuItem movie={'Footloose'}>Footloose</MenuItem>
         <MenuItem movie={'The Karate Kid'}>The Karate Kid</MenuItem>
         <MenuItem movie={'The Notebook'}>The Notebook</MenuItem>
         <MenuItem movie={'Forrest Gump'}>Forrest Gump</MenuItem>
         <MenuItem movie={'Top Gun'}>Top Gun</MenuItem>
       </Select>
       <FormHelperText>Select a Movie to Review</FormHelperText>
     </FormControl>
 );
}
 
function ReviewTitle(){
  const classes = useStyles();
 return (
   <form className={useStyles.rootReviewTitle} noValidate autoComplete='off'>
     <div>
       <TextField required id="standard-required" label="Required" defaultValue="Movie Review Title" helperText="Enter Movie Review Title" />
     </div>
   </form>
 );
 }
 
function ReviewBody(){
 const classes = useStyles();
 
 return (
   <form className={useStyles.rootReviewBody} noValidate autoComplete='off'>
     <div>
     <TextField
         id="outlined-multiline-static"
         label="Movie Review"
         multiline
         rows={4}
         defaultValue="Default Value"
         variant="outlined"
         helperText="Enter Movie Review"
       />
     </div>
   </form>
 );
}
 
export default App;