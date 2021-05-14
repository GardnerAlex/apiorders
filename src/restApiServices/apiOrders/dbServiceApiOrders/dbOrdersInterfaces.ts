import { RestOrderInterface, PlaceOrderInterface } from '../apiOrdersInterfaces';

export interface DbConnOptions {
  connectionTimeoutMillis: number;
  max?: number;
  user: string;
  host: string;
  database: string;
  password: string;
  idleTimeoutMillis?: number;
  port: string;
  ssl?: object;
}

export interface PlaceOrderInterfaceDbRes {
  order_id: number;
}

export interface ApiOrdersDbInterface {
  placeOrder(input: PlaceOrderInterface): Promise<{ result: PlaceOrderInterfaceDbRes []; error: undefined }>;
  updateOrderStatus(status: number, order_id: number): Promise<{ result: PlaceOrderInterfaceDbRes []; error: undefined }>;
  getOrdersUserByPhone(phone: string): Promise<{ result: { id: number }[]; error: undefined }>;
  createOrdersNewUser(input: RestOrderInterface): Promise<{ result: { id: number }[]; error: undefined }>;
}
