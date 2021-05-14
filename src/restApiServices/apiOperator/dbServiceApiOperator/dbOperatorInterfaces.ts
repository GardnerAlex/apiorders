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

export interface QueryDbResponse {
  result: [];
  error: {
    code: number;
    description: string;
  };
}

export interface ApiOperatorDbInterface {
  getOpenOrders(): Promise<{ result: PlaceOrderInterfaceDbRes []; error: undefined }>;
  updateOrderStatus(status: number, order_id: number): Promise<{ result: PlaceOrderInterfaceDbRes []; error: undefined }>;
}
