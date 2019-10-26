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
            lineHeight: 80,
            lineX: 200,
            fontSize: 60,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact'
        }
    ]
}

function createImages(){
    return [createImage('images/2.jpg'), createImage('images/003.jpg'),
            createImage('images/004.jpg'), createImage('images/005.jpg'),
            createImage('images/5.jpg'), createImage('images/006.jpg'),
            createImage('images/8.jpg'), createImage('images/9.jpg'),
            createImage('images/12.jpg'), createImage('images/19.jpg'),
            createImage('images/Ancient-Aliens.jpg'), createImage('images/drevil.jpg'),
            createImage('images/img2.jpg'), createImage('images/img4.jpg'),
            createImage('images/img5.jpg'), createImage('images/img6.jpg'),
            createImage('images/img11.jpg'), createImage('images/leo.jpg'),
            createImage('images/meme1.jpg'), createImage('images/One-Does-Not-Simply.jpg'),
            createImage('images/Oprah-You-Get-A.jpg'), createImage('images/patrick.jpg'),
            createImage('images/putin.jpg'), createImage('images/X-Everywhere.jpg'),]
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


function setMemeFontSize(size, idx){
    gMeme.txts[idx].fontSize = size;
    saveMemeToStorage();
}

function setMemeLineHeight(y, idx){
    gMeme.txts[idx].lineHeight = y;
    saveMemeToStorage()
}

function setMemeTxt(selectedTxt, Txt){
    gMeme.selectedTxt = selectedTxt;
    gMeme.txts[selectedTxt].line = Txt;
    saveMemeToStorage();
}

function increaseMemeIdx(){
    if (gMeme.txts.length === 0)return;
    gMeme.selectedTxt++;
    saveMemeToStorage();
}

function addTxts(idx){
    if(idx === 0){
        var newTxt = { 
                line: '',
                lineHeight: 80,
                lineX: 200,
                fontSize: 60,
                align: 'center',
                color: 'white',
                stroke: 'black',
                font: 'Impact'
        }
    }
    if(idx === 1){
        newTxt = {
                line: '',
                lineHeight: 370,
                lineX: 200, 
                fontSize: 60,
                align: 'center',
                color: 'white',
                stroke: 'black',
                font: 'Impact'
        }
     }
    if (idx > 1) 
        {newTxt = { line: '',
                    lineHeight: 210,
                    lineX: 200, 
                    fontSize: 60,
                    align: 'center',
                    color: 'white',
                    stroke: 'black',
                    font: 'Impact'}
    }
    let txts = gMeme.txts;
    txts.push(newTxt);
    saveMemeToStorage();
}

function setMemeTxtsIdx(newIdx){
    gMeme.selectedTxt = newIdx;
    saveMemeToStorage();
}

function setMemeTxtAlignment(idx, alignment){
    gMeme.txts[idx].align = alignment;
    saveMemeToStorage();
}

function setMemeProperty(idx, property, value){
    gMeme.txts[idx][property] = value;
    saveMemeToStorage();
}

function getCurrText(idx){
    let gMeme = loadMemeFromStorage()
    return gMeme.txts[idx].line;
}

function removeLine(idx){
    gMeme.txts.splice(idx, 1);
    if (idx > 0){
        gMeme.selectedTxt = idx-1;
    }
    else gMeme.selectedTxt = 0;
    saveMemeToStorage();
}

function findUnselectedTextsIdx(selectedTxtIdx){
    let unselectedIdxs = []
    gMeme.txts.findIndex((line, idx) => {
       if(idx !== selectedTxtIdx){
            unselectedIdxs.push(idx)
       };
    }); 
    return unselectedIdxs;
}

function findIdxs(){
    let idxs = []
    let length = gMeme.txts.length;
    for(let i = 0; i < length; i++){
        idxs.push(i);
    }
    return idxs;
}

function getSelectedTxtLength(){
    let gMeme = loadMemeFromStorage()
    return gMeme.txts.length;
}

function getSelectedTxt(){
    let gMeme = loadMemeFromStorage();
    return gMeme.selectedTxt;
}

function setTxtsLineHeight(firstLine, secondLine){
    gMeme.txts[0].lineHeight = secondLine;
    gMeme.txts[(gMeme.txts.length)-1].lineHeight = firstLine;
    saveMemeToStorage();
}

function switchSelectedTxt(idx){
    if (idx === 0){
        gMeme.selectedTxt = (gMeme.txts.length)-1;
    }
    else gMeme.selectedTxt = idx-1;
    saveMemeToStorage();
}

function saveMemeToStorage(){
    saveToStorage(CURRMEME_KEY, gMeme);
}

function loadMemeFromStorage(){
    return loadFromStorage(CURRMEME_KEY);
}

