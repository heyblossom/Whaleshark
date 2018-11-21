/* eslint-disable*/

/*
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 * 
 * 데이터베이스 관련 객체들을 req.app.get('database')로 참조
 * 
 */


//===== Passport Authentication =====//

module.exports = function(app, passport) {

	// 홈 화면 - 로그인 링크
	app.get('/', function(req, res) {
		console.log('/ 패스 요청됨.');

		console.dir(req.user);
			
		if (req.user == undefined) {
			res.render('index.ejs', {login_success:false});
		} else {
			res.render('index.ejs', {login_success:true, user : req.user});
		}
	});

	//로그인 폼 링크
	app.get('/login', function(req, res) {
		console.log('/login 패스 요청됨.');
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	 
	// 회원가입 폼 링크
	app.get('/signup', function(req, res) {
		console.log('/signup 패스 요청됨.');
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	 
	// 프로필
	app.get('/profile', function(req, res) {
		if (!req.isAuthenticated()) {
			res.redirect('/');
		} else {
			console.log('/profile 패스 요청됨.');
			console.dir(req.user);		
            res.render('profile.ejs', {user : req.user});
		}
	});
	
	// 로그아웃
	app.get('/logout', function(req, res) {
		console.log('/logout 패스 요청됨.');
		req.logout();
		res.redirect('/');
	});


	// 패스포트 - 로컬 로그인 라우팅 
	app.post('/login', 
		passport.authenticate('local-login', {
			successRedirect : '/profile', 
			failureRedirect : '/login', 
			failureFlash : true 
		})
	);

	// 패스포트 - 로컬 회원가입 라우팅 
	app.post('/signup', 
		passport.authenticate('local-signup', {
			successRedirect : '/profile', 
			failureRedirect : '/signup', 
			failureFlash : true 
		})
	);
}
