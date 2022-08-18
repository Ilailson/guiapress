const express = require('express')
const router = express.Router()
const User = require("./User") //salvar - banco
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
        }).then(() => {res.redirect("/admin/categories/")})

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


router.post("/categories/delete",(req, res) =>{
    var id = req.body.id 

    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({where: {id: id}})
            .then(() => {res.redirect("/admin/categories")})
        }else{
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id",(req, res) =>{
    var id = req.params.id //id vindo do parametro das rotas
    
    //se não for numero vai da o redirect
    if(isNaN(id)){//corrigir esso 1abced 
        res.redirect("/admin/categories")
    }


  //=====================================Atualizar no banco=========================  
    //pesquisando categorias no banco
    Category.findByPk(id)
    .then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit",{category:category})
            
        } else {
            res.redirect("/admin/categories")
        }

    }).catch(erro => { //caso ocorra erro na busca
        res.redirect("/admin/categories")
    })

    
})


router.post("/categories/update", (req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({title:title, slug: slugify(title)},
    {where: {id:id}
})
    .then(category => {res.redirect("/admin/categories")})
})

//Fim atualização
module.exports = router