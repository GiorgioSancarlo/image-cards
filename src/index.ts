/** @format */

let images: any = [];

import './css/general.css';
import { Immagine, mapNodes } from './declarations';
import { utilityAddEventListener } from './utilities/addEventListener';
import { utilityGetNode } from './utilities/getNode';
import { render } from './utilities/render';

function onHome() {
  return `<div class="cont-gen">
  <input type="url" id="url-img" placeholder = "Inserisci URL immagine">
  <input type="text" id="tit-img" placeholder = "Inserisci titolo immagine">
  <textarea id="comm-img" placeholder = "Inserisci commento immagine"></textarea>
  <button type="button" id="add-img">AGGIUNGI IMMAGINE</button>
  </div>
  <div id="cont-card"></div>`;
}

function onAddCard(): any {
  if (!localStorage.Immagini) {
    return `NESSUNA IMMAGINE`;
  } else {
    images = JSON.parse(localStorage.Immagini) as Array<Immagine>;
    const imgs = images
      .map(
        (element: Immagine) =>
          `<div class="cont-img"><img src=${element.src}><b>${element.title}</b><p>${element.comment}</p></div>`,
      )
      .join('');
    return imgs;
  }
}

function onGenerate() {
  const urlIm = utilityGetNode(mapNodes.urlImg) as HTMLInputElement;
  const titIm = utilityGetNode(mapNodes.titImg) as HTMLInputElement;
  const comIm = utilityGetNode(mapNodes.commImg) as HTMLInputElement;
  const nodeHTML = utilityGetNode(mapNodes.contCard);
  //let img = document.createElement('img');
  //let img = new Image();
  //let src = img.setAttribute('src', urlIm.value);
  let img: Immagine = { src: urlIm.value, title: titIm.value, comment: comIm.value };
  images.push(img);
  localStorage.Immagini = JSON.stringify(images);
  if (nodeHTML.innerHTML == 'NESSUNA IMMAGINE')
    nodeHTML.innerHTML = `<div class="cont-img"><img src=${img.src}><b>${img.title}</b><p>${img.comment}</p></div>`;
  else nodeHTML.innerHTML += `<div class="cont-img"><img src=${img.src}><b>${img.title}</b><p>${img.comment}</p></div>`;
}

window.onload = () => {
  render('container', onHome);
  utilityAddEventListener(mapNodes.addImg, 'click', onGenerate);
  render('cont-card', onAddCard);
};
