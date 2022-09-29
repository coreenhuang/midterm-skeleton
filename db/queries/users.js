const db = require('../connection');

const createUser = (userParams) => {
  return db.query("INSERT INTO users (email, password) VALUES ($1, $2) returning *", [userParams.email, userParams.password])
    .then(data => {
      console.log("create user data.rows:",data.rows[0] );
      return data.rows[0];
    })
  console.log(userParams);
}

const getUserbyEmail = (email) => {
  return db.query("SELECT * FROM users where email= $1;", [email])
    .then(data => {
      return data.rows[0];
    });
  console.log(userParams);
};


module.exports = { createUser, getUserbyEmail };
