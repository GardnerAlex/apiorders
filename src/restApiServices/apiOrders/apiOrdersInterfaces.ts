export interface RestInterface {
  id?: string;
  apiMethodName?: string;
  authorization?: string;
  reqBody?: any;
  reqParams?: any;
  reqQuery?: any;
  params? : any;
}

export interface ApiRequest {
  status?: number;
  reqData?: RestInterface;
}

export interface RestOrderInterface {
  'name': string;
  'surName': string;
  'lastName': string;
  'purchaseName': string;
  'city': string;
  'street': string;
  'building': string;
  'flat': string;
  'phone': string;
  'deliveryDate': string;
  'email': string;
}

export interface PlaceOrderInterface extends RestOrderInterface{
  orders_user_id: number;
  created_at: string;
  status: number;
}
