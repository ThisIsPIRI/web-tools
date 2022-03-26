const 참 = true;
const 거짓 = false;
const 없음 = null;
const 온셀얻어 = parseInt;
String.prototype.의두루째 = String.prototype.codePointAt;
String.prototype.큰글씨로 = String.prototype.toUpperCase;
String.prototype.작은줄 = String.prototype.substring;
String.두루째서 = String.fromCodePoint;
const 글줄 = String;
Array.prototype.넣어 = Array.prototype.push;
Array.prototype.태워 = Array.prototype.map;
Array.prototype.걸러 = Array.prototype.filter;
Array.prototype.글로이어 = Array.prototype.join;
Array.prototype.붙여 = Array.prototype.splice;
Array.prototype.서몇째 = Array.prototype.indexOf;
Promise.prototype.그리고 = Promise.prototype.then;
Promise.prototype.안되면 = Promise.prototype.catch;
Promise.다기다려 = Promise.allSettled;
const 다짐 = Promise;

FileReader.prototype.DataURL로읽어 = FileReader.prototype.readAsDataURL;
const 아롬읽개 = FileReader;
FontFace.prototype.불러와 = FontFace.prototype.load;
const 글겉 = FontFace;
FontFaceSet.prototype.더해 = FontFaceSet.prototype.add;
document.매기름로찾아 = document.getElementById;
document.걸러찾아 = document.querySelector;
const 누리쪽 = document;
EventTarget.prototype.귀더해 = EventTarget.prototype.addEventListener;
KeyboardEvent.prototype.꾸밈쇠채는 = KeyboardEvent.prototype.getModifierState;
Event.prototype.애이막아 = Event.prototype.preventDefault;
const 막고알려 = alert;

