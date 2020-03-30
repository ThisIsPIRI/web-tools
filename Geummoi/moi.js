const 낱말 = function(몇째, 말, 바꿈꼴, 붙임) {
	this.몇째 = 몇째; //낱말이 말모이에서 몇 째인지
	this.말 = 말; //낱말 글씨줄(문자열)
	this.바꿈꼴 = 바꿈꼴; //바꿈꼴, 사투리 따위
	this.붙임 = 붙임; //아랫붙임(주)
}
const 들온말 = function(몇째, 말, 바꿈꼴, 뿌리, 붙임) {
	낱말.call(this, 몇째, 말, 바꿈꼴, 붙임);
	this.뿌리 = 뿌리; //말뿌리
}

const acceptMalmoi = function(content) {
	
}

ajaxRequester.request("manuri.malmoi", acceptMalmoi);
