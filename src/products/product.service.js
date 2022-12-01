import { db } from '../db.js';
import { users } from '../users/user.service.js';

// get all products from the database //
export function products() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * from Products', (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });
}

// Show products by products ID
export function postDataById(req, res) {
  const logedIn = req.session.userid;
  // console.log('BlogsId:', req.params);
  const BlogsId = Number(req.params.id);
  const user = users();
  // console.log('BlogsId:',BlogsId);
  db.get('SELECT * from Products WHERE p_id = $id', { $id: BlogsId }, (err, row) => {
    // console.log('row:',row);
    res.render('product', {title: 'product Id', row, logedIn, user});
  });
}

// search bar
export function findProducts(req, res) {
  const logedIn = req.session.userid;
  // console.log('param id value:', req.params.id);
  // console.log('query id value:', req.query.name);

  const BlogsId = req.query.name;
  const user = users();
  // console.log('BlogsId:', BlogsId);
  db.get('SELECT * FROM Products WHERE p_name LIKE $name', { $name: `%${BlogsId}%` }, (err, row) => {
  // console.log('row:', row);
    res.render('searchproducts', {title: 'product details', row, logedIn, user});
  });
}

// ----Remove products-----///
export function removeProduct(req, res) {
  const ReqId = Number(req.params.id);
  // console.log('Request remove items: ', ReqId);
  db.run('DELETE FROM Products WHERE p_id=$id', { $id: ReqId });
  res.redirect('/');
}


// show all products in the shopping file
export function productsShop(req, res) {
  const product =  products();
  const user = users();
  const logedIn = req.session.userid;
  res.render('shopping', {title: 'All products', product, logedIn, user});
}

// show all products in the home file
export function homehandeler(req, res) {
  const product = products();
  const user = users();
  const logedIn = req.session.userid;
  res.render('home', {title: 'All products', product ,logedIn, user});
}

