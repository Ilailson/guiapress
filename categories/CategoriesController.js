const express = require('express')
const router = express.Router()
const Category = require("./Category") //salvar - banco
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminAuth') //importando 

router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new")
})


//slug remove espaço
router.post("/categories/save", adminAuth, (req, res) => {
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


router.get("/admin/categories", adminAuth, (req, res) => {

    //mostrando categorias salvas no banco
    Category.findAll().then(categories => {


        res.render("admin/categories/index", {categories: categories})
    })
    
       
    

})


router.post("/categories/delete", adminAuth, (req, res) =>{
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

router.get("/admin/categories/edit/:id", adminAuth, (req, res) =>{
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


router.post("/categories/update", adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({title:title, slug: slugify(title)},
    {where: {id:id}
})
    .then(category => {res.redirect("/admin/categories")})
})

//Fim atualização
module.exports = router