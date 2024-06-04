const choices = /** @type { HTMLCollectionOf<HTMLParagraphElement> } */ (document.getElementsByClassName(`choices`));
const karutaDiv = /** @type { HTMLCollectionOf<HTMLDivElement> } */ (document.getElementsByClassName(`karutaDiv`));
const lessons = /** @type { HTMLCollectionOf<HTMLDivElement> } */ (document.getElementsByClassName(`lesson`));
const sentences = /** @type { HTMLParagraphElement } */ (document.getElementsByClassName(`sentence`));
const check = /** @type { HTMLParagraphElement } */ (document.getElementsByClassName(`check`)[0]);
const btnDiv = /** @type { HTMLDivElement } */ (document.getElementsByClassName(`btnDiv`)[0]);
const quesText = /** @type { HTMLParagraphElement } */ (document.getElementById(`quesText`));
const question = /** @type { HTMLParagraphElement } */ (document.getElementById(`question`));
const field = /** @type { HTMLDivElement } */ (document.getElementsByClassName(`field`)[0]);
const typeArea = /** @type { HTMLTextAreaElement } */ (document.getElementById(`typeArea`));
const choicesDiv = /** @type { HTMLDivElement } */ (document.getElementById(`choicesDiv`));
const choiceQues = /** @type { HTMLDivElement } */ (document.getElementById(`choiceQues`));
const karutaQues = /** @type { HTMLDivElement } */ (document.getElementById(`karutaQues`));
const clearBtn = /** @type { HTMLParagraphElement } */ (document.getElementById(`clear`));
const quesField = /** @type { HTMLDivElement } */ (document.getElementById(`quesField`));
const lProg = /** @type { HTMLParagraphElement } */ (document.getElementById(`lProg`));
const typeQues = /** @type { HTMLDivElement } */ (document.getElementById(`typeQues`));
const outStage = /** @type { HTMLDivElement } */ (document.getElementById(`outStage`));
const sortQues = /** @type { HTMLDivElement } */ (document.getElementById(`sortQues`));
const resultEl = /** @type { HTMLDivElement } */ (document.getElementById(`result`));
const quesDiv = /** @type { HTMLDivElement } */ (document.getElementById(`quesDiv`));
const descDiv = /** @type { HTMLDivElement } */ (document.getElementById(`descDiv`));
const inStage = /** @type { HTMLDivElement } */ (document.getElementById(`inStage`));
const lBtn = /** @type { HTMLParagraphElement } */ (document.getElementById(`lBtn`));
const prog = /** @type { HTMLProgressElement } */ (document.getElementById(`prog`));
const hwQues = /** @type { HTMLDivElement } */ (document.getElementById(`hwQues`));
const winDiv = /** @type { HTMLDivElement } */ (document.getElementById(`winDiv`));
const chara = /** @type { HTMLImageElement } */ (document.getElementById(`chara`));
const ngs = /** @type { HTMLParagraphElement } */ (document.getElementById(`ngs`));
const ci = /** @type { HTMLOrSVGImageElement } */ (document.getElementById(`ci`));
const back = /** @type { HTMLImageElement } */ (document.getElementById(`back`));
const last = /** @type { HTMLDivElement } */ (document.getElementById(`last`));
const ngd = /** @type { HTMLDivElement } */ (document.getElementById(`ngd`));

const canvas = new handwriting.Canvas(document.getElementById(`hwCanvas`), 3);

const charaSrcs = [
    `./data/zari.png`,
    `./data/lily.png`,
    `./data/lin.png`,
    `./data/junior.png`,
    `./data/oscar.png`,
    `./data/lucy.png`,
    `./data/eddy.png`,
    `./data/vikram.png`,
];

const correct = new Audio(`./data/correct.wav`);
const wrong = new Audio(`./data/wrong.wav`);
const winSe = new Audio(`./data/win.wav`);

let fieldPlaces = [];
let answer = [];
let quesList = [];
let nowStage = 0;
let nowLevel = 0;
let quesId = 0;
let stage = 0;
let quesType = 0;
let selected = -1;
let selKaruta = -1;
let karutasCount = 0;
let inLesson = false;
let inMouse = false;
let moving = false;
let clear = false;
let edit = true;
let hwResult = ``;
let nowData = [];
let mouse = { x: 0, y: 0 };
let offset = { x: 0, y: 0 };

