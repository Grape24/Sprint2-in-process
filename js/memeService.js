'use strict'
const CURRMEME_KEY = 'currMeme';
let gKeywords = {};
let gNextId = 101;
let gImgs = createImages();
let gMeme = {
    selectedImgId: 0,
    selectedImgUrl: '',
    selectedTxt: 0,
    txts: [
        {   
            line: '',
            lineHeight: 30,
            fontSize: 16,
            align: 'center',
            color: 'white',
        },
        {
            line: '',
            lineHeight: 100,
            fontSize: 16,
            align: 'center',
            color: 'white',
        }
    ]
}

function createImages(){
    return [createImage('images/2.jpg'), createImage('images/004.jpg')]
}
function createImage(url){
    return {
        id: gNextId++,
        url,
        keywords: ['a', 'b']
    }
}

function findURLById(idx){
   let img =  gImgs.filter((img) => {
        return img.id === idx;
    })
    return img[0].url;
}

function selectImgById(idx){
    gMeme.selectedImgId = idx;
    let url = findURLById(idx);
    gMeme.selectedImgUrl = url;
    saveMemeToStorage();

}

function getCurrMemeUrl(){
    let gMeme = loadMemeFromStorage();
    return gMeme.selectedImgUrl;
}

function setMemeFontSize(size){
    gMeme.txts[0].fontSize = size;
    saveMemeToStorage();
}

function setMemeLineHeight(y){
    gMeme.txts[0].lineHeight = y;
    saveMemeToStorage()
}

function setMemeTxt(selectedTxt, Txt){
    gMeme.selectedTxt = selectedTxt;
    gMeme.txts[selectedTxt].line = Txt;
    saveMemeToStorage();
}
function getCurrText(){
    let gMeme = loadMemeFromStorage()
    return gMeme.txts[0].line;
}

function saveMemeToStorage(){
    saveToStorage(CURRMEME_KEY, gMeme);
}

function loadMemeFromStorage(){
    return loadFromStorage(CURRMEME_KEY);
}
