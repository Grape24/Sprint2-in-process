'use strict'

let gKeywords = {};
let gNextId = 101;
let gImgs = createImages();
let gMeme = {
    selectedImgId: 0,
    selectedImgUrl: '',
    selectedTxtId: 0,
    txts: [
        {
            line: '',
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
}

function getCurrMemeUrl(){
    return gMeme.selectedImgUrl;
}