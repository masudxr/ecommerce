import {db} from '../db.js';

// Insert User Data From registration Form 
export function regUser(req,res){
  // console.log('Users full post: ', req.body);
  // let logedIn = req.session.userid;
  db.run('INSERT INTO Users (user_name, user_email, user_phone, user_password) VALUES ($name, $email, $phone, $password)', {
    $name: req.body.name, 
    $email: req.body.email,
    $phone: req.body.phone, 
    $password: req.body.password,

  }, (err)=>{
    console.log('Users Error', err);
    res.redirect ('/');
  });
}




