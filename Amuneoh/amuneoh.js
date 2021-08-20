const 참 = true;
const 온셀얻어 = parseInt;
String.prototype.의두루째 = String.prototype.codePointAt;
String.prototype.큰글씨로 = String.prototype.toUpperCase;
String.prototype.작은줄 = String.prototype.substring;
String.두루째서 = String.fromCodePoint;
const 글줄 = String;

document.매기름로찾아 = document.getElementById;
document.걸러찾아 = document.querySelector;
const 누리쪽 = document;
EventTarget.prototype.귀더해 = EventTarget.prototype.addEventListener;
KeyboardEvent.prototype.꾸밈쇠채는 = KeyboardEvent.prototype.getModifierState;
Event.prototype.애이막아 = Event.prototype.preventDefault;

푼한글 = {
	이름: "외솔 풀어쓰기",
	글쇠이음: {
		'KeyR': '',
		'KeyS': '',
		'KeyE': '',
		'KeyF': '',
		'KeyA': '',
		'KeyQ': '',
		'KeyT': '',
		'KeyD': '',
		'KeyW': '',
		'KeyC': '',
		'KeyZ': '',
		'KeyX': '',
		'KeyV': '',
		'KeyG': '',
		'KeyK': '',
		'KeyI': '',
		'KeyJ': '',
		'KeyU': '',
		'KeyH': '',
		'KeyY': '',
		'KeyN': '',
		'KeyB': '',
		'KeyM': '',
		'KeyL': '',
		//'KeyO': '',
		//'KeyP': '',
		'KeyO': '',
		'KeyP': '',
		'BracketLeft': '',
		'BracketRight': '',
	},
	큰글씨로: function(글씨) {
		return 글줄.두루째서(글씨.의두루째(0) - 29);
	},
	도움말: `글꼴: <a href="https://github.com/Tzetachi/Oesol-Serif-deprecated">Oesol</a>, 라이선스 <a href="https://github.com/Tzetachi/Oesol-Serif-deprecated/blob/master/LICENSE">SIL Open Font License 1.1</a><br>
글쇠놓이는 <a href="https://github.com/armyb1rd/Oesol-key">Oesol-key</a>와 같습니다.<br>
ㅐ:  ㅔ:  ㅒ:  ㅖ:  ㅚ:  ㅟ: <br>
ㅘ:  ㅙ:  ㅝ:  ㅞ:  ㅢ: <br>
이미 모아쓴 글을 풀어쓰려면 <a href="https://gitlab.com/phost/python-tools/-/raw/master/풀라">풀라</a>와 <a href="https://gitlab.com/phost/python-tools/-/raw/master/풀크게">풀크게</a>를 써 보세요.`
};
키릴 = {
	이름: "러시아 키릴",
	글쇠이음: {
		'KeyF': 'а',
		'Comma': 'б',
		'KeyD': 'в',
		'KeyU': 'г',
		'KeyL': 'д',
		'KeyT': 'е',
		'Backquote': 'ё',
		'Semicolon': 'ж',
		'KeyP': 'з',
		'KeyB': 'и',
		'KeyQ': 'й',
		'KeyR': 'к',
		'KeyK': 'л',
		'KeyV': 'м',
		'KeyY': 'н',
		'KeyJ': 'о',
		'KeyG': 'п',
		'KeyH': 'р',
		'KeyC': 'с',
		'KeyN': 'т',
		'KeyE': 'у',
		'KeyA': 'ф',
		'BracketLeft': 'х',
		'KeyW': 'ц',
		'KeyX': 'ч',
		'KeyI': 'ш',
		'KeyO': 'щ',
		'BracketRight': 'ъ',
		'KeyS': 'ы',
		'KeyM': 'ь',
		'Quote': 'э',
		'Period': 'ю',
		'KeyZ': 'я',
		'Slash': '.',
	},
	큰글씨로: function(글씨) {
		return 글씨 === '.' ? ',' : 글씨.큰글씨로();
	},
	도움말: ""
};
오감 = {
	이름: "한말글 오감",
	글쇠이음: {
		'KeyB': 'ᚁ',
		'KeyL': 'ᚂ',
		'KeyW': 'ᚃ',
		'KeyS': 'ᚄ',
		'KeyN': 'ᚅ',
		'KeyY': 'ᚆ',
		'KeyD': 'ᚇ',
		'KeyT': 'ᚈ',
		'KeyK': 'ᚉ',
		'KeyJ': 'ᚊ',
		'KeyM': 'ᚋ',
		'KeyG': 'ᚌ',
		'KeyX': 'ᚍ',
		'KeyC': 'ᚎ',
		'KeyR': 'ᚏ',
		'KeyA': 'ᚐ',
		'KeyO': 'ᚑ',
		'KeyU': 'ᚒ',
		'KeyE': 'ᚓ',
		'KeyI': 'ᚔ',
		'KeyH': 'ᚕ',
		'KeyF': 'ᚖ',
		'KeyV': 'ᚗ',
		'KeyQ': 'ᚘ',
		'KeyZ': 'ᚙ',
		'KeyP': 'ᚚ',
		'Comma': '᚛',
		'Space': ' ',
		'Period': '᚜',
	},
	큰글씨로: function(글씨) {
		if(글씨 === '᚛') return ',';
		else if(글씨 === '᚜') return ' ';
		else return 글씨;
	},
	도움말: `한말글을 옮겨적기 쉽도록 소리를 조금 바꾼 오감입니다.<br>
ᚁᚂᚃᚄᚅ blwsn ᚆᚇᚈᚉᚊ ydtkj<br>
ᚋᚌᚍᚎᚏ mgㅇㅊr ᚐᚑᚒᚓᚔ aouei ᚕᚖᚗᚚ hㅓㅡp<br>
ᚍ: x ᚎ: c ᚖ: f ᚗ: v<br>
᚛: , ᚜: .  : 띄움 ,: &lt; 띄움: &gt;<br>
ᚘ과 ᚙ는 생김새가 마음에 안 들어 소리를 주진 않았지만 q, z로 쳐집니다.`
};


