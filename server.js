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
 
    let movie = req.body.movieSelect;
    let actor = req.body.actorInfo;
    let director = req.body.directorInfo;


 
    let sql = ""
    let data = [];
 
    if (movie !== '' && actor === '' && director === '') {
        sql = 'Select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R where M.name = '+'?'+' and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id;';
        console.log(sql);
        data = [movie]
    } else if (actor !== '' && movie === '' && director === ''){
        sql = 'select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R, roles RS, actors A where concat(A.first_name, " ", A.last_name) = '+'?'+' and A.id = RS.actor_id and RS.movie_id = M.id and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id;'
        console.log(sql);
        data = [actor];
    } else if (director !== '' && movie === '' && actor === '') {
        sql = 'select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R where concat(D.first_name, " ", D.last_name) = '+'?'+' and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id;'
        console.log(sql);
        data = [director];
    } else if (actor !== '' && movie === '' && director !== '') {
        sql = 'select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R, roles RS, actors A where concat(D.first_name, " ", D.last_name) = '+'?'+' and concat(A.first_name, " ", A.last_name) = '+'?'+' and A.id = RS.actor_id and RS.movie_id = M.id and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id;'
        console.log(sql);
        data = [director, actor];
    }else if (actor === '' && movie !== '' && director !== '') {
        sql = 'select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R, roles RS, actors A where concat(D.first_name, " ", D.last_name) = '+'?'+' and A.id = RS.actor_id and RS.movie_id = M.id and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id and M.name = '+'?'+';'
        console.log(sql);
        data = [director, movie];
    }else if (actor !== '' && movie !== '' && director === '') {
        sql = 'select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R, roles RS, actors A where  concat(A.first_name, " ", A.last_name) = '+'?'+' and A.id = RS.actor_id and RS.movie_id = M.id and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id and M.name = '+'?'+';'
        console.log(sql);
        data = [actor,movie];
    }else if (actor !== '' && movie !== '' && director !== '') {
        sql = 'select concat(D.first_name, " ", D.last_name) as dirName, AVG(R.reviewScore), R.reviewContent as review, M.name as movieName from movies M, directors D, movies_directors MD, Review R, roles RS, actors A where concat(D.first_name, " ", D.last_name) = '+'?'+' and concat(A.first_name, " ", A.last_name) = '+'?'+' and A.id = RS.actor_id and RS.movie_id = M.id and M.id = MD.movie_id and D.id = MD.director_id and R.movieID = M.id and R.movieID = MD.movie_id and M.name = '+'?'+';'
        console.log(sql);
        data = [director, actor, movie];
    }

	console.log(data);
   
    connection.query(sql, data, (error, data) => {
        if (error) {
            return res.json({ status : "ERROR", error});
        }
 
        let string = JSON.stringify(data);
        let object = JSON.parse(string);
        console.log(object);
        res.send({data: object})
 
    });
    connection.end();
});

 



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
