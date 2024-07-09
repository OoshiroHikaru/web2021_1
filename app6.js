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

// ホームページ
app.get("/home", (req, res) => {
  const message = "Music festival";
  res.render('music', { mes: message });
});

// アーティスト一覧
app.get("/artist", (req, res) => {
  const sql = `SELECT id, name AS artist_name FROM artist;`;

  console.log(sql);

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log("Database error: ", error);
        res.render('music', { mes: "エラーです" });
      } else {
        console.log("Query result: ", rows);
        res.render('artist', { data: rows });
      }
    });
  });
});

// アーティストのページ
app.get("/artist/:id", (req, res) => {
  const artistId = req.params.id;
  let artistName = "";

  // ここでは、データベースからアーティスト名を取得する処理になる
  // 例として、ハードコーディングした処理は避けるべき
  // データベースからのクエリを行う例を示す
  const sql = `SELECT name FROM artist WHERE id = ?;`;

  db.get(sql, [artistId], (error, row) => {
    if (error) {
      console.error("Database error: ", error);
      res.render('music', { mes: "エラーです" });
    } else {
      if (row) {
        artistName = row.name;
        res.render('Vaundy', { artistName });
      } else {
        res.status(404).send('アーティストが見つかりません');
      }
    }
  });
});

// 曲一覧
app.get("/song", (req, res) => {
  console.log("/song");

  const sql = `
    SELECT id, name AS song_name
    FROM music;
  `;

  console.log(sql);

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error);
        res.render('music', { mes: "エラーです" });
      } else {
        console.log(rows);
        res.render('song', { data: rows });
      }
    });
  });
});

// アーティストと曲の一覧
app.get("/artist_song", (req, res) => {
  const sql = `
    SELECT music.id, music.name AS song_name, artist.name AS artist_name
    FROM music
    INNER JOIN artist ON music.artist_id = artist.id;
  `;

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        res.render('music', { mes: "エラーです" });
      } else {
        res.render('artist_song', { data: rows });
      }
    });
  });
});

// 特定のアーティストの曲一覧
app.get("/song/:id", (req, res) => {
  console.log("/song/:id");
  const artistId = req.params.id;

  db.serialize(() => {
    db.all("SELECT * FROM music WHERE artist_id = ?", [artistId], (error, rows) => {
      if (error) {
        console.error(error);
        return res.render('music', { mes: "エラーです" });
      }

      res.render('song', { data: rows });
    });
  });
});

// 404エラーハンドリング
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

