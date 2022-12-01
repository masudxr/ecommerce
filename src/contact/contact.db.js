import { db } from '../db.js';

export function contactReq() {
  return new Promise((resolve, reject) => {
    console.log('req', resolve);
    console.log('rej', reject);

    db.run('INSERT INTO Contact (c_name, c_mail, c_number, c_body, c_date) VALUES ($name, $mail, $number, $body, $Date)', {
      // eslint-disable-next-line no-undef
      $name: contact.name,
      // eslint-disable-next-line no-undef
      $mail: product.body,
      // eslint-disable-next-line no-undef
      $number: product.price,
      // eslint-disable-next-line no-undef
      $body: logedIn,
      $Date: new Date().toISOString(),

    }, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}