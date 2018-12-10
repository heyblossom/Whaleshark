/*eslint-disable*/

var bookmark = function(req, res) {
    
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    
    
	console.log('bookamark 호출됨.');

    // 요청 파라미터 확인
    var paramId = req.user[0].id;
    var paramName = req.user[0].name;
    var paramcategory = req.user[0].category;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramName + ', ' + paramcategory);
            
    // 데이터베이스 객체 참조
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

        if(paramcategory=="student"){
                      
            var columns = '*';
            var tablename = 'bookmark';
 
            // SQL 문을 실행합니다.
            var exec = conn.query("select ?? from ?? where id = ? and name = ?", [columns, tablename, paramId, paramName], function(err, rows) {
                conn.release();  // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);
            
                if (rows.length > 0) {
    	    	  console.log('[%s]의 북마크를 찾음.', paramName);
                    res.render('./student/Mainpage/mainpage(SWE).ejs', {bookmark : rows, num : rows.length});
            } else {
            	   console.log("북마크가 없음");
    	           res.render('./student/Mainpage/mainpage(SWE).ejs', {num : 0});
            }
        });
        }
        
        else if(paramcategory=="school"){
                      
            // SQL 문을 실행합니다.
            var exec = conn.query("select * from request where state='requested'", function(err, rows) {
                conn.release();  // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);
            	console.log('학교 북마크 로드 함', rows);
                res.render('./School/Mainpage/mainpage(SWE)_School.ejs', {num : rows.length});
            });
        }
        
        else{
                      
            var columns = '*';
            var tablename = 'bookmark';
 
            // SQL 문을 실행합니다.
            var exec = conn.query("select ?? from ?? where id = ? and name = ?", [columns, tablename, paramId, paramName], function(err, rows) {
                conn.release();  // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);
            
                if (rows.length > 0) {
    	    	  console.log('[%s]의 북마크를 찾음.', paramName);
                    res.render('./student/Mainpage/mainpage(SWE).ejs', {bookmark : rows, num : rows.length});
                } else {
            	   console.log("일치하는 사용자를 찾지 못함.");
    	           res.render('./student/Mainpage/mainpage(SWE).ejs', {num : 0});
            }
        });
        }

        conn.on('error', function(err) {      
            console.log('데이터베이스 연결 시 에러 발생함.');
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;      
        });
    });
}}

var registerbookmark = function(req, res) {
    console.log("북마크 추가 중");
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    

    // 요청 파라미터 확인
    var paramId = req.user[0].id;
    var paramName = req.user[0].name;
    var paramInfo = req.body.bookmark||req.query.bookmark;
            
    console.log('요청 파라미터 : ' + paramId + ', ' + paramName + ',' + paramInfo);

    // 데이터베이스 객체 참조
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
          
    	var data = {id:paramId, name:paramName, bookmark:paramInfo};
 
        // SQL 문을 실행합니다.
        var exec = conn.query('insert into bookmark set ?', data, function(err, result) {
        	conn.release();  // 반드시 해제해야 함
        	console.log('실행 대상 SQL : ' + exec.sql);
            
           if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);        		
        		return;
        	}
            
        res.render('./student/Mainpage/success.ejs');

        	
        });
        
        conn.on('error', function(err) {      
              console.log('데이터베이스 연결 시 에러 발생함.');
              console.dir(err);
              
                    });
    });
	
		}	
}


var removebookmark = function(req, res) {
    console.log("북마크 삭제 중");
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    
    // 요청 파라미터 확인
    var paramId = req.user[0].id;
    var paramName = req.user[0].name;
    var paramInfo = req.body.id||req.query.id||req.params.id;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramName + ',' + paramInfo);

    // 데이터베이스 객체 참조
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
        var exec = conn.query('delete from bookmark where id = ? and name = ? and bookmark =?', [paramId, paramName, paramInfo], function(err, result) {
        	conn.release();  // 반드시 해제해야 함
        	console.log('실행 대상 SQL : ' + exec.sql);
            
           if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);        		
        		return;
        	}
            
        res.redirect('/process/bookmark');

        	
        });
        
        conn.on('error', function(err) {      
              console.log('데이터베이스 연결 시 에러 발생함.');
              console.dir(err);
              
                    });
    });
	
		}	
}


module.exports.bookmark = bookmark;
module.exports.removebookmark = removebookmark;
module.exports.registerbookmark = registerbookmark;

