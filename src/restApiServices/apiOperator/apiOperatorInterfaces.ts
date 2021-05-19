import { GetOrdersInterfaceDbRes } from './dbServiceApiOperator/dbOperatorInterfaces';

export interface MarkOrderProcessed {
  order_id: number;
}

export interface SetTokenRequest {
  login: string;
  password: string;
}

export interface OpenOrdersResponse{
  orderId?: number;
  purchaseName?: string;
  createdAt?: string;
  deliveryDate?: string;
  orderStatus?: string;
  customerComment?: string;
  operatorComment?: string;
  deliveryAddress?: {
    city?: string;
    street?: string;
    building?: string;
    flat?: string;
  };
  customer?: {
    phone?: string;
    email?: string;
    name?: string;
    surname?: string;
    lastname?: string;
  };
}

export interface ResponseErrorContainer {
  code: number;
  description: string;
}

export interface OpenOrdersResponseContainer {
  result: OpenOrdersResponse[];
  error: ResponseErrorContainer;
}

export interface OrderDetailsResponseContainer {
  result: OpenOrdersResponse;
  error: ResponseErrorContainer;
}
