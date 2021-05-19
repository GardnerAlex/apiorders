import { queryDb } from '../../dbOperatorQuery';

export async function setTokenForOperator(login: string, password: string) {
  const queryText = 'select token from apiorders.operators where email=$1 and password=$2';
  return queryDb(queryText, [login, password]);
}

export async function getOpenOrders() {
  // returning order_id
  console.log('getOpenOrders fired');
  return queryDb(`
    select
      ord.id as order_id,
      ord.purchase_name as purchase_name,
      ord.created_at as created_at,
      ord.deliverydate as deliverydate,
      ord.status as order_status,
      ord.comment as cust_comment,
      ord.operator_comment as operator_comment,
      ord.city as city,
      ord.street as street,
      ord.building as building,
      ord.flat as flat,
      c.phone as phone,
      c.email as email,
      c.name as name,
      c.surname as surname,
      c.lastname as lastname
    from apiorders.orders ord
    JOIN apiorders.customers c on c.id = ord.orders_user_id 
    WHERE status = 2
  `);
}

export async function getOrderDetails(order_id) {
  // returning order_id
  console.log('getOrderDetails fired');
  const queryText = `
    select
      ord.id as order_id,
      ord.purchase_name as purchase_name,
      ord.created_at as created_at,
      ord.deliverydate as deliverydate,
      ord.status as order_status,
      ord.comment as cust_comment,
      ord.operator_comment as operator_comment,
      ord.city as city,
      ord.street as street,
      ord.building as building,
      ord.flat as flat,
      c.phone as phone,
      c.email as email,
      c.name as name,
      c.surname as surname,
      c.lastname as lastname
    from apiorders.orders ord
    JOIN apiorders.customers c on c.id = ord.orders_user_id 
    WHERE ord.id = $1
  `;
  return queryDb(queryText, [order_id]);
}

export async function updateOrderStatus(status: number, order_id: number) {
  // returning order_id
  const queryText = 'UPDATE apiorders.orders SET status = $1 WHERE id = $2';
  return queryDb(queryText, [status, order_id]);
}
