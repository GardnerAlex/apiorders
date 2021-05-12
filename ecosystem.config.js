module.exports = {
  apps : [
    {
      name: 'ordersRestApi',
      cwd: '/opt/app-root/src/src/notifySmartAppServiceJava',
      script:'/dist/restApi/restServer.js',
      watch:false,
      node_args:[],
      'log_date_format':'YYYY-MM-DD HH:mm Z',
      exec_interpreter:''
    }
  ]
};
