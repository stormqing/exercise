/*
針對antd實現按需加載,自定義主題
 */
 const {override,fixBabelImports,addLessLoader} = require('customize-cra');

 module.exports = override(
     fixBabelImports('import',{
         libraryName:'antd',
         libraryDirectory:'es',
         style:true,
     }),
     addLessLoader({
         javascriptEnabled:true,
         modifyVars:{'@primary-color':'#1DA57A'},
     }),
 );
