/* eslint-disable*/

/*
 * 설정
 */

module.exports = {
	server_port: 3000,
    db_connectionLimit : 10, 
    db_host     : 'localhost',
    db_user     : 'root',
    db_password : 'skskfdl12',
    db_database : 'sample',
    db_debug    :  false,
    route_info: [
        {file:'../routes/function/mainpage', path:'/process/bookmark', method:'bookmark', type:'get'},  
        {file:'../routes/function/mainpage', path:'/process/registerbookmark', method:'registerbookmark', type:'get'},  
        {file:'../routes/function/mainpage', path:'/process/removebookmark/:id', method:'removebookmark', type:'get'},  
        {file:'../routes/function/certificate', path:'/process/showInfo/:category', method:'showInfo', type:'get'},
        {file:'../routes/function/certificate', path:'/process/showData/:category', method:'showData', type:'get'},
        {file:'../routes/function/certificate', path:'/process/selectCompany', method:'selectCompany', type:'get'},
        {file:'../routes/function/certificate', path:'/process/request', method:'request', type:'get'},  
        {file:'../routes/function/certificate', path:'/process/certificateProcessing', method:'certificateProcessing', type:'get'}, 
        {file:'../routes/function/certificate', path:'/process/searchDate', method:'searchDate', type:'get'},
        {file:'../routes/function/admin', path:'/process/SIS', method:'SIS', type:'get'},
        {file:'../routes/function/blockchain', path:'/process/SendingInfo/:apr&:ref', method:'submitSIS', type:'get'},
        {file:'../routes/function/blockchain', path:'/process/SPR', method:'SPR', type:'get'}
    ]
}