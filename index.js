const express = require('express')
const app = express()
const hand = require('express-handlebars')
const path = require('path')
const router = require('./routes/rotas');
const Connection = require('./db/db')
const Question = require('./db/questions')
const Response = require('./db/response');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
require('dotenv').config()




//Handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', hand.engine({defaultLayout: 'main'})),
app.set('view engine', 'handlebars')

//Arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))


//Parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//teste de conexão
Connection.authenticate().then(()=>{
    console.log('Conexão bem sucessida')
}).catch(err =>{
    console.log(err + ' Erro ao se conectar')
})

//rotas
app.use('/', router);

//rota principal
app.get('/', (req,res)=>{
    Question.findAll({raw:true, order:[['id','DESC']]}).then((questions)=>{  
        res.render('index', {questions:questions})
    })
    
})

//Rota de busca

app.get('/search', (req, res) => {
    let search = req.query.search;
    let query = '%' + search + '%';
  
    if (!search) {
      Question.findAll({ order: [['id','DESC']] })
        .then((questions) => {
          res.render('search/search', { questions: questions });
        })
        .catch((err) => {
          console.log('Erro ao buscar as perguntas: ' + err);
          res.sendStatus(500);
        });
    } else {
      Question.findAll({
        where: { title: { [Op.like]: query } },
        order: [['id','DESC']],
      }).then((questions) => {
          res.render('search/search', { questions: questions, search: search });
        })
        .catch((err) => {
          console.log('Erro ao buscar as perguntas: ' + err);
          res.sendStatus(500);
        });
    }
});







//Porta
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("Porta criada na " + PORT)
})