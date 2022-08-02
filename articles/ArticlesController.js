const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')

router.get('/articles', (req, res) => {
    res.send('Rota de artigons')
}
)

router.get('/admin/articles/new', (req, res) => {
    /**Exibir lista de categorias 
     *  Passando lista de categorias para a viw
     *  res.render('admin/articles/new',{categories:categories})
     */
    Category.findAll().then(categories => {
        res.render('admin/articles/new',{categories:categories})

    })

    

})



module.exports = router