/* eslint-disable*/

/*
 * Passport - Local 회원가입 설정
 */

var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true 
}, function(req, email, password, done) { 
	var paramName = req.param('name');
	console.log('passport의 local-signup 호출됨 : ' + email + ', ' + password + ', ' + paramName);
	
    process.nextTick(function() {
    var database = req.app.get('database');
    database.db.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            return done(err);
        }   
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

    // 데이터를 객체로 만듦
        var columns = '*';
        var tablename = 'sample';
        var data = {id:email, name:paramName, password:password};
    	
        
    // SQL 문을 실행함
        var exec = conn.query("select ?? from ?? where id = ? and password = ? and name = ?", [columns, tablename, email, password, paramName], function(err, user) {

        if (user.length > 0) {
                console.log('기존에 계정이 있음.');
	            return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));
        } else {
                
            var exec = conn.query('insert into sample set ?', data, function(err, user) {
        	   conn.release();  // 반드시 해제해야 함
        	   console.log('실행 대상 SQL : ' + exec.sql);
        	
        	   if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);
        		return done(err);}
	       
                console.log("사용자 데이터 추가함.");
	            return done(null, user);
	
                }
        	
        	
        );
        }});
    });
    });
});