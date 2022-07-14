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

//Dev mode
//const serverURL = "";
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";
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
 const [reviewTitle, setReviewTitle] = React.useState('');
 const [reviewBody, setReviewBody] = React.useState('');
 const [movieRating, setRating] = React.useState('');
 const [submissionCheck,setSubmissionCheck] = React.useState(false);
 const [submissionValidation,setSubmissionValidation] = React.useState(false);
 const [submissionData,setSubmissionData] = React.useState([]);
 const [userID,setUserID]=React.useState(1);
 let [reviewData,setReviewData] = React.useState({});
 

 const handleMovieSelect = (movie) => {
   setMovieSelect(movie);
   console.log(movie.name);
 };
 
 const handleMovieRating = (rating) => {
   setRating(rating);
 };

 const handleReviewTitle = (title) => {
  setReviewTitle(title);
};

const handleReviewBody = (body) => {
  setReviewBody(body);
};

const handleSubmissionCheck = (event) =>{
  setSubmissionCheck(true);
}
const handleSubmissionValidation = (event) => {
  event.preventDefault();
  if(movieSelect != '' && reviewTitle != '' && reviewBody != '' && movieRating !=''){
    let data = {
      movieName: movieSelect.name,
      reviewTitle: reviewTitle,
      reviewContent: reviewBody,
      reviewScore: movieRating,
      userID: 1,
      movieID: movieSelect.id
    }
    setSubmissionData([movieSelect.name,reviewTitle,movieRating,reviewBody,movieSelect.id])
    setReviewData(data);
    loadApiAddReview();
    setMovieSelect("");
    setReviewTitle("");
    setReviewBody("");
    setRating("");
    setSubmissionValidation(true);
    setSubmissionCheck(false);
  }
};

const loadApiAddReview = () => {
  callApiAddReview()
    .then((res) => {
      console.log(res.message);
    })
};



 const callApiAddReview = async () => {
  const url = serverURL + "/api/addReview";

  let reviewInfo = {
    "reviewTitle": reviewTitle,
    "reviewContent": reviewBody,
    "reviewScore":movieRating,
    "movieID":movieSelect.id,
    "userID": userID
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
         <Typography variant="h3" gutterBottom component="div">
           Movie Review
         </Typography>
 
         <FormControl>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
             <MovieSelection movies= {props.movies} handleMovieSelect={handleMovieSelect} movieSelect={movieSelect} submissionCheck={submissionCheck}/>
             <ReviewTitle handleReviewTitle={handleReviewTitle} reviewTitle={reviewTitle} submissionCheck={submissionCheck}/>
             <br></br>
             <br></br>
             <ReviewBody handleReviewBody = {handleReviewBody} reviewBody = {reviewBody} submissionCheck={submissionCheck}/>
             <br></br>
             <ReviewRating handleMovieRating = {handleMovieRating} movieRating = {movieRating} submissionCheck={submissionCheck}/>
             <br></br>
             <br></br>
             <Button variant="contained" color="primary" type ='submit' onClick={handleSubmissionCheck}>Submit</Button>
           </form>
         </FormControl>                               
         {
          submissionValidation == true &&
          <div>
            <br></br>
            <Typography variant="h5">Your review has been received!</Typography>
            <Paper>
              <Typography variant="h6">Movie Name: {submissionData[0]} </Typography>
              <Typography variant="h6">Review Title: {submissionData[1]}</Typography>
              <Typography variant="h6">Movie Rating: {submissionData[2]} Stars</Typography>
              <Typography variant="h7">Movie Review: {submissionData[3]} </Typography>
            </Paper>
          </div>

        }        
       </MainGridContainer>
     </Box>
   </ThemeProvider>
 );

}

const MovieSelection = (props) => {
 
  const handleInput = (event) => {
    props.handleMovieSelect(event.target.value);
  };
  return (
        <div>
        <InputLabel id="demo-simple-select-label">Movie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.movieSelect}
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
            props.movieSelect == '' && props.submissionCheck == true ? (
            <div><em style={{color:'red'}}>*Please select a movie. It is a mandatory field!</em></div>) : (<div></div>)
         }
      </div>
  );
}


const ReviewTitle = (props) => {
 
 const handleInput = (event) => {
   props.handleReviewTitle(event.target.value);
 };
 
 return (

    <div>
      <TextField
        id="review-title" 
         label="Review Title"
         style={{ width: 300 }}
         value={props.reviewTitle}
         onChange = {handleInput}
         helperText="Enter Review Title"
       />
       {
         props.reviewTitle == '' && props.submissionCheck == true ? (
          <div><em style={{color:'red'}}>*Please enter your review title. It is a mandatory field.</em></div>) : (<div></div>)
      }
    </div>
);
}

const ReviewBody = (props) => {
 
 const handleInput = (event) => {
   props.handleReviewBody(event.target.value);
 };
 
  return (
    <div>
    <TextField
        id="outlined-multiline-flexible"
        label="Movie Review"
        multiline
        style={{ width: 600 }}
        rows={5}
        defaultValue="Enter review for movie"
        variant="outlined"
        helperText="Enter Movie Review"
        value={props.reviewBody}
        onChange = {handleInput}
      />
      {
        props.reviewBody == '' && props.submissionCheck == true ? (
          <div><em style={{color:'red'}}>*Please enter your review. It is a mandatory field!</em></div>) : (<div></div>)
       }
    </div>
  );
}
 
const ReviewRating = (props) => {
 
 const handleInput = (event) => {
   props.handleMovieRating(event.target.value);
 };
 
 return (
   <FormControl component="fieldset">
     <FormLabel component="legend">Movie Rating </FormLabel >
     <RadioGroup aria-label="gender" name="gender1" value={props.movieRating} onChange={handleInput} row>
       <FormControlLabel value="1" control={<Radio  />} label="1" />
       <FormControlLabel value="2" control={<Radio  />} label="2" />
       <FormControlLabel value="3" control={<Radio  />} label="3" />
       <FormControlLabel value="4" control={<Radio  />} label="4" />
       <FormControlLabel value="5" control={<Radio  />} label="5" />
     </RadioGroup>
     <FormHelperText>Choose a rating!</FormHelperText>
     {
    props.movieRating == '' && props.submissionCheck == true ? (
      <span><em style={{color:'red'}}>*Please select the rating. It is a mandatory field!</em></span>) : (<div></div>)
   }
   </FormControl>
 );
}

const Home = () => {
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



Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
