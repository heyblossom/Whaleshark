/*eslint-disable*/

/*
 * 데이터베이스 스키마 로딩
 * 기본 파일이며 개발자 수정 필요없음
 *
 * @date 2016-11-10
 * @author Mike
 */

var mysql = require('mysql');

// database 객체에 db, schema, model 모두 추가
var database = {};


// 초기화를 위해 호출하는 함수
database.init = function(app, config) {
	console.log('init() 호출됨.');	
	connect(app, config);
}

//데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connect(app, config) {
	console.log('connect() 호출됨.');
	
    //===== MySQL 데이터베이스 연결 설정 =====//
    database.db = mysql.createPool({
        connectionLimit : config.db_connectionLimit, 
        host     : config.db_host,
        user     : config.db_user,
        password : config.db_password,
        database : config.db_database,
        debug    : config.db_debug
    });
    
    if(database.db){
        console.log('DB연결 성공!');    
    }
    else{
	database.db.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }       
            console.log('DB연결 과정에 Error 발생 : ' + err);
            return;
        }   
    });
    }
		
	app.set('database', database);
	console.log('database 객체가 app 객체의 속성으로 추가됨.');
	
	};
	
	

// database 객체를 module.exports에 할당
module.exports = database;
