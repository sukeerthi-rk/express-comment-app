const mongoose = require('mongoose');
const { v4: uuid } = require('uuid')
mongoose.connect('mongodb://localhost:27017/commentsdb', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to database")
}).catch(err => {
    console.log(err);
})
const commentSchema = new mongoose.Schema({
    id: String,
    username: String,
    comment: String
})

const comms = mongoose.model('Comm', commentSchema);

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
comms.insertMany(comments).then(data => {
    console.log("it worked");
    console.log(data);
}).catch(err => {
    console.log(err);
})