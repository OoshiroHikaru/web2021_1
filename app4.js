const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/app/janken", (req, res) => {
  res.render('janken', { mes: "じゃんけんの手を選んでください。" });
});

app.post("/app/janken", (req, res) => {
  let hand = req.body.hand;
  let Result_end = '';
  let janken = ['グー', 'チョキ', 'パー'];
  let janken_r = Math.floor(Math.random() * 3);
  
  // 勝ち負けの判定プログラム
  if (janken[janken_r] === hand) {
    Result_end = "あいこです";
  } else if (
    (hand === 'グー' && janken[janken_r] === 'チョキ') ||
    (hand === 'チョキ' && janken[janken_r] === 'パー') ||
    (hand === 'パー' && janken[janken_r] === 'グー')
  ) {
    Result_end = "あなたの【勝ち】";
  } else {
    Result_end = "あなたの【負け】";
  }

  res.render('show', { mes: 'あなたの手は' + hand + 'です。CPUの手は' + janken[janken_r] + 'です。結果は' + Result_end + 'です。' });
});


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
