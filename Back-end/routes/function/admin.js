/*eslint-disable*/


var SIS = function(req, res) {
    
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    
    
	console.log('SIS 호출됨.');

	var database = req.app.get('database');
    
    database.db.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            console.log(err);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        // SQL 문을 실행합니다.
        var exec = conn.query("select * from request where state='Requested'", function(err, rows) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log(rows[0]);
                res.render('./School/Authentication/SendingInformationByBlockchain.ejs', {info : rows, num : rows.length});

            } else {
                res.render('./School/Authentication/SendingInformationByBlockchain.ejs', {num : 0});

            }
        });

        conn.on('error', function(err) {      
            console.log('데이터베이스 연결 시 에러 발생함.');
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;      
        });
    });
	
		}	
}

module.exports.SIS = SIS;
