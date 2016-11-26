var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');

var mongoclient = require('mongodb').MongoClient;


var apps= express();
apps.use(bp.json());

var db;
mongoclient.connect('mongodb://admin:admin@ds111178.mlab.com:11178/apadb',(err
	,database) => {
	if(err) return console.log(err);
	db=database
	});
	
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






apps.delete('/deletedata',function(req,res){
    db.collection('usertable').findOneAndDelete({description:req.body.description},(err,result) => {
        if(err) return console.log(err)
        console.log('record deleted');
})

});


apps.put('/updatedata',function(req,res){
    db.collection('usertable').findOneAndUpdate({description:req.body.description}, {
        $set: {
            description: req.body.description,
            completed: req.body.completed
        }
    }, {
        sort:{_id:-1},
        upsert : true
    },(err,result)=>{

        if(err) return    res.send(err)
        res.send(result);
})

});


apps.post('/addmydata',function(req,res){

    db.collection('usertable').save(req.body,(err,result) => {
        if(err) return console.log(err)
            console.log('saved to db');
    })
});
/*
	var data = req.body;
	data.id = id++;
tasks.push(data);
res.json(data);
*/







apps.listen(4000,function(){

console.log('App is running on port 4000');
});
