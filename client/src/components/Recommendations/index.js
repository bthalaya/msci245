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



//Dev mode
const serverURL = "";
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";
 //enable for dev mode
 //enable for dev mode
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
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

const Recommendation = (props) => {
 
 const [movieSelect1, setMovieSelect1] = React.useState('');
 const [movieSelect2, setMovieSelect2] = React.useState('');
 const [submissionCheck,setSubmissionCheck] = React.useState(false);
 const [submissionValidation,setSubmissionValidation] = React.useState(false);
 const [submissionData,setSubmissionData] = React.useState([]);
 let [reviewData,setReviewData] = React.useState({});
 

 const handleMovieSelect1 = (movie) => {
   setMovieSelect1(movie);
   console.log(movie.name);
 };

 const handleMovieSelect2 = (movie) => {
  setMovieSelect2(movie);
  console.log(movie.name);
};
 


const handleSubmissionCheck = (event) =>{
  setSubmissionCheck(true);
}
const handleSubmissionValidation = (event) => {
  event.preventDefault();
  if(movieSelect1 != '' && movieSelect2 != '' && movieSelect1 != movieSelect2){
    let data = {
      movieTitle1: movieSelect1.name,
      movieTitle2: movieSelect2.name 
    }
    setSubmissionData([movieSelect1.name,movieSelect2.name])
    setReviewData(data);
    loadApiAddRecommendations();
    setMovieSelect1("");
    setMovieSelect2("");
    setSubmissionValidation(true);
    setSubmissionCheck(false);
  }
};

const loadApiAddRecommendations = () => {
  callApiAddRecommendations()
    .then((res) => {
      console.log(res.message);
    })
};



 const callApiAddRecommendations = async () => {
  const url = serverURL + "/api/addMovieRecommendations";

  let reviewInfo = {
    "movieTitle1": movieSelect1.name,
    "movieTitle2": movieSelect2.name 
  };

  console.log(reviewInfo);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewInfo)
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

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
        <Navigation/>
        <br></br>
        <br></br>
        <br></br>
         <Typography variant="h3" gutterBottom component="div">
           recommendations
         </Typography>
         <Typography variant="h6" gutterBottom component="div">
           Users can create recommendations for other users based on what movies they enjoyed watching. Users should input two movies that the user thinks peopleshould watch if they enjoyed one or the other movies that was inputted. For example, I could input Alien and Aliens because I think users who enjoyed either of those movies will like the other.
         </Typography>
 
         <FormControl>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
             <MovieSelection1 movies= {props.movies} handleMovieSelect1={handleMovieSelect1} movieSelect1={movieSelect1} submissionCheck={submissionCheck}/>
             <br></br>
             <br></br>
             <MovieSelection2 movies= {props.movies} handleMovieSelect2={handleMovieSelect2} movieSelect2={movieSelect2} movieSelect1={movieSelect1} submissionCheck={submissionCheck}/>
             <Button variant="contained" color="primary" type ='submit' onClick={handleSubmissionCheck}>Submit</Button>
           </form>
         </FormControl>                               
         {
          submissionValidation == true &&
          <div>
            <br></br>
            <Typography variant="h5">Your recommendation has been received!</Typography>
            <Paper>
              <Typography variant="h6">You reccommend the movie {submissionData[1]} to people who enjoyed watching: {submissionData[0]}  </Typography>
            </Paper>
          </div>

        }        
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

const MovieSelection1 = (props) => {
 
  const handleInput = (event) => {
    props.handleMovieSelect1(event.target.value);
  };
  return (
        <div>
        <InputLabel id="demo-simple-select-filled-label">Movie Recommendation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.movieSelect1}
          label="Movie"
          onChange={handleInput}
          style={{width:400}}
        >
        {props.movies.map((movie) => {
          return (
            <MenuItem key={movie.id} value={movie}>{movie.name}</MenuItem>
          )
        }
        )}
        </Select>
        <FormHelperText>Select a movie</FormHelperText>
        {
            props.movieSelect1 == '' && props.submissionCheck == true ? (
            <div><em style={{color:'red'}}>*Please select a movie. It is a mandatory field!</em></div>) : (<div></div>)
         }
      </div>
  );
}

const MovieSelection2 = (props) => {
 
  const handleInput = (event) => {
    props.handleMovieSelect2(event.target.value);
  };
  return (
        <div>
        <InputLabel id="demo-simple-select-filled-label">Movie Recommendation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.movieSelect2}
          label="Movie"
          onChange={handleInput}
          style={{width:400}}
        >
        {props.movies.map((movie) => {
          return (
            <MenuItem key={movie.id} value={movie}>{movie.name}</MenuItem>
          )
        }
        )}
        </Select>
        <FormHelperText>Select a movie</FormHelperText>
        {
            props.movieSelect2 == '' && props.submissionCheck == true ? (
            <div><em style={{color:'red'}}>*Please select a movie. It is a mandatory field!</em></div>) : (<div></div>)
         }
         {
            props.movieSelect1 == props.movieSelect2 && props.submissionCheck == true ? (
            <div><em style={{color:'red'}}>*You must choose a different movie to reccommend. You cannot recommend the same movie!</em></div>) : (<div></div>)
         }
      </div>
  );
}





 


const Recommendations = () => {
 /**
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
   }
  */ 

  let [userId,setUserID] = React.useState(1);
  let [mode,setMode]=React.useState(0);
  let [movies,setMovies]=React.useState([]);
  




  React.useEffect(() => {
    //loadUserSettings();
    loadGetMovies();
   },[]);


   const loadUserSettings =() => {
    this.callApiLoadUserSettings()
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  const loadGetMovies =() => {
    callGetMovies()
      .then(res => {
        setMovies(res.movieData);
      });
  }
  
   const callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  
  const callGetMovies = async() => {
    
    //console.log('t',url)
    const url = serverURL + "/api/getMovies";
    console.log(url)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
    });
    const body =await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }


    return (
      <div> 
        <Recommendation movies={movies}/> 
      </div>     
    )
  };



Recommendations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Recommendations;

