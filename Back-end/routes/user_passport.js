/* eslint-disable*/

/*
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 * 
 * 데이터베이스 관련 객체들을 req.app.get('database')로 참조
 * 
 */


//===== Passport Authentication =====//

module.exports = function (app, passport) {

    // 홈 화면 - 로그인 링크
    app.get('/', function (req, res) {
        console.log('/ 패스 요청됨.');

        console.dir(req.user);

        if (req.user == undefined) {
            res.render('login(SWE).ejs', {
                login_success: false
            });
        } else {
            res.redirect('/process/bookmark');
        }
    });

    //로그인 폼 링크
    app.get('/login', function (req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login(SWE).ejs');
    });

    // 회원가입 폼 링크
    app.get('/signup', function (req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    app.get('/mainpage', function (req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            console.log('/mainpage 패스 요청됨.');
            console.dir(req.user[0].category);
            res.render('/process/bookmark', {user: req.user});        
        }
    });



    // 로그아웃
    app.get('/logout', function (req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });


    // 패스포트 - 로컬 로그인 라우팅 
    app.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/process/bookmark',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    // 패스포트 - 로컬 회원가입 라우팅 
    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true
        })
    );
    app.get('/bookmark', function (req, res) {
        console.log('/bookmark 패스 요청됨.');
        res.render('./student/Mainpage/bookmark(SWE).ejs');
    });

    app.get('/process/removebookmark/:x', function (req, res) {
        console.log('/bookmark 제거 요청됨.');
        var x = req.params['x'];
        res.redirect('/process/removebookmark/' + x);
    });
    
    app.get('/process/showInfo/:id', function (req, res) {
    console.log('/showData 요청됨.');
    var x = req.params['id'];
    res.redirect('/process/showInfo/' + x);
    });

    app.get('/process/showData/:id', function (req, res) {
    console.log('/showData 요청됨.');
    var x = req.params['id'];
    res.redirect('/process/showData/' + x);
    });

    
    app.get('/SearchPrint', function (req, res) {
        console.log('SearchPrint 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/SchoolCertificate/Certificate_Search&Print(SWE).ejs', {
                user: req.user
            });
        }
    });

    app.get('/SearchSubmit', function (req, res) {
        console.log('SearchSubmit 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/SchoolCertificate/Certificate_Search&Submit(SWE).ejs', {
                user: req.user
            });
        }
    });

    app.get('/certificateProcessing', function (req, res) {
        console.log('certificateProcessing 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.redirect('/process/certificateProcessing')
        }});
        

    app.get('/StudentEA', function (req, res) {
        console.log('StudentEA 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_EC_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentVW', function (req, res) {
        console.log('StudentVW 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_V_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentCA', function (req, res) {
        console.log('StudentCA 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_CA_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentCF', function (req, res) {
        console.log('StudentCF 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_C_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentSA', function (req, res) {
        console.log('StudentSA 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_SA_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentI', function (req, res) {
        console.log('StudentI 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_I_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentCS', function (req, res) {
        console.log('StudentCS 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/Student_SS_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/StudentPR', function (req, res) {
        console.log('StudentPR 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Portfolio/ProcessingResults(SWE).ejs', {
                user: req.user
            });
        }
    });

    app.get('/Write', function (req, res) {
        console.log('Write 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/ResearchNote/Student_WR_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/CheckSubmit', function (req, res) {
        console.log('CheckSubmit 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/ResearchNote/Student_SS_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/PR', function (req, res) {
        console.log('PR 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/ResearchNote/ProcessingResults(SWE).ejs', {
                user: req.user
            });
        }
    });

    app.get('/CD', function (req, res) {
        console.log('CD 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Calendar/Student_calendar_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/MCC', function (req, res) {
        console.log('MCC 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Calendar/Student_Mycalendar_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/MP', function (req, res) {
        console.log('MP 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./Student/Mypage/Student_mypage_SWE.ejs', {
                user: req.user
            });
        }
    });

    app.get('/SIS', function (req, res) {
        console.log('SIS 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.redirect('/process/SIS');
        }
    });
    
    app.get('/process/SendingInfo/:id&:id2', function (req, res) {
        console.log('/process/SendingInfo 요청됨.');
        var x = req.params['id'];
        var y = req.params['id2']
        console.log(x + "," + y);
        res.redirect('/process/showInfo/' + x +'&' + y);

        });


    app.get('/AP', function (req, res) {
        console.log('AP 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./School/Authentication/ApprovalofPortfolio.ejs', {
                user: req.user
            });
        }
    });

    
    app.get('/WRB', function (req, res) {
        console.log('WRB 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./School/Authentication/Writeinblockchain.ejs', {
                user: req.user
            });
        }
    });

    app.get('/SPR', function (req, res) {
        console.log('SPR 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.redirect('/process/SPR');
        }
    });
    
    app.get('/MCP', function (req, res) {
        console.log('MCP 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./School/BlockchainManagement/SearchParticipatingCompany.ejs', {
                user: req.user
            });
        }
    });

    app.get('/MCB', function (req, res) {
        console.log('MCB 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./School/BlockchainManagement/ManagementCompanies(School).ejs', {
                user: req.user
            });
        }
    });
    
    app.get('/CSB', function (req, res) {
        console.log('CSB 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./School/BlockchainManagement/blockchainManagement.ejs', {
                user: req.user
            });
        }
    });
    app.get('/SMP', function (req, res) {
        console.log('SMP 요청됨.');
        if (!req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('./School/Mypage/School_mypage.ejs', {
                user: req.user
            });
        }
    });
    

}
