//로그인 서버 <-> 스마트폰 POST 통신 AJAX 사용함.
function login() {
	console.log("로긴22");

	var action = $("#form1").attr('action');
	var form_data = {
		login_id : $("#login_id").val(),
		pwd : $("#login_pw").val()

	};
	$.ajax({
		type : "POST",
		url : action,
		data : form_data,
		success : function(response) {
			console.log(response);
			if (response == "successs") {
				$("#message").html(
						"<p style='color:green;font-weight:bold'>로그인 성공!</p>");
				$("#form1").slideUp('slow');
			} else {
				$("#message").html(
						"<p style='color:red'>아이디 또는 비밀번호가 잘못되었습니다.</p>");
			}
		}
	});
	return false;

}
//회원가입 서버 <-> 스마트폰 POST 통신 AJAX 사용함.
function joinmember() {
	console.log('가입22');
	var action = $("#form2").attr('action');
	var form_data = {
		member_group : 1,
		user_id : $("#user_id").val(),
		user_pass : $("#user_pass").val(),
		user_pass2 : $("#user_pass2").val(),
		user_name : $("#user_name").val(),
		user_nick : $("#user_nick").val(),
		user_email : $("#user_email").val(),
		user_hphone : $("#user_hphone").val(),
		user_birth_year : 2002,
		user_birth_month : 05,
		user_birth_day : 15,
		member_group : 16,
		email_forwarding : 'y',
		sms_forwarding : 'y',
		stats_open : 'y',
		group : 16

	};

	$.ajax({
		type : "POST",
		url : action,
		data : form_data,
		success : function(response) {
			console.log(response);
			if (response == 'successss') {
				alert('회원가입 성공');
			} else if (response == 'fail') {
				alert('회원가입 실패, 연결 불량');
			} else if (response == 'samedata') {
				alert('중복 아이디, 아이디를 재입력해주세요');
			} else {
				alert('원인불명 : ' + response);
			}
		}
	});
	return false;
}
function form1down() {
	$("#form1").slideDown('slow');
}
//서버에서 좌표정보를 수신받음 서버 <-> 스마트폰 POST 통신 AJAX 사용함.
function parse_codenet() {
	var form_data = {
		no : 1
	//좌표정보 요청을 위한 키값
	};

	$.ajax({
		type : "POST",
		data : form_data,
		url : "http://hyuns1234.dothome.co.kr/api/gps.php",
		dataType : "xml",
		async : false,
		success : function parse(xml) {
			$codes = $(xml).find("user");
			var codes_count = $codes.length;
			console.log(codes_count);

			$codes.each(function() {
				getlat.push($(this).find("lat").text());
				getlng.push($(this).find("lng").text());
			});
			//for (var i = 0; i < codes_count; i++) {
			//	console.log(getlat[i]);
			//	console.log(getlng[i]);
			//}
		}
	});
}