const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

//importando 
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const usersController = require('./users/UserController')

//criar tabelas no banco
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const Users = require('./Users/User')


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
app.use("/",usersController)

    
//===============rotas home===================
/**Mostrando o artigo na home */
app.get
("/",(req, res) => {
    Article.findAll({order: [['id', 'DESC']]})
    .then(articles => {

        /**Menu dinamico 
         * Passando categorias para a view
         * categories: categories
        */
        Category.findAll().then(categories => {
            res.render("index",{ articles: articles, categories: categories})  
        })

       
    })
      
})

app.get("/:slug",(req, res) => {
var slug = req.params.slug

Article.findOne({
    where: {slug: slug}
}).then(articles => {
    if(articles =! undefined){

        Category.findAll().then(categories => {
            res.render("article",{ articles: articles, categories: categories})  
        })
    }else{ //nulo
        res.redirect("/")
    }

}).catch(err => { //erro
    res.redirect("/")
})

})

/**
 * essa rota somente tem a ver com com arquivos padrões
 * index.ejs - index.js
 * */ 
app.get("/category/:slug",(req, res) =>{
    var slug = req.params.slug 
    //incluindo todos os artigos que fazer parte da categoria
    //variavel da view padrão index.ejs article
    //lista de artigos do bancos. para isso tem que tem o include informado nesta rota -  include: model: Article
    //após passar a lista de categorias
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Article}]
    }).then(category => {
        if(category !== undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories })
            })


        }else{
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })

    
})
//========================fim rota home===========================================


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

