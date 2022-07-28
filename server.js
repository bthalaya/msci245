let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const { Console } = require('console');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));



app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);

	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM movies'
	console.log(sql);
	let data = []

	connection.query(sql, data, (error,data) => {
		if (error) {
			return res.json({ status : "ERROR", error});
		}
		let string = JSON.stringify(data);
		let obj = JSON.parse(string);
		res.send({ movieData: obj });
	});
	connection.end();
});


app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);

	reviewTitle = req.body.reviewTitle,
	reviewContent = req.body.reviewContent, 
	reviewScore = req.body.reviewScore, 
	movieID = req.body.movieID,
	userID=req.body.userID
	
	  
	let sql = "INSERT INTO `Review` (userID,movieID,reviewTitle,reviewContent,reviewScore) VALUES (?,?,?,?,?)";
	let data=[userID,movieID,reviewTitle,reviewContent,reviewScore];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({message: "Review successfully added"});
	 });
	 connection.end();
 });

 app.post('/api/searchMovies', (req, res) => {

	let connection = mysql.createConnection(config);
 
    movie = req.body.movie,
    actor = req.body.actorInfo
    director = req.body.directorInfo

	let data=[]

	let sql ='Select concat(D.first_name, " ", D.last_name) as name, R.reviewScore, R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R where M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id;';

	if(movie !== ''){
		sql += ` AND M.name = ?`
		data.push(movie)
	}
	if(director !== ''){
		sql += ` AND concat(D.first_name, " ", D.last_name) = ?`
		data.push(director)
	}
	if(actor !== ''){
		sql +=  ` AND concat(A.first_name, " ", A.last_name) = ?`
		data.push(actor)
	}

	console.log(data)
    connection.query(sql,data, (error, data) => {
        if (error) {
            return res.json({ status : "ERROR", error});
        }
 
        let string = JSON.stringify(data);
        //let object = JSON.parse(string);
        //console.log(object);
        res.send({data: string})
 
    });
    connection.end();
});

app.post('/api/addMovieRecommendations', (req, res) => {

	let connection = mysql.createConnection(config);

	movieTitle1 = req.body.movieTitle1,
	movieTitle2=req.body.movieTitle2
	
	  
	let sql = "INSERT INTO `Recommendations` (movieTitle1,movieTitle2) VALUES (?,?)";
	let data=[movieTitle1,movieTitle2];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({message: "Recommendation successfully added"});
	 });
	 connection.end();
 });



 



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