resultEl.style.display = `none`;
descDiv.style.display = `none`;
inStage.style.display = `none`;
winDiv.style.display = `none`;

const shuffle = array => {
    let i = array.length;
    while (0 < i) {
        i--;
        const randomIndex = Math.floor(Math.random() * i);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

const loadQues = q => {
    quesType = nowData[q][0];
    question.textContent = nowData[q][1];
    quesText.innerHTML = nowData[q][2].replaceAll(`[`, `<span class="sl">`).replaceAll(`]`, `</span>`);
    answer = [];
    karutasCount = 0;
    canvas.erase();
    typeArea.value = ``;
    const cc = choicesDiv.childElementCount;
    const fc = field.childElementCount;
    const csc = choices.length;
    const kc = [...karutaDiv].map(v => [...v.children]).flat().length;
    for (let i = 0; i < cc; i++) choicesDiv.childNodes[0].remove();
    for (let i = 0; i < fc; i++) if (field.childNodes[0] != last) field.childNodes[0].remove();
    for (let i = 0; i < csc; i++) choices[0].remove();
    for (let i = 0; i < kc; i++) [...karutaDiv].map(v => [...v.children]).flat()[0].remove();
    if (![2, 4].includes(quesType)) {
        let dataList = [];
        fieldPlaces = [];
        if (quesType == 3) {
            dataList = structuredClone(nowData[q][2]);
            if (quesType == 0 && 0 < nowData.filter((_v, i) => i != q && nowData[i][1] == nowData[q][1]).length) {
                for (let i = 0; i < 1 + Math.floor(Math.random() * dataList.length / 2); i++) {
                    let s;
                    do { s = nowData.filter(v => v[1] == nowData[q][1]).map(v => v[2]).flat()[Math.floor(Math.random() * nowData.filter(v => v[1] == nowData[q][1]).map(v => v[2]).flat().length)] } while (dataList.includes(s));
                    dataList.splice(Math.floor(Math.random() * dataList.length), 0, s);
                }
            }
            for (let i = 0; i < dataList.length; i++) answer.splice(Math.floor(Math.random() * i), 0, i);
            const quesList = new Array(dataList.length).fill(0).map((_v, i) => dataList[answer.map((_v, i) => answer.indexOf(i))[i]]);
            for (const v of quesList) {
                const sent = document.createElement(`p`);
                sent.classList.add(`karuta`);
                sent.textContent = v;
                (karutaDiv[0]).appendChild(sent);
                karutasCount++;
            }
        }
        dataList = structuredClone(nowData[q][3]);
        if (quesType == 0 && 0 < nowData.filter((_v, i) => i != q && nowData[i][0] == nowData[q][0] && nowData[i][1] == nowData[q][1]).length) {
            for (let i = 0; i < 1 + Math.floor(Math.random() * dataList.length / 2); i++) {
                let s;
                do { s = nowData.filter(v => v[1] == nowData[q][1]).map(v => v[3]).flat()[Math.floor(Math.random() * nowData.filter(v => v[1] == nowData[q][1]).map(v => v[3]).flat().length)] } while (dataList.includes(s));
                dataList.splice(Math.floor(Math.random() * dataList.length), 0, s);
            }
        }
        for (let i = 0; i < dataList.length; i++) answer.splice(Math.floor(Math.random() * i), 0, i);
        const quesList = new Array(dataList.length).fill(0).map((_v, i) => dataList[answer.map((_v, i) => answer.indexOf(i))[i]]);
        for (const v of quesList) {
            const sent = document.createElement(quesType == 0 ? `span` : `p`);
            sent.classList.add([`sentence`, `choices`, ``, `karuta`][quesType]);
            sent.textContent = v;
            ([choicesDiv, choiceQues, choicesDiv, karutaDiv[1]][quesType]).appendChild(sent);
        }
    }
    selected = -1;
    selKaruta = -1;
    sortQues.style.display = quesType == 0 ? `` : `none`;
    choiceQues.style.display = quesType == 1 ? `` : `none`;
    typeQues.style.display = quesType == 2 ? `` : `none`;
    karutaQues.style.display = quesType == 3 ? `` : `none`;
    quesField.style.display = quesType != 3 ? `` : `none`;
    hwQues.style.display = quesType == 4 ? `` : `none`;
}

const loadDisp = () => {
    chara.src = charaSrcs[Math.floor(Math.random() * charaSrcs.length)];
    if (check.classList.contains(`okc`)) check.classList.remove(`okc`);
    if (quesType == 0) {
        /** @type { Array<HTMLParagraphElement> } */([...sentences]).forEach((s, i) => {
        s.addEventListener(`mousedown`, () => {
            if (!s.classList.contains(`using`) && !moving && edit) {
                const cs = /** @type { HTMLParagraphElement } */ (field.insertBefore(s.cloneNode(1), last));
                let cs2;
                s.classList.add(`using`);
                let place;
                let offset;
                let init;
                const control = used => {
                    if (!moving && edit) {
                        moving = true;
                        cs2 = /** @type { HTMLParagraphElement } */ (field.insertBefore(s.cloneNode(1), last));
                        cs2.classList.add(`put`);
                        place = [...field.children].indexOf(cs2);
                        offset = { x: (used ? cs : s).offsetLeft - mouse.x - 5, y: (used ? cs : s).offsetTop - mouse.y - 5 };
                        init = { x: (used ? cs : s).offsetLeft, y: (used ? cs : s).offsetTop };
                        cs.style.position = `absolute`;
                        cs.style.zIndex = 1;
                        const frameFunc = () => {
                            cs.style.left = `${mouse.x + offset.x}px`;
                            cs.style.top = `${mouse.y + offset.y}px`;

                            if (0 < [...field.children].filter(v => !v.classList.contains(`put`)).length && mouse.y < field.offsetTop + field.clientHeight) {
                                let place2 = 0;
                                const fcns = /** @type { Array<HTMLParagraphElement> } */ ([...field.children].filter(v => !v.classList.contains(`put`)));
                                fcns.splice(fcns.indexOf(cs), 1);
                                while (place2 < fcns.length && fcns[place2].offsetLeft + fcns[place2].clientWidth / 2 <= mouse.x) place2++;
                                place2++;
                                if (place != place2) {
                                    place = place2;
                                    if (place - 1 == fcns.length) field.insertBefore(cs2, last);
                                    else field.insertBefore(cs2, fcns[place - 1]);
                                    [...field.children].forEach(v => { if (v.classList.contains(`put`) && v != last && v != cs2) v.remove() });
                                }
                            }

                            if (cs.style.position == `absolute` && moving) requestAnimationFrame(frameFunc);
                            else cs.style = { left: `0`, top: `15px` };
                        }
                        frameFunc();
                        const func = () => { upMouse(used, func) }
                        addEventListener(`mouseup`, func);
                    }
                }
                const upMouse = (used, func) => { // フィールドに配置
                    [...field.children].forEach(v => { if (v.classList.contains(`put`) && v != last) v.remove() });
                    removeEventListener(`mouseup`, func);
                    if (used && Math.abs(cs.offsetLeft - init.x) < cs.clientWidth / 2) {
                        fieldPlaces.splice([...field.children].indexOf(cs), 1);
                        cs.remove();
                        s.classList.remove(`using`);
                        if (fieldPlaces.length == 0) check.classList.remove(`okc`);
                    } else {
                        cs.style.position = `relative`;
                        if (place + 1 == field.children.length) field.insertBefore(cs, last);
                        else field.insertBefore(cs, field.children[place - 1]);
                        if (used) fieldPlaces.splice(fieldPlaces.indexOf(i), 1);
                        fieldPlaces.splice(place - 1, 0, i);
                        if (!used) {
                            if (fieldPlaces.length == 1) check.classList.add(`okc`);
                            cs.addEventListener(`mousedown`, () => { control(true) });
                        }
                    }
                    moving = false;
                }
                control(false);
            }
        });
    });
    } else if (quesType == 1) {
        [...choices].forEach((v, i) => {
            v.addEventListener(`click`, () => {
                if (-1 < selected) choices[selected].classList.remove(`selected`);
                else check.classList.add(`okc`);
                choices[i].classList.add(`selected`);
                selected = i;
            });
        });
    } else if (quesType == 2) {
        typeArea.addEventListener(`input`, () => {
            if (typeArea.value == ``) check.classList.remove(`okc`);
            else check.classList.add(`okc`);
        });
    } else if (quesType == 3) {
        [...karutaDiv].map(v => [...v.children]).flat().forEach((v, i) => {
            v.addEventListener(`click`, () => {
                if (!v.classList.contains(`correctKaruta`)) {
                    if (selKaruta == -1) {
                        v.classList.add(`selected`);
                        selKaruta = i;
                    } else if (selKaruta == i) {
                        v.classList.remove(`selected`);
                        selKaruta = -1;
                    } else if (selKaruta != i && selKaruta < 5 == i < 5) {
                        karutaDiv[Number(4 < selKaruta)].children[selKaruta % 5].classList.remove(`selected`);
                        v.classList.add(`selected`);
                        selKaruta = i;
                    } else {
                        if (
                            data[stage][quesList[quesId]][2].indexOf(i < 5 ? v.textContent : karutaDiv[Number(4 < selKaruta)].children[selKaruta % 5].textContent) ==
                            data[stage][quesList[quesId]][3].indexOf(4 < i ? v.textContent : karutaDiv[Number(4 < selKaruta)].children[selKaruta % 5].textContent)
                        ) {
                            karutaDiv[Number(4 < selKaruta)].children[selKaruta % 5].classList.add(`correctKaruta`);
                            karutaDiv[Number(4 < selKaruta)].children[selKaruta % 5].classList.remove(`selected`);
                            v.classList.add(`correctKaruta`);
                            karutasCount--;
                            if (karutasCount == 0) correctQues();
                        } else wrong.play();
                    }
                }
            });
        });
    }
}

addEventListener(`mousemove`, e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const correctQues = () => {
    check.classList.add(`okc`);
    edit = false;
    ci.src = `./data/okc.svg`;
    ci.style.left = `20px`;
    ngd.style.display = `none`;
    correct.play();
    if (quesId == quesList.length - 1) {
        setTimeout(() => { winSe.play() }, 750);
        quesDiv.style.display = `none`;
        winDiv.style.display = ``;
        clear = true;
    } else {
        btnDiv.classList.add(`correct`);
        resultEl.style.display = ``;
    }
}

const checkQues = () => {
    if (edit && check.classList.contains(`okc`)) {
        [...field.children].forEach(v => { if (v.classList.contains(`put`) && v != last) v.remove() });
        if (
            [
                [...field.children].filter(v => v != last).map(v => v.textContent).join(` `) == nowData[quesList[quesId]][3].join(` `),
                (selected == -1 ? `` : choices[selected].textContent) == nowData[quesList[quesId]][3][0],
                typeArea.value == nowData[quesList[quesId]][3][0],
                true,
                hwResult == nowData[quesList[quesId]][3][0]
            ][quesType]
        ) correctQues();
        else {
            edit = false;
            ci.src = `./data/ngc.svg`;
            ci.style.left = `25px`;
            ngs.textContent = [
                nowData[quesList[quesId]][3].join(` `),
                nowData[quesList[quesId]][3][0],
                nowData[quesList[quesId]][3][0],
                ``,
                nowData[quesList[quesId]][3][0]
            ][quesType];
            ngd.style.display = ``;
            wrong.play();
            check.classList.add(`ngc`);
            btnDiv.classList.add(`wrong`);
            resultEl.style.display = ``;
        }
        check.textContent = `CONTINUE`;
    } else if (check.classList.contains(`okc`) || check.classList.contains(`ngc`)) {
        if (clear) {
            inLesson = false;
            nowLevel++;
            if (nowLevel == 3) {
                nowLevel = 0;
                nowStage++;
                [...lessons].forEach((v, i) => { if (i <= nowStage) v.classList.remove(`ul`) });
            }
            inStage.style.display = `none`;
            outStage.style.display = ``;
        } else {
            edit = true;
            if (check.classList.contains(`ngc`)) quesList.push(quesList[quesId]);
            btnDiv.classList.remove(`correct`);
            btnDiv.classList.remove(`wrong`);
            check.classList.remove(`ngc`);
            resultEl.style.display = `none`;
            check.textContent = `CHECK`;
            quesId++;
            loadQues(quesList[quesId]);
            loadDisp(quesList[quesId]);
        }
    }
}

check.addEventListener(`click`, checkQues);
addEventListener(`keydown`, e => { if (e.key == `Enter` && inLesson) checkQues() });

const frameFunc = () => {
    const target = quesId == 0 ? 0 : quesId / quesList.length;
    prog.value = (prog.value - target) * 0.9 + target;
    requestAnimationFrame(frameFunc);
}

[...lessons].forEach((v, i) => {
    v.addEventListener(`mouseenter`, () => { inMouse = true });
    v.addEventListener(`mouseleave`, () => { inMouse = false });
    v.addEventListener(`click`, () => {
        if (i <= nowStage) {
            stage = i;
            lProg.textContent = i < nowStage ? `Lesson complete` : `Lesson ${nowLevel + 1} of 3`;
            descDiv.style.left = `${v.offsetLeft}px`;
            descDiv.style.top = `${v.offsetTop}px`;
            descDiv.style.display = ``;
        }
    });
});

addEventListener(`click`, () => { if (!inMouse) descDiv.style.display = `none` });

back.addEventListener(`click`, () => {
    inLesson = false;
    edit = true;
    btnDiv.classList.remove(`correct`);
    btnDiv.classList.remove(`wrong`);
    check.classList.remove(`ngc`);
    check.textContent = `CHECK`;
    resultEl.style.display = `none`;
    inStage.style.display = `none`;
    outStage.style.display = ``;
});

lBtn.addEventListener(`click`, () => {
    const algorithm = data[stage][stage == nowStage ? nowLevel : 2][0];
    nowData = data[stage][stage == nowStage ? nowLevel : 2];
    nowData = nowData.slice(1, nowData.length);
    inLesson = true;
    prog.value = 0;
    quesList = [];
    quesId = 0;
    if (algorithm == 1) quesList = new Array(nowData.length).fill(0).map((_v, i) => i);
    else if (algorithm == 2) quesList = new Array(nowData.length).fill([]).map((_v, i) => [i, ...shuffle(new Array(i).fill([]).map((_v, i2) => i2))]).flat();
    else for (let i = 0; i < nowData.length; i++) quesList.splice(Math.floor(Math.random() * i), 0, i);
    clear = false;
    loadQues(quesList[0]);
    loadDisp(quesList[0]);
    quesDiv.style.display = ``;
    winDiv.style.display = `none`;
    inStage.style.display = ``;
    outStage.style.display = `none`;
});

const maxCharacter = str => {
    const charMap = {};
    let maxNum = 0;
    let maxChar = "";
    str.split(``).forEach(char => {
        if (charMap[char]) charMap[char]++;
        else charMap[char] = 1;
    });
    for (const char in charMap) {
        if (maxNum < charMap[char]) {
            maxNum = charMap[char];
            maxChar = char;
        }
    }
    return maxChar;
}

canvas.setCallBack(data => {
    hwResult = data.join(``);
    hwResult = hwResult.match(/[^a-z ]/gi) ? maxCharacter(hwResult) : hwResult.slice(0, 1);
});

canvas.set_Undo_Redo(true, true);
canvas.cxt.canvas.addEventListener(`mousedown`, () => { check.classList.add(`okc`) });
canvas.cxt.canvas.addEventListener(`touchstart`, () => { check.classList.add(`okc`) });
canvas.cxt.canvas.addEventListener(`mouseleave`, () => {
    canvas.setOptions({ language: 'ja' });
    canvas.recognize();
});
canvas.cxt.canvas.addEventListener(`touchend`, () => {
    canvas.setOptions({ language: 'ja' });
    canvas.recognize();
});
clearBtn.addEventListener(`click`, () => {
    canvas.erase()
    check.classList.remove(`okc`);
});

[...lessons].forEach((v, i) => { if (i <= nowStage) v.classList.remove(`ul`) });
frameFunc();