Array.prototype.넣기 = Array.prototype.push;
Array.prototype.하나하나 = Array.prototype.forEach;
Array.prototype.태우기 = Array.prototype.map;
String.prototype.가르기 = String.prototype.split;
String.prototype.몇째칸 = String.prototype.indexOf;
String.prototype.잘라내기 = String.prototype.slice;
String.prototype.작은줄 = String.prototype.substring;
console.쓰기 = console.log;
ajaxRequester.가져오기 = ajaxRequester.request;
ajaxRequester.가르기 = ajaxRequester.getTokensFrom;
const 안고치손 = ajaxRequester; //안 고치고 가져오(AJAX)는 손

const 낱말 = function(말, 바꿈꼴, 밑, 붙임) {
	this.말 = 말; //낱말 글씨줄(문자열)
	this.바꿈꼴 = 바꿈꼴; //바꿈꼴, 사투리 글씨줄 늘넣이(배열)
	this.밑 = 밑; //말밑
	this.붙임 = 붙임; //아랫붙임(주)
};

const 다듬은말 = function(몇째, 늘들온말, 늘맨말) {
	this.몇째 = 몇째; //낱말이 말모이에서 몇 째인지 온셈이(정수)
	this.늘들온말 = 늘들온말; //낱말 늘넣이
	this.늘맨말 = 늘맨말; //낱말 늘넣이
};

const 말읽기 = function(안글) {
	안글 = 안글.가르기('/');
	return 안글.태우기(function(글) {
		만든것 = new 낱말();
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
		const 별 = 글.몇째칸('*');
		if(별 != -1) {
			만든것.붙임 = 글.잘라내기(별 + 1, 글.length);
			글 = 글.작은줄(0, 별);
		}
		만든것.말 = 글;
		return 만든것;
	});
};

const 줄읽기 = function(줄) {
	줄 = 줄.가르기(' ');
	return new 다듬은말(0, 말읽기(줄[0]), 말읽기(줄[1]));
};

const 말모이읽기 = function(되부름) {
	안고치손.가져오기("manuri.malmoi", function(안글) {
		const 늘낱말 = [];
		const 늘줄 = 안고치손.가르기(안글, null, '\n');
		늘줄.하나하나(function(줄) {
			if(줄[0] === '#')
				return;
			else if(줄[0] === '*')
				return; //TODO: footnote parsing
			else if(줄 === '')
				return; //TODO: parse sections?
			else
				늘낱말.넣기(줄읽기(줄));
		});
		되부름(늘낱말);
	});
};

const 말모이찾기 = function(말모이, 찾을말) {
	const 만든것 = [];
	말모이.하나하나(function(다듬하나) {
		count++;
		for(var ㅏ = 0;ㅏ < 다듬하나.늘들온말.length;ㅏ++) {
			if(다듬하나.늘들온말[ㅏ].말.몇째칸(찾을말) != -1) {
				만든것.넣기(다듬하나);
				break;
			}
		}
		if(만든것[만든것.length - 1] === 다듬하나)
			return;
		for(var ㅏ = 0;ㅏ < 다듬하나.늘맨말.length;ㅏ++) {
			if(다듬하나.늘맨말[ㅏ].말.몇째칸(찾을말) != -1) {
				만든것.넣기(다듬하나);
				break;
			}
		}
	});
	return 만든것;
};
