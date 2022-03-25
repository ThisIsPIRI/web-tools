"use strict";

document.바가름로찾기 = document.getElementById;
document.걸러찾기 = document.querySelector;
document.이루조각만들기 = document.createElement;
const 누리쪽 = document;
Node.prototype.아이더하기 = Node.prototype.appendChild;
Element.prototype.더하기 = Element.prototype.append;
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
		만든것 += "</span></p><p class=\"붙임\">" + 보여줄말.붙임.글로잇기("<br>") + "</p>";
	else
		만든것 += "</span></p>";
	return 만든것;
};

/**
 @param 찾을말 {글씨줄} - 찾을 말*/
const 찾아모습만들기 = function(찾을말) {
	var 만든것 = '';
	var 찾을모이 = [];
	for(let ㅏ = 0; ㅏ < 늘모이숨김.length;ㅏ++) {
		if(늘모이숨김[ㅏ] === 없음 || 늘모이숨김[ㅏ].checked) {
			찾을모이.넣기(늘모이[ㅏ]);
		}
	}
	찾을말 = 찾을말.빈곳깎기();
	//할것: 이걸 없애고 제대로 된 함께찾기를 만들 것
	if(찾을말.서몇째(',') != -1) {
		찾을말 = 찾을말.가르기(',');
		var 만든것 = "";
		찾을말.하나하나(function(찾을말하나) {
			만든것 += 찾아모습만들기(찾을말하나);
		});
		return 만든것;
	}
	var 똑같은것만 = 거짓;
	//찾을말 === '"'일 때도 참이 되나 "가 들어가는 낱말이 없으니 사이없음
	if(찾을말[0] === '"' && 찾을말[찾을말.length - 1] === '"') {
		똑같은것만 = 참;
		찾을말 = 찾을말.작은줄(0, 찾을말.length - 1).작은줄(1, 찾을말.length);
	}
	const 어디서찾 = 누리쪽.걸러찾기("input[name='어디서찾']:checked").value;
	const 늘찾은말 = 말모이서찾기(찾을모이, 찾을말, 똑같은것만, 말모이서찾기[어디서찾]);
	if(늘찾은말.length === 0) {
		const 따옴 = 똑같은것만 ? '"' : '\'';
		const 따옴떼고 = 똑같은것만 ? "큰따옴(\")을 떼고 찾아 보세요.<br>" : "";
		const 모두서누르고 = 어디서찾 !== "모두서" ? "'모두서'를 누르고 찾아 보세요.<br>" : "";
		let 모이켜고 = "";
		for(let ㅏ = 0;ㅏ < 늘모이숨김.length;ㅏ++) {
			if(늘모이숨김[ㅏ] !== 없음 && !늘모이숨김[ㅏ].checked) 모이켜고 += `'${늘모이름[ㅏ]}' `;
		};
		if(모이켜고 !== "") 모이켜고 += "을 켜 보세요.<br>";
		만든것 = `<p>${따옴}${찾을말}${따옴}은 이 말모이에 없는 것 같습니다.<br>
		${따옴떼고} ${모두서누르고} ${모이켜고}
		움직씨나 그림씨라면 -다 꼴로 찾아 보세요.</p>`;
	}
	else 늘찾은말.하나하나(function(찾은말) {
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
};

const 보여주는곳 = 누리쪽.바가름로찾기("보여주는곳");
const 찾을말치 = 누리쪽.바가름로찾기("찾을말치");
const 찾은말적어놓기 = 누리쪽.바가름로찾기("찾은말적어놓기");
const 모이숨김묶음 = 누리쪽.바가름로찾기("모이숨김묶음");

const 늘모이 = [];
const 늘모이름 = [];
const 늘모이숨김 = [];
var 얼마나갖 = 0;
const 늘아롬이름 = ["manuri.swin", "yemat.swin"]; //말모이아롬읽기가 돌려주는 잇그림으로 덮어쓰임.

찾을말치.귀더하기("keydown", function(일어남) {
	if(일어남.key == "Enter")
		친말로찾기();
});
누리봄.onpopstate = 찾넘김로찾기;

안고치손.다가져오기(늘아롬이름, function(읽은글, 아롬이름) {
	늘아롬이름[늘아롬이름.서몇째(아롬이름)] = 말모이아롬읽기(읽은글);
	얼마나갖 += 1;
	if(얼마나갖 >= 늘아롬이름.length) {
		for(let ㅏ = 0;ㅏ < 늘아롬이름.length;ㅏ++) {
			늘아롬이름[ㅏ].하나하나(function(값, 열쇠) {
				늘모이.넣기(값);
				늘모이름.넣기(열쇠);
				if(열쇠 !== 말모이아롬읽기.갈래없음) {
					const 무엇글 = 누리쪽.이루조각만들기("label");
					const 걲시옷 = 누리쪽.이루조각만들기("input");
					걲시옷.type = "checkbox";
					걲시옷.checked = 참;
					무엇글.아이더하기(걲시옷);
					무엇글.더하기(열쇠);
					모이숨김묶음.아이더하기(무엇글);
					늘모이숨김.넣기(걲시옷);
				}
				else 늘모이숨김.넣기(없음);
			});
		}
		보여주는곳.innerHTML = "";
		찾넘김로찾기();
	}
});
