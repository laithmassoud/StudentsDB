show dbs;

use test;

show collections;

db.createCollection("cars");

db.cars.insert({ name:'honda', make: 'accord', year: '2010' });

db.cars.insert({ name:'toyota', make: 'accord', year: '2009' });

db.cars.find();

db.cars.find({});

db.cars.find({name: 'honda'});

db.cars.update({name: 'honda'}, {$set: {name: 'ford'}});

db.cars.update({name: 'toyota'},{$set:{transmission:'automatic'}});

db.cars.remove({name: 'toyota'});

db.cars.update({name: 'ford'}, {$unset: {year:''}});

for(var i=0;i<10;i++){db.things.insert({x : i}); }

show collections;

db.things.find({});

db.createCollection('students');

db.students.insert({
name: 'Joe',
undergrad: true,
units: 9,
classes: ['geography', 'math', 'jornalism']
});

db.students.insert({ name: 'Jane', undergrad: false, units: 12, classes: ['geography', 'science', 'jornalism', 'history'] });

db.students.insert({ name: 'Kevin', undergrad: true, units: 9, classes: ['geography'] });

db.students.insert({ name: 'Rachel', undergrad: false, units: 6, classes: ['geography', 'history'] });

db.students.find().pretty();

db.students.find({units: {$gt:6}}).pretty();

db.students.find({units: {$lt:7}}).pretty();

db.students.find({name: {$ne:'Rachel'}}).pretty();

db.students.find({classes: {$in:['history']}}).pretty();

db.students.update({name:'Stephan'}, {$push:{classes:'music'}});

db.students.find().sort({name: -1}).pretty();

db.students.find().sort({name: 1}).pretty();

db.students.find().sort({name: 1, undergrand: 1}).pretty();

db.students.find().sort({name: 0}).pretty();

db.students.find().sort({name: -1}).limit(2).pretty();

db.students.update({name:'Kevin'}, {$set:{name:'Stephan'}});

db.students.update({name:'Kevin'}, {$set:{name:'Micky'}},{upsert: true});

-------------------

Task:

use medialib;

db.createCollection('mediaitem');

db.mediaitem.insert([
                     {title: 'space', type: 'movie'},
										 {title: 'earth', type: 'movie'},
                     {title: 'air', type:'movie'},
                     {title: 'hello', type: 'song'},
                     {title: 'hi', type: 'song'},
                     {title: 'hey', type: 'song'}
                		]);

function doit(){
  db.mediaitem.find().forEach(
    function(i) {
    	print( "title: " + i.title + " -  type: " + i.type );
    }
  );
}

doit();

-------------------------

db.things.droup();

db.things.find({$or: [{x:2},{x:4}] });

db.things.find({x: {$gt: 6}});

db.things.find({$or: [{x:2},{x: {$gt: 6}}]});

db.things.find({$and: [{x: {$gt: 5}},{x: {$lt:9}}]});

db.things.find({$or: [{$and: [{x: {$gt: 0}},{x: {$lt:5}}]},{$and: [{x: {$gt: 15}},{x: {$lt:20}}]}]});

db.things.findOne();

db.things.find().forEach (function(e) {print("X is : "+ e.x)});

db.things.find({x: {$gt: 10}}).forEach (function(e) {print("X is : "+ e.x)});

db.things.find({x: {$gt: 10}}).forEach (function(e) {db.otherThings.insert(e)});

db.things.find({"x" : {$mod : [2,0]}}).forEach (function(e) {db.evenNumbers.insert(e)});


----------------------------------
db.students.insert([
... {name: 'mark', age: 31, subjects: ['math','journalism','programming'], gender: 'male'},
... {name: 'sandra', age: 28, subjects: ['sport','german','english'], gender: 'female'},
... {name: 'paul', age: 20, subjects: ['history','english','math'], gender: 'male'},
... {name: 'stefan', age: 22, subjects: ['arabic','english','history'], gender: 'male'},
... {name: 'katja', age: 29, subjects: ['history','german','arabic'], gender: 'female'},
... {name: 'julia', age: 25, subjects: ['german','sport','math'], gender: 'female'}
... ]);

// Task :
1. db.students.find({$or: [{name: 'sandra'},{name: 'katja'}]});
2. db.students.find({$or: [{name: 'sandra'},{age: {$gt: 25}}]});
3. db.students.find({subjects: {$in: ['arabic'] }});
4. db.students.find({$and: [{subjects: 'history'},{$and: [{age: {$gt: 25}},{age: {$lt: 30}}]}]});
5. db.students.find( {$and: [ { subjects: { $not: { $in: ["sport"] } } }, { subjects: { $in : ["math"] }} ] } ); // db.students.find( {$and: [ { subjects: { $nin: ["sport"] } }, { subjects: { $in : ["math"] }} ] } );

----------------------------------

// aggrigation //

