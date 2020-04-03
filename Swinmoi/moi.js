"use strict";

Array.prototype.넣기 = Array.prototype.push;
Array.prototype.하나하나 = Array.prototype.forEach;
Array.prototype.태우기 = Array.prototype.map;
Array.prototype.덧붙이기 = Array.prototype.concat;
Array.prototype.잘라내기 = Array.prototype.slice;
String.prototype.가르기 = String.prototype.split;
String.prototype.몇째칸 = String.prototype.indexOf;
String.prototype.잘라내기 = String.prototype.slice;
String.prototype.작은줄 = String.prototype.substring;
String.prototype.바꿔치기 = String.prototype.replace;
ajaxRequester.가르기 = ajaxRequester.getTokensFrom;
const 안고치손 = ajaxRequester; //안 고치고 가져오(AJAX)는 손
window.온셈이얻기 = window.parseInt;

const 낱말 = function(말, 바꿈꼴, 밑) {
	this.말 = 말; //낱말 글씨줄(문자열)
	this.바꿈꼴 = 바꿈꼴; //바꿈꼴, 사투리 글씨줄 늘넣이(배열)
	this.밑 = 밑; //말밑
};

const 다듬은말 = function(몇째, 늘들온말, 늘맨말, 붙임) {
	this.몇째 = 몇째; //낱말이 말모이에서 몇 째인지 온셈이(정수)
	this.늘들온말 = 늘들온말; //낱말 늘넣이
	this.늘맨말 = 늘맨말; //낱말 늘넣이
	this.붙임 = 붙임; //보기, 더하는말 따위
};

const 말읽기 = function(안글) {
	안글 = 안글.가르기('/');
	return 안글.태우기(function(글) {
		const 만든것 = new 낱말();
		const 앞작도림 = 글.몇째칸('('), 뒷작도림 = 글.몇째칸(')');
		if(앞작도림 != -1) {
			만든것.밑 = 글.잘라내기(앞작도림 + 1, 뒷작도림)
			글 = 글.작은줄(0, 앞작도림) + 글.작은줄(뒷작도림 + 1, 글.length);
		}
		const 앞큰도림 = 글.몇째칸('['), 뒷큰도림 = 글.몇째칸(']');
		if(앞큰도림 != -1) {
			만든것.바꿈꼴 = 글.잘라내기(앞큰도림 + 1, 뒷큰도림).가르기(',');
			글 = 글.작은줄(0, 앞큰도림) + 글.작은줄(뒷큰도림 + 1, 글.length);
		}
		만든것.말 = 글;
		return 만든것;
	});
};

const 줄읽기 = function(줄) {
	줄 = 줄.가르기(' ');
	줄 = 줄.태우기(function(마디) {
		return 마디.바꿔치기(/_/g, ' ');
	});
	return new 다듬은말(온셈이얻기(줄[0]), 말읽기(줄[1]), 말읽기(줄[2]));
};

const 붙임읽기 = function(안글) {
	const 몬붙임 = {};
	var 몇째;
	안고치손.가르기(안글, null, '\n').하나하나(function(줄) {
		if(줄[0] === '#') {
			몇째 = 줄.가르기(' ');
			몇째 = 몇째.잘라내기(1, 몇째.length);
			몇째.하나하나(function(째) {
				if(!몬붙임[째])
					몬붙임[째] = [];
			});
		}
		else if(줄 === '')
			return;
		else {
			몇째.하나하나(function(째) {
				몬붙임[째].넣기(줄);
			});
		}
	});
	return 몬붙임;
};

const 말모이아롬읽기 = function(안글, 몬붙임) {
	const 늘낱말 = [];
	const 늘줄 = 안고치손.가르기(안글, null, '\n');
	늘줄.하나하나(function(줄) {
		if(줄[0] === '#' || 줄[0] === '*')
			return;
		else if(줄 === '')
			return; //TODO: parse sections?
		else {
			const 읽은줄 = 줄읽기(줄);
			if(몬붙임[읽은줄.몇째])
				읽은줄.붙임 = 몬붙임[읽은줄.몇째];
			늘낱말.넣기(읽은줄);
		}
	});
	return 늘낱말;
};

/**늘낱말 안에 찾을말이 들어 있는 낱말이 있는지 찾습니다.
 * @param 늘낱말 {Array} - 늘낱말
 * @param 찾을말 {String} - 찾을 말
 * @returns {integer} 없으면 -1, 모두 맞는 낱말이 있으면 1, 조금 맞는 낱말이 있으면 0*/
const 늘낱말서찾기 = function(늘낱말, 찾을말) {
	for(var ㅏ = 0;ㅏ < 늘낱말.length;ㅏ++) {
		if(늘낱말[ㅏ].말 === 찾을말)
			return 1;
		else if(늘낱말[ㅏ].말.몇째칸(찾을말) != -1)
			return 0;
		else if(늘낱말[ㅏ].바꿈꼴) {
			for(var ㅑ = 0;ㅑ < 늘낱말[ㅏ].바꿈꼴.length;ㅑ++) {
				if(늘낱말[ㅏ].바꿈꼴[ㅑ] === 찾을말)
					return 1;
				else if(늘낱말[ㅏ].바꿈꼴[ㅑ].몇째칸(찾을말) != -1)
					return 0;
			}
		}
	}
	return -1;
};

/**말모이 안에 찾을말이 들어 있는 다듬은말을 모두 돌려줍니다.
 * @param 말모이 {Array} - 늘다듬은말
 * @param 찾을말 {String} - 찾을 말
 * @returns {Array} 늘다듬은말. 모두 맞는 낱말이 있는 다듬은말이 앞쪽에 나옵니다.*/
const 말모이서찾기 = function(말모이, 찾을말) {
	const 모두맞는것 = [];
	const 조금맞는것 = [];
	const 늘만든것 = [조금맞는것, 모두맞는것];
	말모이.하나하나(function(다듬하나) {
		var 찾았나 = 늘낱말서찾기(다듬하나.늘들온말, 찾을말);
		if(찾았나 >= 0) {
			늘만든것[찾았나].넣기(다듬하나);
			return;
		}
		찾았나 = 늘낱말서찾기(다듬하나.늘맨말, 찾을말);
		if(찾았나 >= 0) {
			늘만든것[찾았나].넣기(다듬하나);
		}
	});
	return 모두맞는것.덧붙이기(조금맞는것);
};
