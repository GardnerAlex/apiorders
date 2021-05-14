module.exports = {
  apps : [
    {
      name: 'apiOrders',
      cwd: '',
      script:'./dist/restApi/apiOrders/apiOrdersServer.js',
      watch:false,
      node_args:[],
      'log_date_format':'YYYY-MM-DD HH:mm Z',
      exec_interpreter:''
    },
    {
      name: 'apiOperator',
      cwd: '',
      script:'./dist/restApi/apiOperator/apiOperatorServer.js',
      watch:false,
      node_args:[],
      'log_date_format':'YYYY-MM-DD HH:mm Z',
      exec_interpreter:''
    }
  ]
};
