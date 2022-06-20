import React, { Component } from 'react';
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
const serverURL = "https://ov-research-4.uwaterloo.ca:3046"; //enable for dev mode
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

const Review = () => {
 
 const [movieSelect, setMovieSelect] = React.useState('');
 const [reviewTitle, setReviewTitle] = React.useState('');
 const [reviewBody, setReviewBody] = React.useState('');
 const [movieRating, setRating] = React.useState('');
 const [submissionCheck,setSubmissionCheck] = React.useState(false);
 const [submissionData,setSubmissionData] = React.useState([]);
 

 const handleMovieSelect = (movie) => {
   setMovieSelect(movie);
 }
 
 const handleMovieRating = (rating) => {
   setRating(rating);
 }

 const handleReviewTitle = (title) => {
  setReviewTitle(title);
}

const handleReviewBody = (body) => {
  setReviewBody(body);
}

 const handleSubmission = (event) => {
  setSubmissionData([movieSelect,reviewTitle,reviewBody,movieRating]);
  event.preventDefault();
  setSubmissionCheck(true); 
  setMovieSelect('');
  setRating('');
  setReviewBody('');
  setReviewTitle('');
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
 
         <FormControl onSubmit={handleSubmission}>
           <form autoComplete='off'>
             <MovieSelection handleMovieSelect={handleMovieSelect} movieSelect={movieSelect}/>
             <ReviewTitle handleReviewTitle={handleReviewTitle} reviewTitle={reviewTitle}/>
             <br></br>
             <br></br>
             <br></br>
             <ReviewBody handleReviewBody = {handleReviewBody} reviewBody = {reviewBody}/>
             <br></br>
             <ReviewRating handleMovieRating = {handleMovieRating} movieRating = {movieRating}/>
             <br></br>
             <br></br>
             <Button variant="contained" color="primary" type="submit">Submit</Button>
           </form>
         </FormControl>
         {
          submissionCheck == true &&
          <div>
            <br></br>
            <Typography variant="h5">Your review has been received!</Typography>
            <Paper>
              <Typography variant="h6">Movie Name: {submissionData[0]} </Typography>
              <Typography variant="h6">Review Title: {submissionData[1]}</Typography>
              <Typography variant="h6">Movie Rating: {submissionData[3]} Stars</Typography>
              <Typography variant="h7">Movie Review: {submissionData[2]} </Typography>
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
          required
          value={props.movieSelect}
          label="Movie"
          onChange={handleInput}
          style={{width:400}}
        >
          <MenuItem value={'Footloose'}>Footloose</MenuItem>
          <MenuItem value={'The Karate Kid'}>The Karate Kid</MenuItem>
          <MenuItem value={'The Notebook'}>The Notebook</MenuItem>
          <MenuItem value={'Forrest Gump'}>Forrest Gump</MenuItem>
          <MenuItem value={'Top Gun'}>Top Gun</MenuItem>
        </Select>
        <FormHelperText>Select a Movie to Review</FormHelperText>
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
         required
         label="Review Title"
         style={{ width: 300 }}
         value={props.reviewTitle}
         onChange = {handleInput}
         helperText="Enter Review Title"
       />
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
        required
        style={{ width: 600 }}
        rows={5}
        defaultValue="Enter review for movie"
        variant="outlined"
        helperText="Enter Movie Review"
        value={props.reviewBody}
        onChange = {handleInput}
      />
    </div>
  );
}
 
const ReviewRating = (props) => {
 
 const handleInput = (event) => {
   props.handleMovieRating(event.target.value);
 };
 
 return (
   <FormControl component="fieldset">
     <FormLabel component="legend">Movie Rating</FormLabel >
     <RadioGroup aria-label="gender" name="gender1" value={props.movieRating} onChange={handleInput} row>
       <FormControlLabel value="1" control={<Radio required={true} />} label="1" />
       <FormControlLabel value="2" control={<Radio required={true} />} label="2" />
       <FormControlLabel value="3" control={<Radio required={true} />} label="3" />
       <FormControlLabel value="4" control={<Radio required={true} />} label="4" />
       <FormControlLabel value="5" control={<Radio required={true} />} label="5" />
     </RadioGroup>
   </FormControl>
 );
}

export default Review;