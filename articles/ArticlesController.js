const express = require('express')
const router = express.Router()

router.get('/articles', (req, res) => {
    res.send('Rota de artigons')
}
)

router.get('/admin/articles/new', (req, res) => {
    res.send("Rota para novo  artigo")

})



module.exports = router