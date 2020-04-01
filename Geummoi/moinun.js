var 말모이;
const 보여주는곳 = document.getElementById("보여주는곳");
const 찾을말치 = document.getElementById("찾을말치");

const 낱말모습만들기 = function(보여줄말) {
	var 만든것 = `<span class="말">${보여줄말.말}</span>`;
	if(보여줄말.밑)
		만든것 += `<span class="밑">${보여줄말.밑}</span>`;
	if(보여줄말.바꿈꼴)
		만든것 += `<span class="바꿈꼴">[${보여줄말.바꿈꼴}]</span>`;
	if(보여줄말.붙임)
		만든것 += `<sup>${보여줄말.붙임}</sup>`;
	만든것 += ',';
	return 만든것;
};
/**
 * @param 보여줄말 {낱말} - 보여줄 낱말*/
const 다듬모습만들기 = function(보여줄말) {
	var 만든것 = "<p class=\"다듬은말줄\"><span class=\"들온말\">";
	보여줄말.늘들온말.하나하나(function(들온말) {
		만든것 += 낱말모습만들기(들온말);
	});
	만든것 = 만든것.작은줄(0, 만든것.length - 1);
	만든것 += "</span> -> <span class=\"맨말\">";
	보여줄말.늘맨말.하나하나(function(맨말) {
		만든것 += 낱말모습만들기(맨말);
	});
	만든것 = 만든것.작은줄(0, 만든것.length - 1);
	만든것 += "</span></p>";
	return 만든것;
};

/**
 @param 찾을말 {String} - 찾을 말*/
const 찾아보여주기 = function(찾을말) {
	var 만든것 = '';
	말모이서찾기(말모이, 찾을말).하나하나(function(찾은말) {
		만든것 += 다듬모습만들기(찾은말);
	});
	보여주는곳.innerHTML = 만든것;
};

말모이읽기(function(만든것) {
	말모이 = 만든것;
});
