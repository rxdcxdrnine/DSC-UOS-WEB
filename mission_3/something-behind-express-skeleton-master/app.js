// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   app.js                                             :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: hyechoi <hyechoi@student.42seoul.kr>       +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2020/11/10 15:30:36 by hyechoi           #+#    #+#             //
//   Updated: 2020/11/10 16:01:31 by hyechoi          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

/*
**	fs module
**	http://nodejs.org/api/fs.html
**	file system.
*/
const fs = require('fs');
var dbFile = 'db.json';
var dbDataBuffer = fs.readFileSync(dbFile);
var dbJSON = dbDataBuffer.toString();
var data = JSON.parse(dbJSON);

function dbSync() {
	fs.writeFileSync(dbFile, dbJSON);
}

const express = require('express');
const { resolveTxt } = require('dns');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
	console.log('GET\t/');
	res.send('HELLo World!');
});

/*
**	GET /todos/
*/

app.get('/todos/', (req, res) => {
	console.log('GET\t/todos/');
	res.json(dbJSON);
});

/*
** POST /todos/
*/

app.post('/todos/', (req, res) => {
	console.log('POST\t/todos/');
	var data = JSON.parse(dbJSON);

	if(Object.keys(req.body) != "content"){
		res.send("RequestBodyError");
	}
	else{
		var len = data["todos"].length;
		var new_data = {
			"id" : len + 1,
			"content" : req.body["content"],
			"complete" : false
		}
	
		data["todos"][len + 1] = new_data;
		fs.writeFileSync(dbFile, JSON.stringify(data));
	
		var ret = {
			"success" : true,
			"todos" : data["todos"][len + 1]
		}
		res.send(ret);
	}
});

/*
**	PATCH /todos/:todo_id
*/

app.patch('/todos/:todo_id', (req, res) => {
	console.log('PATCH\t/todos/');
	var data = JSON.parse(dbJSON);
	var keys = Object.keys(req.body);

	for(var i = 0; i < data["todos"].length; i++){
		if(data["todos"][i]["id"] == req.params.todo_id){

			for(key of keys){
				data["todos"][i][key] = req.body[key];
			}
			break;
		}
	}

	fs.writeFileSync(dbFile, JSON.stringify(data));
	var ret = {
		"success" : true,
		"todos" : data["todos"][i]
	}
	res.send(ret);
});

/*
**	DELETE /todos/:todo_id
*/

app.delete('/todos/:todo_id', (req, res) => {
	console.log('DELETE\t/todos/');
	var data = JSON.parse(dbJSON);

	for(var i = 0; i < data["todos"].length; i++){
		if(data["todos"][i]["id"] == req.params.todo_id){
			data["todos"].splice(i, 1);
		}
	}

	fs.writeFileSync(dbFile, JSON.stringify(data));
	var ret = {
		"success" : true
	}
	res.send(ret);
});


app.listen(PORT, () => {
	console.log('Something behind... you have to implement this...!');
	console.log(`Server is running and listening on port ${PORT}!`);
});
