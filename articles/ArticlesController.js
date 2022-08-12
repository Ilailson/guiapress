const express = require('express')
const router = express.Router()

//savar - banco
const Category = require('../categories/Category')
const slugify = require('slugify')
const Article = require('./Article')

/**REDERIZANDO E PASSANDO - VIEW 
 * 
 * JOINS NA BUSCA - EXIBIR NOME CATEGORIA - NÃO ID
*/
router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render('admin/articles/index',{articles: articles})
    })    
})

router.get('/admin/articles/new', (req, res) => {
    /**Exibir lista de categorias 
     *  Passando lista de categorias para a viw
     *  res.render('admin/articles/new',{categories:categories})
     */
    Category.findAll().then(categories => {
        res.render('admin/articles/new',{categories:categories})

    })

    

})


router.post('/articles/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var categoryId = req.body.category

    //salvando - artigo

    Article.create({
        title:title, 
        slug: slugify(title),
        body:body,
        categoryId: categoryId
    }).then(() => res.redirect('/admin/articles'))
})


router.post("/articles/delete",(req, res) =>{
    var id = req.body.id 

    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({where: {id: id}})
            .then(() => {res.redirect("/admin/articles")})
        }else{
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("/admin/articles")
    }
})

router.get("/admin/articles/edit/:id",(req, res) =>{
    var id = req.params.id 

    Article.findByPk(id).then(article => {
        if(article !== undefined) {
            Category.findAll().then(categories => {

                res.render("admin/articles/edit",{categories: categories}) //para exibir o laço na pagina edit
            })

        }else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
    
})
module.exports = router
