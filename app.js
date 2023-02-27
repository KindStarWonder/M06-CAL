const express = require('express');
//express app
//morgan logger
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
const Blarg = require('./models/blarg');
//connect to MongoDB (same one as the final project so don't go deleting everything on purpose or by accident)
//leave as test for M06 and take off test part for FinalProject


//to write to SDEV255DB db, add "SDEV255DB" into the uri as shown here:
//const DBURI ='mongodb+srv://stides:Seventy7@sdev255.syrfobv.mongodb.net/SDEV255DB?retryWrites=true&w=majority'
//to write to test db remove the "SDEV255DB" after the first single forward slash as show here
//const DBURI ='mongodb+srv://stides:Seventy7@sdev255.syrfobv.mongodb.net/?retryWrites=true&w=majority'
const DBURI ='mongodb+srv://stides:Seventy7@sdev255.syrfobv.mongodb.net/?retryWrites=true&w=majority';
/*************************************************************************************************************/
mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> {
        app.listen(3000);
        console.log('connected to db');})
    .catch((err)=>console.log(err));

const app = express();

//regularly used view engine
app.set('view engine', 'ejs');

//instream parser
//app.listen(3000);

//middleware & static files
app.use(express.static('Assets'));//you must explicitly state what files are publicly accessible
app.use(express.urlencoded({extended: true}));//turns form data into an object to be used
app.use(morgan('dev'));

//change this to put a new course in the test.db >> courses.collectiion
app.get('/add-course', (req, res)=>{
    const course = new Course({
        name: 'Quantum Comedian',
        desc: 'Absolutely absurd complexity that frustrates feeble fraggle minds.',
        dept: 'THEA',
        levl: 212,
        preq: 1,
        cred: 5
    });
    course.save()
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err);
        });
});

app.get('/all-courses', (req, res)=>{
    Course.find()
        .then((result)=>{
        res.send(result);
    })
        .catch((err)=>{
            console.log(err);
    });
});

app.get('/single-course', (req, res)=>{
    Course.findById('63fbfcb276709c7eba333350')
    .then((result)=>{
        res.send(result);
    })
        .catch((err)=>{
            console.log(err);
    });
});

////****Routes below here ****////

/*app.use((req, res, next)=>{//must pass next in as arg or it will say next is not defined
    console.log('new requests incoming');
    console.log('host:', req.hostname);
    console.log('paff:', req.path);
    console.log('method', req.method);
    next();
});

app.use((req, res, next)=>{
    console.log('in the middleware');
    next();
});*/

//there are tons of  middleware plugins we can use, we don't have to program it from scratch

//outstream writer
app.get('/', (req, res) =>{
    //res.send('<p>Hi, there!</p>');
    const courses1 = [
        {name: 'Puke Science', desc: 'medical definition of vomitting', subject: 'BIOL', cred: 3},
        {name: 'Drawing Squares', desc: 'geometric proofs and defined orthogonality', subject: 'PHIL', cred: 3},
        {name: 'Hammer Time', desc: 'metalurgical malleability and workshop', subject: 'MENG', cred: 4}
    ]
    Course.find()
        .then((result)=>{
            res.render('index', {tittle: 'All Courses', courses1: courses1, courses2: result});
        })
        .catch((err)=>{
            console.log(err);
        })

   
});

app.get('/about', (req, res) =>{
    //res.send('<p>about page</p>');
    res.render('about', {tittle: 'Sleep'});
});

app.get('/blarg', (req, res) =>{
    //res.send('<p>about page</p>');
    Blarg.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('blarg', {tittle: 'Blargles', blargs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/blarg/:id', (req, res)=>{
    const id = req.params.id;
    Blarg.findById(id)
    .then(result=>{
        res.render('details', { blarg: result, tittle: 'Blarg'});
    })
    .catch(err=>{
        console.log(err);
    });
})

app.delete('/blarg/:id', (req, res)=>{
    const id = req.params.id;
    Blarg.findByIdAndDelete(id)
    //because AJAX request on browser side, cannot use redirect
    .then(result=>{
        res.json({redirect: '/blarg'})
    })
})

app.post('/blarg', (req, res)=>{
    const blargle = new Blarg(req.body);//this didn't parse it correctly?
    blargle.save()
    .then((result)=>{
        res.redirect('/blarg');
    }).catch((err)=>{
        console.log(err);
    }).catch(err=>{
        console.log(err);
    })
})

app.use((req, res)=>{
    res.status(404).render('404', {tittle: 'Work'});
});