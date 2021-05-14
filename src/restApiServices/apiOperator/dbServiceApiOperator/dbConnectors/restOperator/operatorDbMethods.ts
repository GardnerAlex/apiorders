import { queryDb } from '../../dbOperatorQuery';

export async function getOpenOrders() {
  // returning order_id
  console.log('getOpenOrders fired');
  return queryDb('select * from apiorders.orders WHERE status = 2');
}

export async function updateOrderStatus(status: number, order_id: number) {
  // returning order_id
  const queryText = 'UPDATE apiorders.orders SET status = $1 WHERE id = $2';
  return queryDb(queryText, [status, order_id]);
}
