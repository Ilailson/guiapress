const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

//importando 
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

//criar tabelas no banco
const Article = require('./articles/Article')
const Category = require('./categories/Category')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


connection.authenticate()
.then(() => {console.log("Conexão feita com sucesso")})
.catch((msgError) =>{console.error(msgError)})


//dizendo para aplicação que quero usar aquelas rotas que estão em categories
app.use("/",categoriesController)
app.use("/",articlesController)

    
//===============rotas===================
/**Mostrando o artigo na home */
app.get
("/",(req, res) => {
    Article.findAll().then(articles => {
        res.render("index",{ articles: articles})  
    })
      
})



app.listen
(
    8081, (erro) => 
    {
        if (erro) {
            console.log('Ocorreu um erro')
        } else {
            console.log('App rodando!')
        }
    } 
)

