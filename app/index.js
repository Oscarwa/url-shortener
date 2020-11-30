const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const { nanoid } = require('nanoid');
const path = require('path');

const db = require('./db');

const ShortModel = require('./model');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
//console.log('path', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    const indexPath = `${__dirname}\\public\\index.html`;
    console.log(indexPath);
    res.sendFile(indexPath);
});

app.post('/create', async (req, res, next) => {
    const url = req.body.url;
    let id = req.body.id;
    if(url) {
        console.log('id',id);
        console.log('nanoid',nanoid(6));
        if(id === undefined || id === null || id === '') {
            id = nanoid(6);
        }
        const model = new ShortModel({url, id});
        try {
            await model.save();
            res.json(model);
        }
        catch(err) {
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
    else {
        console.log(req.body);
        res.status(400).json({error: 'url not provided'});
    }
});

app.get('/:id', async (req, res, next) => {
    const id = req.params.id.trim();
    if(id) {
        const short = await ShortModel.findOneAndUpdate({ id }, { $inc: {visitCount: 1}});
        if(short) {
            res.redirect(short.url);
        }
        else {
            res.status(404).json({error: `${id} - not found`});
        }
    } else {
        res.status(400).json({message: 'Redirect to url'});
    }
});

app.get('/:id/info', async (req, res, next) => {
    const id = req.params.id.trim();
    if(id) {
        const short = await ShortModel.findOne({ id });
        if(short) {
            res.json(short);
        }
        else {
            res.status(404).json({error: `${id} - not found`});
        }
    } else {
        res.status(400).json({message: 'Redirect to url'});
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port: ${port}`)
});