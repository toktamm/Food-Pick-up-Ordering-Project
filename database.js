// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();



// add registration data to the database
const addUser = (user) => {
  const registerQuery = `
  INSERT INTO users (name, email, password, phone)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  const registerQueryParams = [user.name, user.email, user.password, user.phone];
  return db.query(registerQuery, registerQueryParams)
    .then(response => response.rows[0])
    .catch(error => error.message);
}
exports.addUser = addUser;



// get users from database by email
const findUserByEmail = (email) => {
  const emailQuery = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;
  const emailQueryParams = [email];
  return db.query(emailQuery, emailQueryParams)
    .then(response => response.rows[0])
}
exports.findUserByEmail = findUserByEmail;



const findUserById = (id) => {
  const idQuery = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;
  const emailQueryParams = [id];
  return db.query(idQuery, emailQueryParams)
    .then(response => response.rows[0])
}
exports.findUserById = findUserById;



// get menu items from database
const getMenuItems = function() {
  const menuQuery = `
    SELECT *
    FROM menu_items;
    `;
  return db.query(menuQuery)
    .then(response => response.rows);
};
exports.getMenuItems = getMenuItems;


// add items to cart
const addItemToCart = (name) => {
  const addItemsToCartQuery = `
  INSERT INTO orders (name)
  VALUES ($1)
  RETURNING *
  `;
  return db.query(addItemsToCartQuery)
    .then(response => response.rows[0]);
}
exports.addItemToCart = addItemToCart;



// add orders
const addOrders = () => {

const addOrdersQuery = `
  INSERT INTO orders (menu_item.id, quantity)
  VALUES ($1, $2)
  RETURNING *
`;


}
exports.addOrders = addOrders;





const getUserId = () => {

  const getUserIdQuery = `
    SELECT users.id
    FROM users
    JOIN cart_items ON users.id = user_id
  `;
  return db.query(getUserIdQuery)
  .then(response => response.rows[0]);
}
exports.getUserId = getUserId;







// orders total
const ordersTotal = () => {

  const ordersTotalQuery = `
  SELECT sum(menu_items.price)
  FROM menu_item
  JOIN orders ON menu_item_id = menu_items.id


  INSERT INTO orders (order)
  VALUES ($1)
  RETURNING *
  `;


}
exports.ordersTotal = ordersTotal;


// delete item from cart
const deleteItemFromCart = () => {

}
exports.deleteItemFromCart = deleteItemFromCart;
