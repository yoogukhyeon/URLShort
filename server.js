const express = require('express');
const app = express();
const bodyParser = require('body-parser')
//mongodb 연결
const mongoose = require('mongoose');
//schema 불러오기 
const UrlShort = require('./model/shortUrl');
//mongoose 연결
mongoose.connect('mongodb://localhost/urlShortener', {useNewUrlParser: true , useUnifiedTopology: true})


app.set('views' , 'views');
app.set('view engine', 'ejs');

//body-parser 미들웨서 등록
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', async (req ,res) => {
    const shortUrls = await UrlShort.find()
    res.render('index' , { shortUrls : shortUrls})
})

app.post('/shortUrls' , async (req, res) => {
    await UrlShort.create({ full: req.body.fullUrl});     
    
    res.redirect('/');   

})

app.get('/:shortUrl' , async (req , res) => {
    const shortUrl = await UrlShort.findOne({short : req.params.shortUrl});
    if(shortUrl == null){
        return res.sendStatus(404)
    }
    
    shortUrl.clicks++
    shortUrl.save();

    res.redirect(shortUrl.full);
});


const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중.....`);
})