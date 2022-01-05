const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req,res) => {
   let searchOptions = {}
   if(req.query.name != null && req.query.name !== ''){
     //Regular expression searchs for paritial word 
     searchOptions.name = new RegExp(req.query.name, 'i')
    //i stands for case insensitive
   }
  try{
    const authors = await Author.find(searchOptions)
    res.render('authors/index',{
       authors: authors,
       searchOptions: req.query 
      })
  }catch {
    res.redirect('/')
  }  
})

// New Authors to diaplay new authors 
router.get('/new',(req,res) =>{
    res.render('authors/new',{author: new Author() })
})

// post to create new authors route
router.post('/', async (req,res) =>{
    const author = new Author({
      name: req.body.name
    })
    try{
       const newAuthor = await author.save()
          // res.redirect('authors/${newAuthor.id}')
          res.redirect('authors')
    } catch{
      res.render('authors/new',{
       author: author,
       errorMessage: 'Error creating Author'
    })
    }  
    //To save -> error , newAuthor variables
    // author.save((err,newAuthor) =>{
    //   if(err){
    //     res.render('authors/new',{
    //       author: author,
    //       errorMessage: 'Error creating Author'
    //     })
    //   } else{
    //     // res.redirect('authors/${newAuthor.id}')
    //     res.redirect('authors')
    //   }
    // })
})


module.exports = router