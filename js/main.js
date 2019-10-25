'use strict'

function init(){
    renderImgGallery();
}


function renderImgGallery(){
    let elImgContainer = document.querySelector('.img-gallery-container');
    let strHTMLS = gImgs.map((img) => {
        return `<a href="editor.html"><img onclick="onEditMeme(this)" data-id="${img.id}" src="${img.url}" alt="meme-bg"></a>`
    })
    strHTMLS = strHTMLS.join('');
    elImgContainer.innerHTML = strHTMLS;
}

function onEditMeme(elImg){
    let elImgIdx = elImg.dataset.id;
    elImgIdx = +elImgIdx;
    selectImgById(elImgIdx);
}

function initMemeEditor(){
    let url = getCurrMemeUrl();
    createImgElement(url);
    restoreCurrMeme();
}

function onWrite(ev, elInputValue, selectedTxt){
    let meme = loadMemeFromStorage();
    selectedTxt = findSelectedText(selectedTxt);
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxt, meme);
    let unselectedTxt = meme.txts[unselectedLineIdx].line;
    let unselectedTextFont = meme.txts[unselectedLineIdx].fontSize;
    let fontSize = meme.txts[selectedTxt].fontSize;
    let y = meme.txts[selectedTxt].lineHeight;
    let unselectedTextY = meme.txts[unselectedLineIdx].lineHeight;
    let elImg = document.querySelector('.invisible')
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    if(ev.inputType === 'deleteContentBackward'){
        elInputValue = elInputValue.substring(0, elInputValue.length-1);
        let elDeletedTxt = elInputValue;  
        renderElCanvas(elImg);
        writeTxt(ctx, unselectedTxt, unselectedTextY, unselectedLineIdx, unselectedTextFont);
        writeTxt(ctx, elDeletedTxt, y, selectedTxt, fontSize);

    }else{
        renderElCanvas(elImg);
        writeTxt(ctx, unselectedTxt, unselectedTextY, unselectedLineIdx, unselectedTextFont);
        writeTxt(ctx, elInputValue, y, selectedTxt, fontSize);
    }
}

function onChangeFontSize(operator){    
    let meme = loadMemeFromStorage();
    let selectedTxt = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxt, meme);
    let unselectedTxt = meme.txts[unselectedLineIdx].line;
    let fontSize = meme.txts[selectedTxt].fontSize;
    let unselectedFontTxt = meme.txts[unselectedLineIdx].fontSize;
    let y = meme.txts[selectedTxt].lineHeight;
    let unselectedTextY = meme.txts[unselectedLineIdx].lineHeight;
    (operator === '-')? fontSize-- : fontSize++;
    setMemeFontSize(fontSize, selectedTxt);
    let elCanvasText = getCurrText(selectedTxt);
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    writeTxt(ctx, unselectedTxt, unselectedTextY, unselectedLineIdx, unselectedFontTxt);
    writeTxt(ctx, elCanvasText, y, selectedTxt, fontSize);
}

function onLineHeightChange(operator){
    let meme = loadMemeFromStorage();
    let selectedTxt = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxt, meme);
    let unselectedTxt = meme.txts[unselectedLineIdx].line;
    let fontSize = meme.txts[selectedTxt].fontSize;
    let unselectedFontTxt = meme.txts[unselectedLineIdx].fontSize;
    let y = meme.txts[selectedTxt].lineHeight;
    let unselectedTextY = meme.txts[unselectedLineIdx].lineHeight;
    (operator === '+')? y-- : y++;
    setMemeLineHeight(y, selectedTxt);
    let elCanvasText = getCurrText(selectedTxt);
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    writeTxt(ctx, unselectedTxt, unselectedTextY, unselectedLineIdx, unselectedFontTxt);
    writeTxt(ctx, elCanvasText, y, selectedTxt, fontSize);

}

function onSwitchLine(){
    let meme = loadMemeFromStorage();
    let selectedTxt = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxt, meme);
    setMemeTxtsIdx(unselectedLineIdx);
    let focusedInput = document.querySelector(`[data-idx="${unselectedLineIdx}"]`)
    focusedInput.focus();
}

function onSelectEditable(dataset){
    let idx = +dataset.idx;
    setMemeTxtsIdx(idx);
}

function renderElCanvas(img){

    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    let width = elCanvas.width;
    let height = elCanvas.height;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0 ,0, width, height)
}

function onDeleteLine(){

    ///doesn't work
    let meme = loadMemeFromStorage();
    let currIdx = meme.selectedTxt;
    let unselectedIdx = findUnselectedTextsIdx(currIdx, meme);
    let currElInput = document.querySelector(`[data-idx="${currIdx}"]`)
    currElInput.style.display = 'none';
    removeLine(currIdx, unselectedIdx);
    let elCanvasText = getCurrText(unselectedIdx);
    let elImg = document.querySelector('.invisible')
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    let y = meme.txts[unselectedIdx].lineHeight;
    let fontSize = meme.txts[unselectedIdx].fontSize
    writeTxt(ctx, elCanvasText, y, unselectedIdx, fontSize);

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

function loadFontSizeFromStorage(){
    let meme = loadMemeFromStorage();
    let fontSize = meme.txts[0].fontSize;
    return fontSize;
}

function restoreCurrMeme(){
   gMeme = loadMemeFromStorage()
}


function findSelectedText(selectedTxt){
    selectedTxt = selectedTxt.substring(selectedTxt.length-1);
    selectedTxt = +selectedTxt;
    selectedTxt--;
    return selectedTxt
}

function onAddLine(){
    let elInput = document.querySelector('[name="meme-txt2"]')
    elInput.style.display ='block';
}

function writeTxt(ctx, elInputValue, y, selectedTxt, fontSize){
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `${fontSize}px Impact`;
    ctx.fillText(elInputValue, 20, y);
    ctx.lineWidth = 2;
    setMemeTxt(selectedTxt, elInputValue);
    ctx.strokeText(elInputValue, 20, y);
    ctx.font = `${fontSize}px Impact`;

} 

function openNav(elButton){
    var elNav = document.querySelector('.nav-text');
    elNav.classList.toggle('menu-is-clicked');
    if(elNav.classList[1] ==='menu-is-clicked'){
        elButton.innerHTML = '<i class="fas fa-times"></i>'}
    else elButton.innerHTML = '☰'
}

