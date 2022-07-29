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
	let sql ='SELECT Movie.name, Movie.dirName, Movie.id, Movie.reviewContent, R.avg FROM (SELECT m.id, m.name, m.dirName, R.reviewContent FROM (SELECT DISTINCT m.id, m.name,concat(d.first_name, " ", d.last_name) AS dirName FROM movies m, directors d, actors a, movies_directors md, roles r WHERE m.id = md.movie_id AND d.id=md.director_id AND a.id=r.actor_id AND m.id=r.movie_id';



	if(movie !== '' && director === '' && actor === ''){
		sql +=' AND m.name = '+'?'+'';
		data = [movie];
	}else if(director !== '' && movie === '' && actor === ''){
		sql +=' AND concat(d.first_name, " ", d.last_name) = '+'?'+'';
		data = [director]
	}else if(director === '' && movie === '' && actor !== ''){
		sql +=' AND concat(a.first_name, " ", a.last_name) = '+'?'+'';
		data = [actor]
	}else if(director !== '' && movie === '' && actor !== ''){
		sql +=' AND concat(a.first_name, " ", a.last_name) = '+'?'+' AND concat(d.first_name, " ", d.last_name) = '+'?'+'';
		data = [actor,director]
	}else if(director !== '' && movie !== '' && actor === ''){
		sql +=' AND concat(d.first_name, " ", d.last_name) = '+'?'+' AND m.name = '+'?'+'';
		data = [director,movie]
	}else if(director === '' && movie !== '' && actor !== ''){
		sql +=' AND concat(a.first_name, " ", a.last_name) = '+'?'+' AND .name = '+'?'+'';
		data = [actor,movie]
	}else if(director !== '' && movie !== '' && actor !== ''){
		sql +=' AND concat(a.first_name, " ", a.last_name) = '+'?'+' AND m.name = '+'?'+' AND concat(d.first_name, " ", d.last_name) = '+'?'+'';
		data = [actor,movie, director]
	}

	sql = sql + ') AS m LEFT OUTER JOIN Review R on R.movieID = m.id) AS Movie LEFT OUTER JOIN (SELECT movies.id AS ids, AVG(reviewScore) AS avg FROM Review, movies WHERE Review.movieID = movies.id GROUP BY movies.id) AS R on R.ids = Movie.id;'
	console.log(data)
	console.log(sql)
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



 



//app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
