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

function onWrite(ev, elInputValue, selectedTxtIdx){
    let meme = loadMemeFromStorage();
    selectedTxtIdx = findSelectedText(selectedTxtIdx);
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let elImg = document.querySelector('.invisible')
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    if(ev.inputType === 'deleteContentBackward'){
        elInputValue = elInputValue.substring(0, elInputValue.length-1);
        setMemeTxt(selectedTxtIdx, elInputValue) 
        renderElCanvas(elImg);
        writeTxt(meme, unselectedLineIdx, ctx);
        writeTxt(meme, selectedTxtIdx, ctx);

    }else{
        setMemeTxt(selectedTxtIdx, elInputValue) 
        renderElCanvas(elImg);
        writeTxt(meme, unselectedLineIdx, ctx);
        writeTxt(meme, selectedTxtIdx, ctx);
    }
}

function onChangeFontSize(operator){    
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let fontSize = meme.txts[selectedTxtIdx].fontSize;
    (operator === '-')? fontSize-- : fontSize++;
    setMemeFontSize(fontSize, selectedTxtIdx);
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    writeTxt(meme, unselectedLineIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onLineHeightChange(operator){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let y = meme.txts[selectedTxtIdx].lineHeight;
    (operator === '+')? y-- : y++;
    setMemeLineHeight(y, selectedTxtIdx);
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    writeTxt(meme, unselectedLineIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);

}

function onDeleteLine(){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    removeLine(selectedTxtIdx, unselectedLineIdx);
    let elInput = document.querySelector(`[name="meme-txt${selectedTxtIdx+1}"]`)
    if (elInput.dataset.idx === '1'){
        elInput.style.display = 'none';
        elInput.value = '';
    } else elInput.value = '';
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    selectedTxtIdx = meme.selectedTxt;
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onTextAlign(alignment){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    setMemeTxtAlignment(selectedTxtIdx, alignment);
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    writeTxt(meme, unselectedLineIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onChangeFont(fontFamily){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let font = 'font';
    setMemeProperty(selectedTxtIdx, font, fontFamily);
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    writeTxt(meme, unselectedLineIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onChangeStroke(color){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let stroke = 'stroke'
    setMemeProperty(selectedTxtIdx, stroke, color);
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    writeTxt(meme, unselectedLineIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onChangeFill(color){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let fill = 'color'
    setMemeProperty(selectedTxtIdx, fill, color);
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    writeTxt(meme, unselectedLineIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);

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

function writeTxt(meme, idx, ctx){
    meme = loadMemeFromStorage();
    let selectedTxt = meme.txts[idx].line;
    let fontSize = meme.txts[idx].fontSize;
    let y = meme.txts[idx].lineHeight;
    let txtAlign = meme.txts[idx].align;
    let font = meme.txts[idx].font;
    let stroke = meme.txts[idx].stroke;
    let color = meme.txts[idx].color;
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    ctx.font = `${fontSize}px ${font}`;
    ctx.textAlign = txtAlign;
    ctx.lineWidth = 2;
    ctx.fillText(selectedTxt, 200, y);
    ctx.strokeText(selectedTxt, 200, y);
    ctx.stroke;
} 

//currently never invoked =>
function drawRectAroundText(elInputValue, ctx, fontSize){
        let measurements = ctx.measureText(elInputValue);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(20, y - fontSize / 2 - 20, measurements.width, fontSize + 10); 
    }

function openNav(elButton){
    var elNav = document.querySelector('.nav-text');
    elNav.classList.toggle('menu-is-clicked');
    if(elNav.classList[1] ==='menu-is-clicked'){
        elButton.innerHTML = '<i class="fas fa-times"></i>'}
    else elButton.innerHTML = '☰'
}

