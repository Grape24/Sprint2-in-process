'use strict'

function init(){
    renderImgGallery();
}

function renderImgGallery(){
    let elImgContainer = document.querySelector('.img-gallery-container');
    let strHTMLS = gImgs.map((img) => {
        return `<img onclick="onEditMeme(this)" data-id="${img.id}" src="${img.url}" alt="meme-bg">`
    })
    strHTMLS = strHTMLS.join('');
    elImgContainer.innerHTML = strHTMLS;
}

function onEditMeme(elImg){
    let elImgIdx = elImg.dataset.id;
    elImgIdx = +elImgIdx;
    selectImgById(elImgIdx);
    window.location.href = '/editor.html';
}


function initMemeEditor(){
    let url = getCurrMemeUrl();
    createImgElement(url);
    restoreCurrMeme();
}

function onWrite(ev, elInputValue, selectedTxt){
    selectedTxt = findSelectedText(selectedTxt);
    let fontSize = loadFontSizeFromStorage();
    let elTxt = elInputValue;
    let elImg = document.querySelector('.invisible')
    elInputValue = elInputValue.substring(0, elInputValue.length-1);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = '#FFFFFF'
    if(ev.inputType === 'deleteContentBackward'){
        let elDeletedTxt = elInputValue;  
        renderElCanvas(elImg);  
        ctx.strokeText(elDeletedTxt, 20, 30);
        setMemeTxt(selectedTxt, elDeletedTxt);
    }else{
        renderElCanvas(elImg);
        ctx.strokeText(elTxt, 20, 30);
        setMemeTxt(selectedTxt, elTxt);
    }
}

function renderElCanvas(img){
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    let width = elCanvas.width
    let height = elCanvas.height
    ctx.drawImage(img, 0, 0, width, height);
}

function createImgElement(url){
    let img = new Image()
    img.src = url
    img.onload = () => {
        let elImg = document.querySelector('.invisible')
        elImg.src = url
        renderElCanvas(img);
    }
}

function onChangeFontSize(operator){
    let meme = loadMemeFromStorage();
    let fontSize = meme.txts[0].fontSize;
    let y = meme.txts[0].lineHeight;
    (operator === '-')? fontSize-- : fontSize++;
    setMemeFontSize(fontSize);
    let elCanvasText = getCurrText();
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeText(elCanvasText, 20, y);
}


function loadFontSizeFromStorage(){
    let meme = loadMemeFromStorage();
    let fontSize = meme.txts[0].fontSize;
    return fontSize;
}

function restoreCurrMeme(){
   gMeme = loadMemeFromStorage()
}

function onLineHeightChange(operator){
    let meme = loadMemeFromStorage();
    let fontSize = meme.txts[0].fontSize;
    let y = meme.txts[0].lineHeight;
    (operator === '+')? y-- : y++;
    setMemeLineHeight(y);
    let elCanvasText = getCurrText();
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeText(elCanvasText, 20, y);

}

function findSelectedText(selectedTxt){
    selectedTxt = selectedTxt.substring(selectedTxt.length-1);
    selectedTxt = +selectedTxt;
    selectedTxt--;
    return selectedTxt
}