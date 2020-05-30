"use strict";

document.바가름로찾기 = document.getElementById;
const 누리쪽 = document;
History.prototype.간곳넣기 = History.prototype.pushState;
window.발자취 = window.history;
const 누리봄 = window;
EventTarget.prototype.귀더하기 = EventTarget.prototype.addEventListener;
URLSearchParams.prototype.있나 = URLSearchParams.prototype.has;
URLSearchParams.prototype.얻기 = URLSearchParams.prototype.get;
const 찾넘김읽개 = URLSearchParams;
ajaxRequester.다가져오기 = ajaxRequester.requestAll;
const 안고치손 = ajaxRequester; //안 고치고 가져오(AJAX)는 손

const 낱말모습만들기 = function(보여줄말) {
	var 만든것 = `<span class="말">${보여줄말.말}</span>`;
	if(보여줄말.밑)
		만든것 += `<span class="밑">${보여줄말.밑}</span>`;
	if(보여줄말.바꿈꼴)
		만든것 += `<span class="바꿈꼴">[${보여줄말.바꿈꼴}]</span>`;
	if(보여줄말.붙임)
		만든것 += `<sup>${보여줄말.붙임}</sup>`;
	만든것 += ', ';
	return 만든것;
};
/**
 * @param 보여줄말 {낱말} - 보여줄 낱말*/
const 다듬모습만들기 = function(보여줄말) {
	var 만든것 = "<p class=\"다듬은말줄\"><span class=\"들온말\">";
	보여줄말.늘들온말.하나하나(function(들온말) {
		만든것 += 낱말모습만들기(들온말);
	});
	만든것 = 만든것.작은줄(0, 만든것.length - 2);
	만든것 += "</span> -> <span class=\"맨말\">";
	보여줄말.늘맨말.하나하나(function(맨말) {
		만든것 += 낱말모습만들기(맨말);
	});
	만든것 = 만든것.작은줄(0, 만든것.length - 2); //마지막 쉼을 뗌
	if(보여줄말.붙임)
		만든것 += "</span></p><p class=\"붙임\">" + 보여줄말.붙임.join("<br>") + "</p>";
	else
		만든것 += "</span></p>";
	return 만든것;
};

/**
 @param 찾을말 {글씨줄} - 찾을 말*/
const 찾아모습만들기 = function(찾을말) {
	var 만든것 = '';
	var 찾을모이 = [흔한모이];
	if(안흔찾기.checked)
		찾을모이.넣기(안흔모이);
	if(엮맞찾기.checked)
		찾을모이.넣기(엮맞모이);
	찾을말 = 찾을말.빈곳깎기();
	//할것: 이걸 없애고 제대로 된 함께찾기를 만들 것
	if(찾을말.몇째(',') != -1) {
		찾을말 = 찾을말.가르기(',');
		var 만든것 = "";
		찾을말.하나하나(function(찾을말하나) {
			만든것 += 찾아모습만들기(찾을말하나);
		});
		return 만든것;
	}
	var 늘찾은말 = 말모이서찾기(찾을모이, 찾을말);
	if(늘찾은말.length === 0) {
		만든것 = `<p>'${찾을말}'은 우리 말모이에 없는 것 같습니다.<br>
		움직씨나 그림씨라면 -다 꼴로 찾아 보세요.<br>
		'안 흔한 말' '엮은이가 맞춘말'을 켜 보세요.</p>`;
	}
	늘찾은말.하나하나(function(찾은말) {
		만든것 += 다듬모습만들기(찾은말);
	});
	return 만든것;
};

//단추나 줄바꿈 누를 때
const 친말로찾기 = function() {
	const 찾을말 = 찾을말치.value;
	보여주는곳.innerHTML = 찾아모습만들기(찾을말);
	if(찾은말적어놓기.checked)
		누리봄.발자취.간곳넣기(null, null, 누리봄.location.pathname + `?q=${찾을말}`);
};

//새로 들어오거나 뒤로/앞으로 누를 때
const 찾넘김로찾기 = function() {
	const 찾넘김들 = new 찾넘김읽개(누리봄.location.search);
	if(찾넘김들.있나('q')) {
		var 찾을말 = 찾넘김들.얻기('q');
		찾을말치.value = 찾을말;
		보여주는곳.innerHTML = 찾아모습만들기(찾을말);
	}
}

var 흔한모이, 안흔모이, 엮맞모이;
var 얼마나갖 = 0;
const 보여주는곳 = 누리쪽.바가름로찾기("보여주는곳");
const 찾을말치 = 누리쪽.바가름로찾기("찾을말치");
const 안흔찾기 = 누리쪽.바가름로찾기("안흔찾기");
const 엮맞찾기 = 누리쪽.바가름로찾기("엮맞찾기");
const 찾은말적어놓기 = 누리쪽.바가름로찾기("찾은말적어놓기");
const 아로밀서모일로 = {
	"manuri.swin": "흔한모이",
	"anhen.swin": "안흔모이",
	"yemat.swin": "엮맞모이"
};

찾을말치.귀더하기("keydown", function(일어남) {
	if(일어남.key == "Enter")
		친말로찾기();
});
누리봄.onpopstate = 찾넘김로찾기;

안고치손.다가져오기(["manuri.swin", "anhen.swin", "yemat.swin"], function(읽은모이, 아로밀) {
	누리봄[아로밀서모일로[아로밀]] = 말모이아롬읽기(읽은모이);
	얼마나갖 += 1;
	if(얼마나갖 >= 3) {
		보여주는곳.innerHTML = "";
		찾넘김로찾기();
	}
});
