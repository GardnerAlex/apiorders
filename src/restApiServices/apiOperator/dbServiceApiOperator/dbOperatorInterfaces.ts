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

export interface GetOrdersInterfaceDbRes {
  order_id?: number;
  purchase_name?: string;
  created_at?: string;
  deliverydate?: string;
  order_status?: string;
  cust_comment?: string;
  operator_comment?: string;
  city?: string;
  street?: string;
  building?: string;
  flat?: string;
  phone?: string;
  email?: string;
  name?: string;
  surname?: string;
  lastname?: string;
}

export interface QueryDbResponse {
  result: [];
  error: {
    code: number;
    description: string;
  };
}

export interface ApiOperatorDbInterface {
  getOpenOrders(): Promise<{ result: GetOrdersInterfaceDbRes []; error: undefined }>;
  getOrderDetails(order_id: number): Promise<{ result: GetOrdersInterfaceDbRes ; error: undefined }>;
  updateOrderStatus(status: number, order_id: number): Promise<{ result: PlaceOrderInterfaceDbRes []; error: undefined }>;
  setTokenForOperator(login: string, password: string): Promise<{ result: string []; error: undefined }>;
}
