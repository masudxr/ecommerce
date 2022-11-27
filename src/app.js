import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import multer from 'multer';
// import { db } from './db.js';

import { regUser } from './users/user.db.js';
import { logIN, LogOut } from './users/user.service.js';
import { contactReq } from './contact/contact.db.js';
import { postDataById, findProducts, removeProduct, productsShop, homehandeler} from './products/product.service.js';
import { shopHandeler } from './products/products.db.js';


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', '../views');

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});

app.use(express.static('../public')); // -----serving public file---////
app.use(express.urlencoded({ extended: true })); // ----------// parsing the incoming data-------//

app.set('trust proxy', 1);

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(cookieParser());

// -----multer..file uploading----//
// file upload folder//
const UPLOADS_FOLDER = '../public/';

let Arr = 0;
// --change the upload file name and handle the rename--//
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file name1:', file);
    const photoName = file.originalname;
    console.log('file orginal name:', photoName);
    Arr = photoName;
    console.log('file Arr orginal name:', Arr);
    cb(null, UPLOADS_FOLDER);
    console.log(' UPLOADS_FOLDER: ', UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    // console.log('file name2:', file);
    // ---chnage the file name and add extension---//
    const filename = file.originalname;
    // .replace(fileExt, '')
    // .toLowerCase()
    // .split(' ')
    // .join ('-') + '-' + Date.now();
    // const photoName = filename;
    cb(null, filename);
    // console.log('photoName:  ', photoName);
  },
});

export function imgCode() {
  console.log('inside the app function: ', Arr);
  return Arr;
}

// preapre the final multer upload object//
const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 3000000, // 3 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
    }
  },
});

app.get('/', homehandeler);

app.get('/registration', (req, res) => {
  res.render('registration', { title: 'Registration here!' });
});
app.post('/registration', regUser);

app.get('/signin', (req, res) => {
  res.render('signin', { title: 'Signing Here!' });
});

app.post('/signin', logIN);

app.get('/logout', LogOut);

// --------------------------------------------------------//
app.get('/createProducts', (req, res) => {
  res.render('createProducts', { title: 'Add Products' });
});

// for uploading multiple file//
// app.post('/create', upload.fields([
//   { name: 'avatar', maxCount: 1},
//   { name: 'gallery', maxCount: 2},
// ]), shopHandeler);
// for uploading multiple file//

app.post('/create', upload.array('avatar', 3), shopHandeler);

app.get('/product/:id', postDataById);

app.get('/:id/remove', removeProduct);

app.get('/remove', (req, res) => {
  res.render('remove', { title: 'Remove blogs' });
});

// db.run('CREATE TABLE IF NOT EXISTS Contact (c_id INTEGER PRIMARY KEY AUTOINCREMENT, c_name INTEGER NOT NULL , c_mail text NOT NULL, c_number INTEGER NOT NULL, c_body text NOT NULL)');

app.get('/shopping', productsShop);

app.get('/search', findProducts);

app.get('/about', (req, res) => {
  res.render('about', { title: 'about shop' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'contact Us' });
});

// contact request post from user 
app.post('/contact',contactReq);

app.get('/blog', (req, res) => {
  res.render('blog', { title: 'Write and Read Blog' });
});






// 404 page
app.use((req, res) => {
  // console.log(path.resolve())
  res.status(404).render('404', { title: '404' });
});

// -----------Error Handler---------------//
app.use((err, req, res) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send('there was an upload Error!');
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send('success');
  }
});