OrderedCheckGroup.prototype.걲시옷더해 = OrderedCheckGroup.prototype.addOption;
OrderedCheckGroup.prototype.톡 = OrderedCheckGroup.prototype.toggle;
const 늘옴걲시옷무리 = OrderedCheckGroup;


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
	도움말: `<a href="https://github.com/Tzetachi/Computer-Modern-Unicode-Oesol">CMUO</a>, <a href="https://github.com/Tzetachi/Oesol-Serif-deprecated">Oesol</a> 글꼴: 라이선스 <a href="https://github.com/Tzetachi/Computer-Modern-Unicode-Oesol/blob/master/LICENSE">SIL Open Font License 1.1</a><br>
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



const 글꼴건사 = function(늘씌울곳) {
	this.늘씌울곳 = 늘씌울곳;
	this.늘글꼴 = [];
	this.읽개 = new 아롬읽개();
};
글꼴건사.prototype._글꼴더해 = async function(url, 이름) {
	const 몇째 = this.늘글꼴.length;
	//여러 글꼴을 더할 때 늘옴 뒤바뀜을 막는다. 불러와()가 그르치면 글꼴씌워()에서 늘글꼴을 걸러야 하인다.
	this.늘글꼴.넣어(없음);
	const 새글꼴매기름 = `custom-${몇째}`;
	const 새글겉 = new 글겉(새글꼴매기름, `url('${url}')`);
	await 새글겉.불러와();
	this.늘글꼴[몇째] = new 글꼴건사.글꼴(이름, 새글꼴매기름);
	누리쪽.fonts.더해(새글겉);
};
/**글꼴을 더한다.
 * @param 아롬 {글줄 또는 File} - 글줄이면 그대로 쓰고 File이면 data URL로 바꿔 쓴다.
 * @param 이름 {글줄} - 아롬이 글줄이면 글꼴 이름으로 쓰고 File이면 쓰지 않는다.*/
글꼴건사.prototype.글꼴더해 = async function(아롬, 이름) {
	if(typeof 아롬 === "string") {
		await this._글꼴더해(아롬, 이름);
	}
	else {
		const 읽은것 = await 글꼴건사.아롬읽어(아롬, this.읽개);
		await this._글꼴더해(읽은것, 아롬.name);
	}
};
글꼴건사.prototype.글꼴씌워 = function(늘씌울글꼴) {
	const 있는글꼴 = this.늘글꼴.걸러(ㄱ => ㄱ != 없음);
	const ㄱ줄 = 늘씌울글꼴.태워(ㄱ => 있는글꼴[ㄱ].매기름).글로이어(',');
	for(let ㅏ = 0;ㅏ < this.늘씌울곳.length;ㅏ++) {
		this.늘씌울곳[ㅏ].style["font-family"] = ㄱ줄;
	}
};
글꼴건사.글꼴 = function(이름, 매기름) {
	this.이름 = 이름;
	this.매기름 = 매기름;
};
글꼴건사.아롬읽어 = function(아롬, 읽개) {
	return new 다짐((함, 못함) => {
		읽개.onload = 일어남 => 함(일어남.currentTarget.result);
		읽개.onerror = 일어남 => 못함(일어남.currentTarget.error);
		읽개.DataURL로읽어(아롬);
	});
};



const 도움말바꿔 = function() {
	글쇠도움말.innerHTML = 넣을글들[온셀얻어(누리쪽.걸러찾아("input[name='넣을글']:checked").value)].도움말;
	켜끔도움말.innerText = 끄기걲시옷.checked ? "아무넣을 껐습니다." : "고른 글이 안 쳐지면 글쇠판/넣개를 쿼티로 맞춰 보세요."
};

const 넣을글들 = [푼한글, 키릴, 오감];

const ㄱ꼴건사 = new 글꼴건사([누리쪽.걸러찾아("textarea")]); //[누리쪽.styleSheets[0].cssRules[2]]);
const 걲시옷무리 = new 늘옴걲시옷무리(누리쪽.매기름로찾아("글꼴켜끄기"), [], (_0, _1, 늘켤것) => {
	ㄱ꼴건사.글꼴씌워(늘켤것);
});
const 늘미리맞글꼴 = [
	{찾는길: "CMUOSerif-Hangulman.otf", 이름: "CMUO"},
	{찾는길: "OesolSerif-RegularVer1.1.ttf", 이름: "Oesol"}
];
다짐.다기다려(늘미리맞글꼴.태워(ㄱ => ㄱ꼴건사.글꼴더해(ㄱ.찾는길, ㄱ.이름))).그리고((늘열매) => {
	let 하나라도 = 거짓;
	for(let ㅏ = 0;ㅏ < 늘열매.length;ㅏ++) {
		if(늘열매[ㅏ].status === "fulfilled") {
			하나라도 = 참;
			걲시옷무리.걲시옷더해(늘미리맞글꼴[ㅏ].이름);
		}
	}
	if(하나라도)
		걲시옷무리.톡(0, 참);
	else
		막고알려("풀어쓰기 글꼴을 불러오지 못했습니다. 풀어쓴 한글을 보려면 '다른 글꼴 씌우기' 단추로 글꼴을 불러와 주세요.");
});

const 말치 = 누리쪽.매기름로찾아("말치");
const 글쇠도움말 = 누리쪽.매기름로찾아("글쇠도움말");
const 켜끔도움말 = 누리쪽.매기름로찾아("켜끔도움말");
const 끄기걲시옷 = 누리쪽.매기름로찾아("끄기걲시옷");
const 넣을글묶음 = 누리쪽.매기름로찾아("넣을글묶음");
const 글꼴아롬 = 누리쪽.매기름로찾아("글꼴아롬");

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

글꼴아롬.귀더해("change", function(일어남) {
	const ㅇ롬 = 글꼴아롬.files[0];
	ㄱ꼴건사.글꼴더해(ㅇ롬).그리고((_) => {
		걲시옷무리.걲시옷더해(ㅇ롬.name);
		걲시옷무리.톡(-1, 참);
	}).안되면((_) => {
		막고알려(`글꼴 ${ㅇ롬.name}을 불러오지 못했습니다`);
	});
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
