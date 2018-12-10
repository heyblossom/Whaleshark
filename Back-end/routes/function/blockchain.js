/*eslint-disable*/



var submitSIS = function (req, res) {


    console.log('submitSIS 호출됨.');
        var paramName = req.user[0].name;
        var paramNumber = req.user[0].userNumber;
        var approve = req.body.apr||req.query.apr||req.params.apr;
        var refuse = req.body.ref||req.query.ref||req.params.ref;

    if(approve != "null")
    //여기서 블록체인이랑 연결해야함
    {console.log(approve);
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {


        console.log('Procssing Results Refues 호출됨.');

        var refsplit = approve.split(',');
        var option="";
        for ( var i=0; i<refsplit.length-1; i++) {
            option = option + "id=" +refsplit[i];
        }
        
        var database = req.app.get('database');

        database.db.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 함
                }
                console.log(err);
                return;
            }
            
            // SQL 문을 실행합니다.
            var exec = conn.query("select data from request where " + option , function (err, rows) {
                conn.release(); // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);

                conn.on('error', function (err) {
                    console.log('데이터베이스 연결 시 에러 발생함.');
                
                    return;
                });
            	console.log(rows);

            });
                  
            });
        
    }
     
    
    }
    
    if(refuse != "null"){
            if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {

        console.log('Procssing Results Refues 호출됨.');

        var refsplit = refuse.split(',');
        var option="";
        for ( var i=0; i<refsplit.length-1; i++) {
            option = option + "id=" +refsplit[i];
        }
        
        var database = req.app.get('database');

        database.db.getConnection(function (err, conn) {
            if (err) {
                if (conn) {
                    conn.release(); // 반드시 해제해야 함
                }
                console.log(err);
                return;
            }
        
            // SQL 문을 실행합니다.
            var exec = conn.query("update request set state='Refused' where " + option , function (err, rows) {
                conn.release(); // 반드시 해제해야 함
                console.log('실행 대상 SQL : ' + exec.sql);

                conn.on('error', function (err) {
                    console.log('데이터베이스 연결 시 에러 발생함.');
                
                    return;
                });
            });
                  
            });
        
    }}
    
    res.redirect('/SIS');

};


var SPR = function(req, res) {
    
    if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
		    
    
	console.log('SPR 호출됨.');

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
        var exec = conn.query("select * from request where state='Refused' or state='Approved'", function(err, rows) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log(rows[0]);
                res.render('./School/Authentication/ProcessingResults.ejs', {info : rows, num : rows.length});

            } else {
                res.render('./School/Authentication/ProcessingResults.ejs', {num : 0});
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






module.exports.submitSIS = submitSIS;
module.exports.SPR = SPR;

