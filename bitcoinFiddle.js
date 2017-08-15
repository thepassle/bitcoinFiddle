var mysql = require("mysql");
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require("path");

var bitcoin = require('bitcoinjs-lib');
var axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'www')));

app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	setTimeout(function(){
		res.send(JSON.stringify({
			message: req.body.message || null,
		}));
	}, 1500)


const minimumSatoshi = 546;

var keyPair = bitcoin.ECPair.fromWIF('L2H733AifpoiMoVA7Kdnxwyd7LXNz9bZaiDci4nu7Qarrr1jUptL');
var tx = new bitcoin.TransactionBuilder();

tx.addInput('43873dca1b12d26f4f005f6e000d52620974f7b9186e7ed24676cfb6e9cfa6b5', 0);
tx.addOutput('1G4toUGWa4MmeYTCA5dLgLKNj5hQ3FndiC', minimumSatoshi);
tx.sign(0, keyPair);
// console.log(tx.build().toHex());
generatedhash = tx.build().toHex();

var con = mysql.createConnection({
	host: "www52.totaalholding.nl",
	user: "thepas1q_pascal",
	password: "#########",
	database: "thepas1q_test_base"
});


axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push',
  	{"tx":"0100000001b5a6cfe9b6cf7646d27e6e18b9f7740962520d006e5f004f6fd2121bca3d8743000000006a47304402200bd2ebdb321085dc52c7ab1146ea11f511d286d6ba408667662bcbb69d05f48d0220351903367460a1a25451604068119d3ccbe075de40b64986921957d04de7f33e0121036f95b6dbc48611f8331aa05e48d59d7a624b04cc78bd2335f95fc96607b84bb1ffffffff0122020000000000001976a914a5466048fdd8409db6d6a91b87303e04c4a421ff88ac00000000"}
  )
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (response) {
    console.log(response.data);
  });

	var query = { msg: String(req.body.message), seen: 1 };
	con.query('INSERT INTO walltwo SET ?', query, function(err,res){
	  if(err) throw err;
	});


});

app.listen(3000, function () {
  console.log('Server is running.');

});
