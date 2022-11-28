import {db} from '../db.js';


export function logIN(req, res) {
  const getId = req.body;
  console.log('     ',getId);
    
  db.get('SELECT * from Users WHERE user_name = $name AND user_password = $password', { $name: getId.name, $password: getId.password }, (err, row) => {
    console.log('loginId:', row);
    console.log('err:', err);
  
    req.session.userid = row.user_id;
    console.log('session: ', req.session);
    let logedIn = req.session.userid;
  
    if (row){
      res.redirect ('/');
    }
    else { res.render('home', { title: 'Failed!', logedIn });
    }
  });
}

export function users() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * from Users', (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });
}

export async function allUsers(req, res){
  let users = await users();
  let logedIn = req.session.userid;
  res.render('home', { title: 'All Users', users, logedIn});
  
}

// User Logout Function
export function logOut(req, res, next) {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect('/signin');
    });
  });
}