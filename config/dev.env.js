'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"/api"',
    // BASE_API: '"http://apitest.24681357.com/"' //  上传到正式服务器时启用   
    BASE_API: '"http://www.maishoutest.cn"' // 新域名 20180514

});