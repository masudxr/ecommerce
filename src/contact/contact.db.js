import { db } from '../db.js';

export function contactReq(req, res) {
  // return new Promise((resolve, reject) => {
  //   console.log('req', resolve);
  //   console.log('rej', reject);
  let data = req.body;
  // console.log('req', data);
  // console.log('req name', data.name);
  // console.log('req email', data.email);
  // console.log('req phone', data.phone);
  db.run('INSERT INTO Contact (c_name, c_mail, c_number, c_body, c_date) VALUES ($name, $mail, $number, $body, $Date)', {
    $name: data.name,
    $mail: data.email,
    $number: data.phone,
    $body: data.body,
    $Date: new Date().toISOString(),

  }, (err)=>{
    console.log('Users Error', err);
    res.redirect ('/');
  });
}

//     }, (err) => {
//       if (err) reject(err);
//       resolve();
//     });
//   });
// }