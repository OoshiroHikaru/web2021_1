const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})
app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})

app.get("/car_maker", (req, res) => { 
let sql = ` 
select car.id, car.name as car_name, maker.name as maker_name 
from car 
inner join maker on car.maker_id = maker.id;
`; 

db.serialize(() => { 
　 db.all(sql, (error, data) => {
　　 if (error) { 
　　　res.render('show', { mes: "エラーです" }); } 
　　　else {
 　　　res.render('select', { data: data});
　　　 }
　　 });
 　});
 }); 

app.get("/stpr_man", (req, res) => { 
let sql = ` 
select STPR.id, STPR.name as stpr_name, man.name as man_name 
from STPR 
inner join man on STPR.stpr_id = man.id; 
`; 

db.serialize(() => { 
　db.all(sql, (error, data) => { 
　　if (error) { 
　　　res.render('show', { mes: "エラーです" }); 
　　} else { 
　　　res.render('select', { data: data }); 
　　}
　　});
　});
});

app.get("/db/:id", (req, res) => {
db.serialize( () => {
db.all("select id, 都道府県, 人口, 大学 from example where id=" + req.params.id + ";", (error, row) => {
if( error ) {
res.render('show', {mes:"エラーです"});
}
res.render('db', {data:row});
})
})
})

app.post("/insert", (req, res) => {
 let sql = `
insert into example (都道府県,人口,大学) values ("` + req.body.name + `",` + req.body.jinko + `,` + req.body.daigaku + `);
`
 console.log(sql);
 db.serialize( () => {
  db.run( sql, (error, row) => {
   console.log(error);
   if(error) {
    res.render('show', {mes:"エラーです"});
   }
   res.redirect('/db');
  });
 });
 console.log(req.body);
});

app.get("/home", (req, res) => {
  const message = "Music fistival";
  res.render('music', {mes:message});
});

app.get("/artist", (req, res) => { 
let sql = ` 
	select music.id,music.name as song_name,artist.name as artist_name

	from music

	inner join artist ON music.artist_id = artist.id;
`; 
console.log(sql);
db.serialize(() => { 
　 db.all(sql, (error, row) => {
　　 if (error) { 
　　 console.log(error);
　　　res.render('music', { mes: "エラーです" }); 
　　} else { 
　　console.log(row);
　　　res.render('artist', { data: row });
　　　}
　　 });
 　});
 }); 


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
