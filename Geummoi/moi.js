Array.prototype.넣기 = Array.prototype.push;
Array.prototype.하나하나 = Array.prototype.forEach;
Array.prototype.타기 = Array.prototype.map;
String.prototype.가르기 = String.prototype.split;
console.쓰기 = console.log;
ajaxRequester.가져오기 = ajaxRequester.request;
ajaxRequester.가르기 = ajaxRequester.getTokensFrom;
const 안고치손 = ajaxRequester; //안 고치고 가져오(AJAX)는 손

const 낱말 = function(몇째, 말, 바꿈꼴, 붙임) {
	this.몇째 = 몇째; //낱말이 말모이에서 몇 째인지
	this.말 = 말; //낱말 글씨줄(문자열)
	this.바꿈꼴 = 바꿈꼴; //바꿈꼴, 사투리 따위
	this.붙임 = 붙임; //아랫붙임(주)
};
const 들온말 = function(몇째, 말, 바꿈꼴, 뿌리, 붙임) {
	낱말.call(this, 몇째, 말, 바꿈꼴, 붙임);
	this.뿌리 = 뿌리; //말뿌리
};

const 다듬은말 = function(늘들온말, 늘낱말) {
	this.늘들온말 = 늘들온말;
	this.늘낱말 = 늘낱말;
}

const 들온말읽기 = function(글) {
	return new 들온말(0, 글);
};

const 맨말읽기 = function(글) {
	//글 = 글.replace(/ *\[(^])*\] */g, "")
	return new 낱말(0, 글, null, null);
};

const 말읽기 = function(안글, 읽는수) {
	안글 = 안글.가르기('/');
	return 안글.타기(읽는수);
}

const 줄읽기 = function(줄) {
	줄 = 줄.가르기(' ');
	return new 다듬은말(말읽기(줄[0], 들온말읽기), 말읽기(줄[1], 맨말읽기));
};

const 말모이읽기 = function(안글) {
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
	console.쓰기(늘낱말);
};

const 늘낱말 = [];

안고치손.가져오기("manuri.malmoi", 말모이읽기);
