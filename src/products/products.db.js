import { db } from '../db.js';
import { imgCode } from '../app.js';
// import { users } from '../users/user.service.js';


export function insert (product, logedIn, code) {
  // console.log('products sub full post: ', logedIn, product);
  // console.log('imgsCode2: ', code);
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Products (p_name, p_description, p_price, User_id, Date, p_img) VALUES ($name, $description, $price, $user, $Date, $img)', {
      $name: product.name,
      $description: product.body,
      $price: product.price,
      $user: logedIn,
      $Date: new Date().toISOString(),
      $img: code, // code == img code;

    }, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

export async function shopHandeler(req, res) {
  const logedIn = req.session.userid;
  const imgsCode = imgCode();
  // console.log('imgsCode1: ', imgsCode);
  // const products = await products();
  // const user = await users();
  await insert(req.body, logedIn, imgsCode);
  res.redirect('/');

  
  // res.render('home', {title: 'All products', logedIn, user});
}






