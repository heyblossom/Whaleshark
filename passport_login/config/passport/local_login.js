/* eslint-disable*/

/*
 * Passport - Local 설정
 */

var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true 
}, function(req, email, password, done) { 
	console.log('passport의 local-login 호출됨 : ' + email + ', ' + password);
	
	var database = req.app.get('database');
    
	// 커넥션 풀에서 연결 객체를 가져옴
	database.db.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            return done(err);
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
          
        var columns = ['id', 'name', 'age'];
        var tablename = 'sample';
 
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where id = ? and password = ?", [columns, tablename, email, password], function(err, user) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (user.length > 0) {
    	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', email, password);
    	    	console.log(user[0].id)
                return done(null, user);
                
            } else {
            	console.log("일치하는 사용자를 찾지 못함.");
    	    	return done(null, false);
            }
        });

        conn.on('error', function(err) {      
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);
            
    	   	return done(err);
      });
    });
	
});
