/*eslint-disable*/



var showInfo = function (req, res) {

    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {

        console.log('showData 호출됨.');
        var paramName = req.user[0].name;
        var paramNumber = req.user[0].userNumber;
        var paramInfo = req.body.category||req.query.category||req.params.category;

        console.log(paramInfo);
        var database = req.app.get('database');

        database.db.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 함
                }
                console.log(err);
                return;
            }
            switch(paramInfo){
                case "1" :
                console.log('재학 증명서 요청 됨');
                res.render('./student/SchoolCertificate/Print.ejs', {
                    info: req.user,
                    cate : paramInfo
                });
                    break;
                    
                case "2" : 
            var columns = '*';
            var tablename = 'student_grade';

            // SQL 문을 실행합니다.
            var exec = conn.query("select ?? from ?? where name = ? and userNumber = ?", [columns, tablename, paramName, paramNumber], function (err, rows) {
                conn.release(); // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);

                console.log('성적증명서 요청 됨');
                res.render('./student/SchoolCertificate/Print.ejs', {
                    info: rows,
                    num: rows.length,
                    cate : paramInfo

                });

                conn.on('error', function (err) {
                    console.log('데이터베이스 연결 시 에러 발생함.');
                    res.writeHead('200', {
                        'Content-Type': 'text/html;charset=utf8'
                    });
                    res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                });
            });
                    break;                  
            }
            

        });
    }
};


var showData = function (req, res) {

    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {

        console.log('showData 호출됨.');
        var paramName = req.user[0].name;
        var paramNumber = req.user[0].userNumber;
        var paramInfo = req.body.category||req.query.category||req.params.category;

        console.log(paramInfo);
        var database = req.app.get('database');

        database.db.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 함
                }
                console.log(err);
                return;
            }
            switch(paramInfo){
                case "1" :
                console.log('재학 증명서 요청 됨');
                res.render('./student/SchoolCertificate/showData.ejs', {
                    info: req.user,
                    cate : paramInfo
                });
                    break;
                    
                case "2" : 
            var columns = '*';
            var tablename = 'student_grade';

            // SQL 문을 실행합니다.
            var exec = conn.query("select ?? from ?? where name = ? and userNumber = ?", [columns, tablename, paramName, paramNumber], function (err, rows) {
                conn.release(); // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);

                console.log('성적증명서 요청 됨');
                res.render('./student/SchoolCertificate/showData.ejs', {
                    info: rows,
                    num: rows.length,
                    cate : paramInfo

                });

                conn.on('error', function (err) {
                    console.log('데이터베이스 연결 시 에러 발생함.');
                    res.writeHead('200', {
                        'Content-Type': 'text/html;charset=utf8'
                    });
                    res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                });
            });
                    break;                  
            }
            

        });
    }
};


var selectCompany = function (req, res) {

    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {

        console.log('SelectCompany 호출됨.');

        var database = req.app.get('database');

        database.db.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 함
                }
                console.log(err);
                return;
            }

            var columns = '*';
            var tablename = 'company_info';

            // SQL 문을 실행합니다.
            var exec = conn.query("select ?? from ??", [columns, tablename], function (err, rows) {
                conn.release(); // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);

                console.log('기업 찾음');
                res.render('./student/SchoolCertificate/selectCompany(SWE).ejs', {
                    info: rows,
                    num: rows.length
                });

                conn.on('error', function (err) {
                    console.log('데이터베이스 연결 시 에러 발생함.');
                    res.writeHead('200', {
                        'Content-Type': 'text/html;charset=utf8'
                    });
                    res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                });
            });
        });

    }
};

