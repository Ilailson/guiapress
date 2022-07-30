const express = require('express')
const router = express.Router()
const Category = require("./Category") //salvar - banco
const slugify = require('slugify')

router.get("/admin/categories/new",(req, res) => {
    res.render("admin/categories/new")
})


//slug remove espaço
router.post("/categories/save",(req, res) => {
    var title = req.body.title //pegando - formulario
    if(title != undefined){
        
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {res.redirect("/")})

    }else{
        res.redirect("/admin/categories/new")
    }

})


router.get("/admin/categories",(req, res) => {

    //mostrando categorias salvas no banco
    Category.findAll().then(categories => {


        res.render("admin/categories/index", {categories: categories})
    })
    
       
    

})

module.exports = router