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
    selectedTxtIdx = +selectedTxtIdx.idx;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let elImg = document.querySelector('.invisible')
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    if(ev.inputType === 'deleteContentBackward'){
        elInputValue = elInputValue.substring(0, elInputValue.length-1);
        setMemeTxt(selectedTxtIdx, elInputValue) 
        renderElCanvas(elImg);
        writeTxt(meme, unselectedLineIdx, ctx);
        drawRectAroundText(meme, selectedTxtIdx, ctx);
        writeTxt(meme, selectedTxtIdx, ctx);

    }else{
        setMemeTxt(selectedTxtIdx, elInputValue) 
        renderElCanvas(elImg);
        writeTxt(meme, unselectedLineIdx, ctx);
        drawRectAroundText(meme, selectedTxtIdx, ctx);
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
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onLineHeightChange(operator){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let y = meme.txts[selectedTxtIdx].lineHeight;
    (operator === '+')? y=y-3 : y=y+3;
    setMemeLineHeight(y, selectedTxtIdx);
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    writeTxt(meme, unselectedLineIdx, ctx);
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onLineXChange(operator){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    let x = meme.txts[selectedTxtIdx].lineX;
    (operator === '+')? x=x+3 : x=x-3;
    let lineX = 'lineX'
    setMemeProperty(selectedTxtIdx, lineX, x);
    let elImg = document.querySelector('.invisible')
    renderElCanvas(elImg);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    writeTxt(meme, unselectedLineIdx, ctx);
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);

}

function onDeleteLine(){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    removeLine(selectedTxtIdx);
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    let txtsLength = getSelectedTxtLength();
    selectedTxtIdx = meme.selectedTxt;
    if (txtsLength === 0) {
        let elInput = document.querySelector('[name="meme-txt1"]');
        elInput.setAttribute('data-idx', `${selectedTxtIdx}`)
        elInput.value = '';
        return;
    }else{
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    writeTxt(meme, unselectedLineIdx, ctx);
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);}
    let elInput = document.querySelector('[name="meme-txt1"]');
    elInput.setAttribute('data-idx', `${selectedTxtIdx}`)
    let txt = getCurrText(selectedTxtIdx);
    elInput.value = txt;
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
    drawRectAroundText(meme, selectedTxtIdx, ctx);
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
    drawRectAroundText(meme, selectedTxtIdx, ctx);
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
    drawRectAroundText(meme, selectedTxtIdx, ctx);
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
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
}

function onSwitchLine(){
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = meme.selectedTxt;
    switchSelectedTxt(selectedTxtIdx);
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    meme = loadMemeFromStorage();
    selectedTxtIdx = meme.selectedTxt;
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
    writeTxt(meme, unselectedLineIdx, ctx);
    let elInput = document.querySelector('[name="meme-txt1"]');
    elInput.setAttribute('data-idx', `${selectedTxtIdx}`)
    let txt = getCurrText(selectedTxtIdx);
    elInput.value = txt;
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
        initMeme();
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


function onAddLine(){
    let elCanvas = document.querySelector('.img-canvas');
    let elImg = document.querySelector('.invisible')
    let ctx = elCanvas.getContext('2d');
    renderElCanvas(elImg);
    increaseMemeIdx();
    let meme = loadMemeFromStorage();
    let selectedTxtIdx = getSelectedTxt();
    addTxts(selectedTxtIdx);
    let unselectedLineIdx = findUnselectedTextsIdx(selectedTxtIdx, meme);
    drawRectAroundText(meme, selectedTxtIdx, ctx);
    writeTxt(meme, selectedTxtIdx, ctx);
    let txtsLength = getSelectedTxtLength();
    let elInput = document.querySelector(`[name="meme-txt1"]`);
    elInput.setAttribute('data-idx', `${selectedTxtIdx}`)
    elInput.value = '';
    if(txtsLength === 1)return;
    writeTxt(meme, unselectedLineIdx, ctx);

}

function writeTxt(meme, idx, ctx){
    if (Array.isArray(idx)){
        for (let i = 0; i < idx.length; i++){
            meme = loadMemeFromStorage();
            let selectedTxt = meme.txts[idx[i]].line;
            let fontSize = meme.txts[idx[i]].fontSize;
            let y = meme.txts[idx[i]].lineHeight;
            let txtAlign = meme.txts[idx[i]].align;
            let font = meme.txts[idx[i]].font;
            let stroke = meme.txts[idx[i]].stroke;
            let color = meme.txts[idx[i]].color;
            let x = meme.txts[idx[i]].lineX;
            ctx.fillStyle = color;
            ctx.strokeStyle = stroke;
            ctx.font = `${fontSize}px ${font}`;
            ctx.textAlign = txtAlign;
            ctx.lineWidth = 2;
            ctx.fillText(selectedTxt, x, y);
            ctx.strokeText(selectedTxt, x, y);
            ctx.stroke;
        }
    } else{
        meme = loadMemeFromStorage();
        let selectedTxt = meme.txts[idx].line;
        let fontSize = meme.txts[idx].fontSize;
        let y = meme.txts[idx].lineHeight;
        let txtAlign = meme.txts[idx].align;
        let font = meme.txts[idx].font;
        let stroke = meme.txts[idx].stroke;
        let color = meme.txts[idx].color;
        let x = meme.txts[idx].lineX;
        ctx.fillStyle = color;
        ctx.strokeStyle = stroke;
        ctx.font = `${fontSize}px ${font}`;
        ctx.textAlign = txtAlign;
        ctx.lineWidth = 2;
        ctx.fillText(selectedTxt, x, y);
        ctx.strokeText(selectedTxt, x, y);
        ctx.stroke;
    }
} 

function drawRectAroundText(meme, idx, ctx){
    meme = loadMemeFromStorage();
    let fontSize = meme.txts[idx].fontSize;
    let y = meme.txts[idx].lineHeight;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(0, y - fontSize / 2 - 30, 500, fontSize + 20); 
}

function initMeme(){
    let meme = loadMemeFromStorage();
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    let idxs = findIdxs();
    drawRectAroundText(meme, 0, ctx);
    writeTxt(meme, idxs, ctx);
}

function openNav(elButton){
    var elNav = document.querySelector('.nav-text');
    elNav.classList.toggle('menu-is-clicked');
    if(elNav.classList[1] ==='menu-is-clicked'){
        elButton.innerHTML = '<i class="fas fa-times"></i>'}
    else elButton.innerHTML = '☰'
}

