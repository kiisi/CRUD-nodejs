const express = require('express')
const app = express()
const path = require('path')
const Item = require('./models/items')
const mongoose = require('mongoose')

const mongodb = 'mongodb+srv://kiisifelix:kiisifelix2006@clusterk.try6u.mongodb.net/item-database?retryWrites=true&w=majority';

mongoose.connect(mongodb).then(()=>{
    console.log("connected")
    app.listen(5000)
}).catch(err=>console.log(err))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended:true}));
app.use(express.static("views"));




app.get('/', (req, res) =>{
    res.redirect("get-items");
})

app.get('/get-items', (req, res)=>[

    Item.find().then(result=>{
        res.render("index", {items: result});
    }).catch(err=>console.log(err))
])

app.get('/add-item', (req, res)=>{
    res.render("add-item")
})

app.post('/items', (req, res)=>{
    const item = Item(req.body);
    if (!item.name || !item.price){
        return res.status(400).render("add-item", {error:"Enter a valid data"})

    }
    item.save().then(()=>{
        res.redirect('/')
    }).catch(err=>console.log(err));
})

app.get('/items/:id', (req, res)=>{
    const id = req.params.id;
    Item.findById(id).then(result=>{
        res.render('item-detail', {item: result})
    }).catch(err=>console.log(err))
})

app.delete('/items/:id',(req, res)=>{
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result=>{
        res.json({redirect: '/'});
    })
})

app.put('/items/:id',(req, res)=>{
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result=>{
        res.json({msg: 'Successfully Updated'});
    })
})

app.use((req,res)=>{
    res.render('error');
})