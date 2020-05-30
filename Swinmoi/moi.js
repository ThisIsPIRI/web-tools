"use strict";

Array.prototype.넣기 = Array.prototype.push;
Array.prototype.하나하나 = Array.prototype.forEach;
Array.prototype.태우기 = Array.prototype.map;
Array.prototype.덧붙이기 = Array.prototype.concat;
Array.prototype.잘라내기 = Array.prototype.slice;
String.prototype.가르기 = String.prototype.split;
String.prototype.몇째 = String.prototype.indexOf;
String.prototype.잘라내기 = String.prototype.slice;
String.prototype.작은줄 = String.prototype.substring;
String.prototype.바꿔치기 = String.prototype.replace;
String.prototype.빈곳깎기 = String.prototype.trim;
Math.큰것 = Math.max;
const 셈본 = Math;
const 온셀얻기 = window.parseInt;
const 참 = true;
const 거짓 = false;

const 낱말 = function(말, 바꿈꼴, 밑) {
	this.말 = 말; //낱말 글씨줄(문자열)
	this.바꿈꼴 = 바꿈꼴; //바꿈꼴, 사투리 글씨줄 늘넣이(배열)
	this.밑 = 밑; //말밑
};

const 다듬은말 = function(몇째, 늘들온말, 늘맨말, 붙임) {
	this.몇째 = 몇째; //낱말이 말모이에서 몇 째인지 온셀(정수)
	this.늘들온말 = 늘들온말; //낱말 늘넣이
	this.늘맨말 = 늘맨말; //낱말 늘넣이
	this.붙임 = 붙임; //보기, 더하는말 따위
};

const 가르고깎기 = function(글씨줄, 가를곳) {
	return 글씨줄.가르기(가를곳).태우기(function(갈린글) {
		return 갈린글.빈곳깎기();
	});
}

const 말읽기 = function(안글) {
	안글 = 안글.가르기('/');
	return 안글.태우기(function(글) {
		const 만든것 = new 낱말();
		const 앞작도림 = 글.몇째('('), 뒷작도림 = 글.몇째(')');
		if(앞작도림 != -1) {
			만든것.밑 = 글.잘라내기(앞작도림 + 1, 뒷작도림)
			글 = 글.작은줄(0, 앞작도림) + 글.작은줄(뒷작도림 + 1, 글.length);
		}
		const 앞큰도림 = 글.몇째('['), 뒷큰도림 = 글.몇째(']');
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
	return new 다듬은말(온셀얻기(줄[0]), 말읽기(줄[1]), 말읽기(줄[2]));
};

const 붙임읽기 = function(안글) {
	const 몬붙임 = {};
	var 몇째;
	가르고깎기(안글, '\n').하나하나(function(줄) {
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

const 말모이아롬읽기 = function(안글) {
	안글 = 안글.가르기("++++++보기와 붙임++++++\n");
	const 몬붙임 = 붙임읽기(안글[1]);
	const 늘낱말 = [];
	const 늘줄 = 가르고깎기(안글[0], '\n');
	늘줄.하나하나(function(줄) {
		if(줄 === '' || 줄[0] === '#' || 줄[0] === '*')
			return;
		else {
			const 읽은줄 = 줄읽기(줄);
			if(몬붙임[읽은줄.몇째])
				읽은줄.붙임 = 몬붙임[읽은줄.몇째];
			늘낱말.넣기(읽은줄);
		}
	});
	return 늘낱말;
};

const 글씨줄서찾기 = function(줄, 찾을말) {
	if(줄 === 찾을말)
		 return 1;
	else if(줄.몇째(찾을말) != -1)
		return 0;
	else return -1;
};

/**늘낱말 안에 찾을말이 들어 있는 낱말이 있는지 찾습니다.
 * @param 늘낱말 {늘넣이} - 늘낱말
 * @param 찾을말 {글씨줄} - 찾을 말
 * @returns {온셀} 없으면 -1, 모두 맞는 낱말이 있으면 1, 조금 맞는 낱말이 있으면 0*/
const 늘낱말서찾기 = function(늘낱말, 찾을말) {
	var 찾았나 = -1;
	for(var ㅏ = 0;ㅏ < 늘낱말.length;ㅏ++) {
		찾았나 = 셈본.큰것(찾았나, 글씨줄서찾기(늘낱말[ㅏ].말, 찾을말));
		if(늘낱말[ㅏ].바꿈꼴) {
			for(var ㅑ = 0;ㅑ < 늘낱말[ㅏ].바꿈꼴.length;ㅑ++) {
				찾았나 = 셈본.큰것(찾았나, 글씨줄서찾기(늘낱말[ㅏ].바꿈꼴[ㅑ], 찾을말));
			}
		}
	}
	return 찾았나;
};

//할것: 더 빠르게
/**말모이 안에 찾을말이 들어 있는 다듬은말을 모두 돌려줍니다.
 * @param 늘말모이 {늘넣이} - 늘늘다듬은말
 * @param 찾을말 {글씨줄} - 찾을 말
 * @param 애쓰지말까 {참거짓} - 참이면 찾은 말이 없어도 말끝 '하다'와 '되다'를 지워 다시 찾지 않습니다.
 * @returns {늘넣이} 늘다듬은말. 모두 맞는 낱말이 있는 다듬은말이 앞쪽에 나옵니다.*/
const 말모이서찾기 = function(늘말모이, 찾을말, 애쓰지말까) {
	const 모두맞는것 = [];
	const 조금맞는것 = [];
	const 늘만든것 = [조금맞는것, 모두맞는것];
	늘말모이.하나하나(function(말모이) {
		말모이.하나하나(function(다듬하나) {
			var 찾았나 = 셈본.큰것(늘낱말서찾기(다듬하나.늘들온말, 찾을말), 늘낱말서찾기(다듬하나.늘맨말, 찾을말));
			if(찾았나 >= 0) {
				늘만든것[찾았나].넣기(다듬하나);
			}
		});
	});
	var 만든것 = 모두맞는것.덧붙이기(조금맞는것);
	if(!애쓰지말까 && 만든것.length === 0) {
		const 찾을말끝 = 찾을말.작은줄(찾을말.length - 2, 찾을말.length);
		if(찾을말끝 === "하다" || 찾을말끝 === "되다")
			만든것 = 말모이서찾기(늘말모이, 찾을말.작은줄(0, 찾을말.length - 2), 참);
	}
	return 만든것;
};
