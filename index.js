const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const quotes = require('./quotes');

const app = express();
const port = 3000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


//static
app.use('/static', express.static(path.join(__dirname, './static')));


//views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './hbsFiles'));
hbs.registerPartials(path.join(__dirname, './hbsFiles/partials'));



//############# ROUTES #################

app.get('/', function(req, res) {

    function doRequest(url) {
        return new Promise(function(resolve, reject) {
            request(url, function(error, response, body) {
                if (!error && res.statusCode == 200) {
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    }

    async function main() {
        let res1 = await doRequest(`https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=82ba5a23c06e4bfaab2b049473cedf58`);
        let res2 = await doRequest(`https://newsapi.org/v2/top-headlines?country=in&apiKey=82ba5a23c06e4bfaab2b049473cedf58`)

        // console.log(JSON.parse(res1.body));
        // console.log(res1.body);

        // console.log('#######');

        // console.log(JSON.parse(res2.body));
        // console.log(res2.body);

        res.render('index', {
            object2: JSON.parse(res1.body),
            object: JSON.parse(res2.body)
        });
    }
    main();

    // res.render('index');
});

app.get('/quotes/:type', function(req, res) {

    if (req.params.type == 'general') {
        function doRequest(url) {
            return new Promise(function(resolve, reject) {
                request(url, function(error, response, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(response);
                    } else {
                        reject(error);
                    }
                });
            });
        }

        async function main() {
            let random = Math.floor(Math.random() * 30);
            let res1 = await doRequest(`https://quotable.io/quotes?page=${random}`);

            res.render('quotes', {
                object_genq: JSON.parse(res1.body),
                show: 'Quotes',
                type: 'genreal'
            });
        }
        main();
    }
    if (req.params.type == 'romantic') {
        console.log(quotes.romantic)
        res.render('quotes', {
            object_tags: quotes.romantic,
            show: 'Romantic Quotes',
            type: 'romantic'
        });
    }

    if (req.params.type == 'relationship') {
        console.log(quotes.relationship)
        res.render('quotes', {
            object_tags: quotes.relationship,
            show: 'Relationship Quotes',
            type: 'relationship'
        });
    }
    if (req.params.type == 'sad') {
        console.log(quotes.sad)
        res.render('quotes', {
            object_tags: quotes.sad,
            show: 'Sad Quotes',
            type: 'sad'
        });
    }

    if (req.params.type == 'student') {
        console.log(quotes.student)
        res.render('quotes', {
            object_tags: quotes.student,
            show: 'Student Quotes',
            type: 'student'
        });
    }
    if (req.params.type == 'motivational') {
        console.log(quotes.motivational)
        res.render('quotes', {
            object_tags: quotes.motivational,
            show: 'Motivational Quotes',
            type: 'motivaitonal'
        });
    }
})

app.get('/jokes', function(req, res) {

    console.log('called######');

    function doRequest(options) {
        console.log(options);
        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (!error && res.statusCode == 200) {
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    }

    async function main() {
        // let random = Math.floor(Math.random() * 30);

        const options = {
            method: 'GET',
            url: 'https://dad-jokes.p.rapidapi.com/joke/type/general',
            headers: {
                'x-rapidapi-key': '0074b0a744mshefb32d13cb50bf1p1bb0cfjsndbc9ad67171d',
                'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
                useQueryString: true
            }
        };


        let res1 = await doRequest(options);

        console.log(JSON.parse(res1.body));

        res.render('quotes', {
            object_jokes: JSON.parse(res1.body),
            show: 'Jokes',
            type: ''
        });
    }
    main();



})

app.get('/btn/:str', function(req, res) {
    console.log(req.params.str);

    function doRequest(url) {
        return new Promise(function(resolve, reject) {
            request(url, function(error, response, body) {
                if (!error && res.statusCode == 200) {
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    }

    async function main() {
        let res1 = await doRequest(`https://newsapi.org/v2/top-headlines?country=in&category=${req.params.str}&apiKey=82ba5a23c06e4bfaab2b049473cedf58`);
        let res2 = await doRequest(`https://newsapi.org/v2/top-headlines?country=in&apiKey=82ba5a23c06e4bfaab2b049473cedf58`);

        res.render('index', {
            object: JSON.parse(res1.body),
            object2: JSON.parse(res2.body),

        });
    }
    main();
})

app.post('/search', function(req, res) {
    let query = req.body.search;

    function doRequest(url) {
        return new Promise(function(resolve, reject) {
            request(url, function(error, response, body) {
                if (!error && res.statusCode == 200) {
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    }

    async function main() {
        let res1 = await doRequest(`https://newsapi.org/v2/everything?q=${query}&from=2021-07-10&language=en&sortBy=popularity&apiKey=82ba5a23c06e4bfaab2b049473cedf58`);
        let res2 = await doRequest(`https://newsapi.org/v2/top-headlines?country=in&apiKey=82ba5a23c06e4bfaab2b049473cedf58`)

        console.log(JSON.parse(res1.body));

        res.render('index', {
            object: JSON.parse(res1.body),
            object2: JSON.parse(res2.body),
        });
    }
    main();
})

app.listen(5000, function() {
    // console.log(`app is listening at port :${port}`);
})