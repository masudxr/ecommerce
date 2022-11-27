import { db } from '../db.js';

export function contactReq() {
  return new Promise((resolve, reject) => {
    console.log('req', resolve);
    console.log('rej', reject);

    db.run('INSERT INTO Contact (c_name, c_mail, c_number, c_body, c_date) VALUES ($name, $mail, $number, $body, $Date)', {
      $name: contact.name,
      $mail: product.body,
      $number: product.price,
      $body: logedIn,
      $Date: new Date().toISOString(),

    }, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}