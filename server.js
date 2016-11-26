var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');


var apps= express();
apps.use(bp.json());

apps.use(express.static('public'));

var tasks = [{
				desciption: 'Watch Movie',
				completed: 'true'
			},
			{
				desciption: 'Meet zampya',
				completed: 'true'
			},
			{
				desciption: 'Eat sizzlers',
				completed: 'false'
			}
			];
var id =1;

apps.get('/gettasks',function(req,res){
	res.json(tasks);

});

apps.get('/todos/:id',function(req,res){
	var todoId=parseInt(req.params.id,10);
	
	var matched = _.findWhere(tasks,{id:todoId});

if(matched)
res.json(matched);
else{
res.status(404).send();
}
});  






apps.delete('/deletedata/:id',function(req,res){
	var todoId=parseInt(req.params.id,10);
	
	var matched = _.findWhere(tasks,{id:todoId});

if(!matched)
res.status(404).send();
else{
tasks=_.without(tasks,{id:matched});
res.json(matched);
}
});



apps.post('/posttasks',function(req,res){

	var data = req.body;
	data.id = id++;
tasks.push(data);
res.json(data);

});



apps.listen(4000,function(){

console.log('App is running on port 4000');
});
