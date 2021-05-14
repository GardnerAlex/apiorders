import { queryDb } from '../../dbOrdersQuery';
import { PlaceOrderInterface, RestOrderInterface } from '../../../apiOrdersInterfaces';

export async function placeOrder(i: PlaceOrderInterface) {
  // returning order_id
  console.log('placeOrder input', i);
  const queryText = `insert into apiorders.orders(orders_user_id, purchase_name, city, street, building, flat, deliverydate, created_at, status)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id AS order_id`;
  return queryDb(queryText, [i.orders_user_id, i.purchaseName, i.city, i.street, i.building, i.flat, i.deliveryDate, i.created_at, i.status]);
}

export async function getOrdersUserByPhone(phone: number) {
  //
  console.log('getOrdersUserByPhone', 'phone; ', phone);
  const queryText = 'select id from apiorders.customers where phone = $1';
  return queryDb(queryText, [phone]);
}

export async function createOrdersNewUser(i: RestOrderInterface) {
  //
  const queryText = `insert into apiorders.customers(phone, email, name, surname, lastname)
  VALUES($1, $2, $3, $4, $5) RETURNING id`;
  return queryDb(queryText, [i.phone, i.email, i.name, i.surName, i.lastName]);
}

export async function updateOrderStatus(status: number, order_id: number) {
  const queryText = 'UPDATE apiorders.orders SET status = $1 WHERE id = $2';
  return queryDb(queryText, [status, order_id]);
}
