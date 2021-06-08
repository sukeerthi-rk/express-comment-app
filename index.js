const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid')
const methodOverride = require('method-override')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

let comments = [{
    id: uuid(),
    username: 'mightymouse',
    comment: 'that was so cool!'
},
{
    id: uuid(),
    username: 'kuku',
    comment: 'that was dogshit'
},
{
    id: uuid(),
    username: 'miracle',
    comment: 'ill rekt him '
},
{
    id: uuid(),
    username: 'meracle',
    comment: 'ill copy a pro'
},
]





app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})


app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const com = comments.find(c => c.id === id);
    res.render('comments/details', { com })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const com = comments.find(c => c.id === id);
    res.render('comments/edit', { com })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const oldComment = comments.find(c => c.id === id);
    const newComment = req.body.comment;
    oldComment.comment = newComment;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');

})

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})




app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})