const 도움말바꿔 = function() {
	글쇠도움말.innerHTML = 넣을글들[온셀얻어(누리쪽.걸러찾아("input[name='넣을글']:checked").value)].도움말;
	켜끔도움말.innerText = 끄기걲시옷.checked ? "아무넣을 껐습니다." : "고른 글이 안 쳐지면 글쇠판/넣개를 쿼티로 맞춰 보세요."
};

const 넣을글들 = [푼한글, 키릴, 오감];

const 말치 = 누리쪽.매기름로찾아("말치");
const 글쇠도움말 = 누리쪽.매기름로찾아("글쇠도움말");
const 켜끔도움말 = 누리쪽.매기름로찾아("켜끔도움말");
const 끄기걲시옷 = 누리쪽.매기름로찾아("끄기걲시옷");
const 넣을글묶음 = 누리쪽.매기름로찾아("넣을글묶음");

var 스치 = "";
for(let ㅏ = 0;ㅏ < 넣을글들.length; ㅏ++) {
	스치 += `<label><input type="radio" name="넣을글" value="${ㅏ}" onchange="도움말바꿔();">${넣을글들[ㅏ].이름}</label> `;
}
넣을글묶음.innerHTML = 스치;
넣을글묶음.firstElementChild.firstElementChild.checked = 참;
도움말바꿔();

누리쪽.귀더해("keydown", function(일어남) {
	if(일어남.key === "Insert") {
		끄기걲시옷.checked = !끄기걲시옷.checked;
		도움말바꿔();
	}
});

말치.귀더해("keydown", function(일어남) {
	if(끄기걲시옷.checked) return;
	//왜인지 A-Z 글쇠는 윗글쇠가 눌리지 않아도 큼잠금이 켜져 있으면 일어남.꾸밈쇠채는("Shift")이 참이라 큼잠금+윗글쇠로 작글씨를 넣게는 못함
	const 큰글씨다 = 일어남.꾸밈쇠채는("CapsLock") || 일어남.꾸밈쇠채는("Shift");
	const 글쇠 = 일어남.code;
	const 넣을글 = 넣을글들[온셀얻어(누리쪽.걸러찾아("input[name='넣을글']:checked").value)];
	if(!일어남.ctrlKey && 넣을글.글쇠이음[글쇠]) {
		const 값 = 말치.value;
		const 자리 = 말치.selectionEnd;
		let 새글씨 = 넣을글.글쇠이음[글쇠];
		if(큰글씨다 && 넣을글.큰글씨로) 새글씨 = 넣을글.큰글씨로(새글씨);
		말치.value = 값.작은줄(0, 자리) + 새글씨 + 값.작은줄(자리, 값.length);
		말치.selectionEnd = 자리 + 새글씨.length;
		일어남.애이막아();
	}
});
