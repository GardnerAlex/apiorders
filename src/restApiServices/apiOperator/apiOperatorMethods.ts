export const apiOperatorMethods = {
  apiOperator: {
    getOpenOrders: {
      request: 'GET_ORDERS_TO_PROCESS_REQ',
      response: 'GET_ORDERS_TO_PROCESS_RES'
    },
    markOrderProcessed: {
      request: 'MARK_ORDER_PROCESSED_REQ',
      response: 'MARK_ORDER_PROCESSED_RES'
    },
    setToken: {
      request: 'SET_TOKEN_REQ',
      response: 'SET_TOKEN_RES'
    },
    getOrderDetails: {
      request: 'GET_ORDER_DETAILS_REQ',
      response: 'GET_ORDER_DETAILS_RES'
    }
  }
};
