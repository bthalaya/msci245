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
	let sql =''

	if(movie !== '' && director === '' && actor === ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M, directors D, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and M.name = '+'?'+'';
		data = [movie];
	}else if(director !== '' && movie === '' && actor === ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M, directors D, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and concat(D.first_name, " ", D.last_name) = '+'?'+'';
		data = [director]
	}else if(director === '' && movie === '' && actor !== ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M, directors D,actors A, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and concat(A.first_name, " ", A.last_name) = '+'?'+'';
		data = [actor]
	}else if(director !== '' && movie === '' && actor !== ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M,actors A, directors D, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and concat(A.first_name, " ", A.last_name) = '+'?'+' and concat(D.first_name, " ", D.last_name) = '+'?'+'';
		data = [actor,director]
	}else if(director !== '' && movie !== '' && actor === ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M, directors D,actors A, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and concat(D.first_name, " ", D.last_name) = '+'?'+' and M.name = '+'?'+'';
		data = [director,movie]
	}else if(director === '' && movie !== '' && actor !== ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M, directors D,actors A, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and concat(A.first_name, " ", A.last_name) = '+'?'+' and M.name = '+'?'+'';
		data = [actor,movie]
	}else if(director !== '' && movie !== '' && actor !== ''){
		sql ='SELECT concat(D.first_name, " ", D.last_name) as dirName, R.reviewScore, R.reviewContent as review, M.name as movieName FROM movies M, directors D,actors A, movies_directors MD, Review R WHERE M.id = MD.movie_id AND D.id = MD.director_id AND R.movieID = M.id AND R.movieID = MD.movie_id and concat(A.first_name, " ", A.last_name) = '+'?'+' and M.name = '+'?'+' and concat(D.first_name, " ", D.last_name) = '+'?'+'';
		data = [actor,movie, director]
	}

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



 



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
