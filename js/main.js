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
    let url = findURLById(elImgIdx);
    let elImgContainer = document.querySelector('.img-gallery-container');
    elImgContainer.style.display = 'none';
    initMemeEditor(url, elImgIdx);
}

function initMemeEditor(url, id){
    selectImgById(id);
    let elImg = createImgElement(url);
    renderElCanvas(elImg);

}

function onWrite(ev, elInputValue){
    let elTxt = elInputValue;
    let url = getCurrMemeUrl();
    let elImg = createImgElement(url);
    elInputValue = elInputValue.substring(0, elInputValue.length-1);
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    ctx.font = '20px Impact';
    ctx.fillStyle = '#FFFFFF'
    if(ev.inputType === "deleteContentBackward"){
        let elDeletedTxt = elInputValue;  
        renderElCanvas(elImg);  
        ctx.strokeText(elDeletedTxt, 10, 50);
    }else{
        renderElCanvas(elImg);
        ctx.strokeText(elTxt, 10, 50);
    }
}

function renderElCanvas(elImg){
    let elCanvasContainer = document.querySelector('.canvas-container');
    elCanvasContainer.style.display = 'block';
    let elCanvas = document.querySelector('.img-canvas');
    let ctx = elCanvas.getContext('2d');
    let width = elCanvas.width
    let height = elCanvas.height
    ctx.drawImage(elImg, 0, 0, width, height);
}

function createImgElement(url){
    let elImg = document.createElement('IMG');
    elImg.setAttribute('src', url);
    return elImg;
}