db.students.aggregate([{$group: {_id: "$gender"}}]);

db.students.aggregate([{$group: {_id: "$gender", result: {$sum: 1}}}]);

db.students.aggregate([{$group: {_id: "$gender", result: {$max: "$age"}}}]);

// task : 1. find the average age per gender
          2. find the average age in total
          
1. db.students.aggregate([{$group: {_id: "$gender", result: {$avg: "$age"}}}]);
2. db.students.aggregate([{$group: {_id: '', result: {$avg: "$age"}}}]);

/////////////////////////////////////////////////////////////////////////////////
for(var i=0;i<20;i++){db.things.insert({x:i})}

db.things.find({ $or: [{x:2},{x:4}]});

db.things.find({ x: {$gt: 10}});

{
task: find alll things were x equals c equals 2 or x > 6
	db.things.find({ $and: [{x: {$gt: 15}}, {x: {$lt: 20}}] });
}

{
task: show all things that are btween 0 and 5 OR btween 15 and 20;
db.things.find({$or: [{$and: [{x: {$gt: 0}},{x: {$lt:5}}]},{$and: [{x: {$gt: 15}},{x: {$lt:20}}]}]});
}

db.things.find().forEach(function(e){print("x is: " + e.x);});

{
db.createCollection("otherThings");
db.things.find({x: {$gt: 10}}).forEach(function(e){db.otherThings.insert(e);});
db.otherThings.find();
}

{
task: first google the MongoDB $mod operator. Then, ceate a new collection "evenNumbers".
THEN copy all documents from the "things" collection to the evenNumbers collection
Where x is divisible by 2.
db.things.find({ "x" : { "$mod" : [ 2, 0 ] }.forEach(function(e){db.evenNumbers.insert(e)}));
(
db.things.find({x: {$gt: 0}}).forEach(function(e){db.evenNumbers.insert(e);});
db.evenNumbers.find( { x: { $mod: [ 2, 0 ] } } );
)
}

{(
db.students.insert([{name: 'mark', age:12, subjects:['math', 'journalism', 'programming'], gender: 'male'},{name: 'sandra', age:20, subjects:['soprt', 'german', 'en'], gender: 'female'},{name: 'paul', age:28, subjects:['history', 'en', 'math'], gender: 'male'},{name: 'stefan', age:22, subjects:['arabic', 'en', 'math'], gender: 'male'},{name: 'katia', age:29, subjects:['history', 'german', 'arabic'], gender: 'female'},{name: 'julia', age:25, subjects:['german', 'sport', 'math'], gender: 'female'}]);

task:
1. show all students whose names is sandra or katia
db.students.find({$or: [{name: 'sandra'},{name: 'katia'}]});

2. name is sandra or age > 25
db.students.find({$or: [{name: 'sandra'},{$and: [{age:25}]}]});
db.students.find({$or: [{name: 'sandra'},{age: {$get:25}}]})

3. all students who are enrolled in arabic
db.students.find({subjects: "arabic"});
db.students.find({subjects: {$in: ['arabic', 'german']}});
db.students.find({subjects: {$in: ['arabic', 'en']}});

4. all students who are between 25 and 30 and are enrolled in history
db.students.find({$and: [{subjects: 'history'},{$and: [{age: {$gt: 25}},{age: {$lt: 30}}]}]});

5. all students who are enrolled in math and not in sport
db.students.find({$and:[{subjects:{$not:{$in:["sport"]}}},{subjects:"math"}]});
db.students.find({$and:[{subjects: {$in:['math']}},{subjects: {$nin:['sport']}}]});

)};

{{{
db.students.aggregate([{$group: {_id: "$gender"}}]);
db.students.aggregate([{$group: {_id: "$gender", result: {$sum: 1}}}]);
db.students.aggregate([{$group: {_id: "$gender", result: {$max: "$age"}}}]);
db.students.aggregate([{$group: {_id: "$gender", result: {$min: "$age"}}}]);

task: 
1. find the average age per gender.
db.students.aggregate([{$group: {_id: "$gender", result: {$avg: "$age"}}}]);
2. find the average age in total.
db.students.aggregate([{$group: {_id: null, result: {$avg: "$age"}}}]);
db.students.aggregate([{$group: {_id: "", result: {$avg: "$age"}}}]);

}}}
//////
db.createCollection('foos');
db.foos.insert({x:1});
db.foos.insert({x:2,y:{z:1}});
db.foos.find();
db.foos.find().pretty;
db.foos.find({x:1});
db.foos.insert({x:3,y:{z:1,b:5}});
db.foos.insert({y:{z:1}});
db.foos.find();
db.foos.find().pretty();
db.foos.find().pretty();
db.foos.find({y:{z:1}});
db.foos.find({"y.z":1});
db.foos.find({y:{z:1}});
/////////////////////////////////////////////////////////


