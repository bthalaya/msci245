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

const Review = (props) => {
 
 const [movieSelect, setMovieSelect] = React.useState('');
 const [actorInfo, setActorInfo] = React.useState('');
 const [directorInfo, setDirectorInfo] = React.useState('');
 const [submissionValidation,setSubmissionValidation] = React.useState(false);
 let [searchData,setSearchData] = React.useState([]);
 let [searchAnswer,setSearchAnswer] = React.useState({});
 

 const handleMovieSelect = (movie) => {
   setMovieSelect(movie);
   console.log(movie);
 };
 
 const handleActorInfo = (actorName) => {
  setActorInfo(actorName);
};

const handleDirectorInfo = (directorName) => {
    setDirectorInfo(directorName);
  };

const handleSubmissionValidation = (event) => {
  event.preventDefault();
  if(movieSelect != '' || actorInfo != '' || directorInfo !=''){
    let data = {
      movieName: movieSelect,
      actorName: actorInfo,
      directorName: directorInfo
    }
    setSearchData(data);
    loadApiSearchMovies();
    setMovieSelect("");
    setActorInfo("");
    setDirectorInfo("");
    setSubmissionValidation(true);
  }
};

const loadApiSearchMovies = () => {
  callApiSearchMovies()
    .then((res) => {
      setSearchAnswer(res.data);
    })
};



 const callApiSearchMovies = async () => {
  const url = serverURL + "/api/searchMovies";

  let searchInfo = {
    "movie": movieSelect,
    "actorInfo": actorInfo,
    "directorInfo":directorInfo,
  };

  console.log(searchInfo);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(searchInfo)
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
           Search
         </Typography>
 
         <FormControl>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
             <MovieSelection movies= {props.movies} handleMovieSelect={handleMovieSelect} movieSelect={movieSelect} />
             <ActorField handleActorInfo={handleActorInfo} actorInfo={actorInfo}/>
             <br></br>
             <br></br>
             <DirectorField handleDirectorInfo={handleDirectorInfo} directorInfo={directorInfo}/>
             <br></br>
             <br></br>
             <Button variant="contained" color="primary" type ='submit'>Submit</Button>
           </form>
         </FormControl>
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

const MovieSelection = (props) => {
 
  const handleInput = (event) => {
    props.handleMovieSelect(event.target.value);
  };
    return (

      <div>
        <TextField
          id="movie-title" 
           label="Movie name"
           style={{ width: 450 }}
           value={props.movieSelect}
           onChange = {handleInput}
           helperText="Enter movie name"
         />
      </div>
  );
}


const ActorField = (props) => {
 
 const handleInput = (event) => {
   props.handleActorInfo(event.target.value);
 };
 
 return (

    <div>
      <TextField
        id="actor-name" 
         label="Actor's name"
         style={{ width: 300 }}
         value={props.actorInfo}
         onChange = {handleInput}
         helperText="Enter actor's first and last name"
       />
    </div>
);
}

const DirectorField = (props) => {
 
    const handleInput = (event) => {
      props.handleDirectorInfo(event.target.value);
    };
    
    return (
   
       <div>
         <TextField
           id="director-name" 
            label="Director's name"
            style={{ width: 300 }}
            value={props.DirectorInfo}
            onChange = {handleInput}
            helperText="Enter director's first and last name"
          />
       </div>
   );
   }


 

const Search = () => {
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
        <Review movies={movies}/> 
      </div>     
    )
  };



Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Search;