var request = function(req, res) {
	console.log('Certificate Submit Request');

    // 요청 파라미터 확인
    var paramName = req.user[0].name;
    var paramNumber = req.user[0].userNumber;
    var dept = req.user[0].Dept;
    var state = req.user[0].state;
    var paramInfo = req.body.pInput || req.query.pInput;
    var paramRequest = req.body.information || req.query.information;
	var start = paramInfo.indexOf("(")+1;
    var finish = paramInfo.indexOf(")");
    paramInfo = paramInfo.slice(start, finish);
    console.log('요청 파라미터 : ' + paramName + ', ' + paramNumber + ', ' + paramInfo + ', ' + paramRequest);
	
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database.db) {
        switch(paramRequest){
                
            case "chk1" : 
                console.log("재학증명서 전송 요청됨")
                database.db.getConnection(function(err, conn) {
                    if (err) {
        	           if (conn) {
                            conn.release();  // 반드시 해제해야 함
                        }
                    console.log(err);
                    return;
                    }      
                console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
          
                var jsonData = '{"name" :"' + paramName + '", "userNumber" : "' + paramNumber + '", "dept" : "' + dept + '", "category" : "' + paramRequest + '", "state" : "'+ state + '"}';        
                var data = {name:paramName, userNumber:paramNumber, category:paramRequest, company:paramInfo, state:"Requested",data:jsonData};

                // SQL 문을 실행합니다.
                    var exec = conn.query('insert into request set ?', data, function(err, result) {
                        conn.release();  // 반드시 해제해야 함
                        console.log('실행 대상 SQL : ' + exec.sql);

                   if (err) {
                        console.log('SQL 실행 시 에러 발생함.');
                        console.dir(err);        		
                        return;
                    }
                    res.redirect('/SearchSubmit');    
               });
            });
                break;

                
                
            case "chk2" :
            console.log("성적증명서 전송 요청됨")
            findInfo(database, paramName, paramNumber, function(err, docs) {
                // 에러 발생 시, 클라이언트로 에러 전송
                if (err) {
                    console.error('findInfo 중 에러 발생');
                    res.redirect('/');
                    return;
                }

                if (docs){
                    console.dir(docs);
                    var count = docs.length;
                    var grade ="{";
                    var credit ="{" 
                    for(var i = 0; i<count-1; i++){
                        grade = grade + docs[i].grade + ",";
                        credit = credit + docs[i].credit + ",";
                    }
                    grade = grade + docs[count-1].grade + "}" ;
                    credit = credit + docs[count-1].credit + "}" ;

                    database.db.getConnection(function (err, conn) {
                        if (err) {
                            if (conn) {
                                conn.release(); // 반드시 해제해야 함
                                }
                            console.log(err);
                            return;}

                    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);    
                    var jsonData = '{"name" :"' + paramName + '", "userNumber" : "' + paramNumber + '", "dept" : "' + dept + '", "category" : "' + paramRequest + '", "grade" : "'+ grade + '", "credit" : "'+ credit + '"}';        
                    var data = {name:paramName, userNumber:paramNumber, category:paramRequest, company:paramInfo, state:"Requested",data:jsonData};

                    // SQL 문을 실행합니다.
                    var exec = conn.query('insert into request set ?', data, function(err, result) {
                        conn.release();  // 반드시 해제해야 함
                        console.log('실행 대상 SQL : ' + exec.sql);

                       if (err) {
                            console.log('SQL 실행 시 에러 발생함.');
                            console.dir(err);        		
                            return;
                        }

                    res.redirect('/SearchSubmit');


                    });

                    conn.on('error', function (err) {
                        console.log('데이터베이스 연결 시 에러 발생함.');
                        res.writeHead('200', {
                            'Content-Type': 'text/html;charset=utf8'
                        });
                        res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    });
                });

                } 
                else {  // 조회된 레코드가 없는 경우 실패 응답 전송
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h1>로그인  실패</h1>');
                    res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
                    res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
                    res.end();
                }
            });
                    break;        
            }
        
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
};

var findInfo = function(database, paramName, paramNumber, callback){
	console.log('findInfo 호출됨 : ' + paramName + ', ' + paramNumber);
	
	// 커넥션 풀에서 연결 객체를 가져옴
	database.db.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            
            callback(err, null);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        // SQL 문을 실행합니다.
        var exec = conn.query("select * from student_grade where name = ? and userNumber = ?", [paramName, paramNumber], function(err, info) {
        	conn.release();  // 반드시 해제해야 함
        	console.log('실행 대상 SQL : ' + exec.sql);
        	
        	if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);
        		
        		callback(err, null);
        		
        		return;
        	}
        	
        	callback(null, info);
        	
        });
        
        conn.on('error', function(err) {      
              console.log('데이터베이스 연결 시 에러 발생함.');
              console.dir(err);
              
              callback(err, null);
        });
    });
	
}

var certificateProcessing = function(req, res) {
    
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    
    
	console.log('certificateProcessing 호출됨.');

    // 요청 파라미터 확인
    var paramId = req.user[0].name;
    var paramName = req.user[0].userNumber;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramName);

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
          
        var columns = '*';
        var tablename = 'request';
 
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where name = ? and userNumber = ?", [columns, tablename, paramId, paramName], function(err, rows) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log(rows[0]);
                res.render('./student/SchoolCertificate/ProcessingResults(SWE).ejs', {info : rows, num : rows.length});

            } else {
            	console.log("일치하는 사용자를 찾지 못함.");

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

var searchDate = function(req, res) {
    
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    
    
	console.log('SearchDate 호출됨.');

    // 요청 파라미터 확인
    var paramId = req.user[0].name;
    var paramName = req.user[0].userNumber;
    var sDate = req.body.start || req.query.start;
    var fDate = req.body.finish || req.query.finish;

	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramName + ', ' + sDate + ', ' + fDate);

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
          
        var columns = '*';
        var tablename = 'request';
 
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where name = ? and userNumber = ?", [columns, tablename, paramId, paramName], function(err, rows) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log(rows[0]);
                res.render('./student/SchoolCertificate/ProcessingResults(SWE).ejs', {info : rows, num : rows.length});

            } else {
            	console.log("일치하는 사용자를 찾지 못함.");

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


module.exports.showInfo = showInfo;
module.exports.showData = showData;
module.exports.selectCompany = selectCompany;
module.exports.request = request;
module.exports.certificateProcessing = certificateProcessing;
module.exports.searchDate = searchDate;
