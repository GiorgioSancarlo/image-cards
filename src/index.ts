/** @format */

let images: any = [];
//let regExp= /\w+@\w+\.\w{2,4}/i;
let regExp = /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*\./i;
let regExp2 = /(https?|ftp|data:image\/(jpg.|jpeg.|png.|gif.|bmp.)\/w):\/.\/.[^\s\/$.?#].[^\s]*\./i;
//let regExp3 = /(data:image\/.[jpeg|png|jpg|gif|bmp];/w).\/.\/.\/w\/.\/w/\/./i; ///\[data:image\/(jpeg|png|gif|bmp);base64,([a-zA-Za/])\]/i;

///\[data:image\/([jpeg]|[png]|[gif]|[bmp]);base64,]([a-zA-Z0-9+/]+={0,2})./i;

let img: any;

import './css/general.css';
import { Immagine, mapNodes } from './declarations';
import { utilityAddEventListener, utilityAddEventListenerForClass } from './utilities/addEventListener';
import { utilityGetNode } from './utilities/getNode';
import { render } from './utilities/render';

function onHome() {
  return `<div class="cont-gen">
  <input type="url" class="input" id="url-img" placeholder = "Inserisci URL immagine">
  <input type="text" class="input" id="tit-img" placeholder = "Inserisci titolo immagine">
  <textarea class="input" id="comm-img" placeholder = "Inserisci commento immagine"></textarea>
  <button type="button" id="add-img" disabled>AGGIUNGI IMMAGINE</button>
  </div>
  <div id="cont-card"></div>`;
}

function onPref(): any {
  if (!localStorage.pref || localStorage.pref == 0) return 'NESSUNA IMMAGINE';
  else {
    images = JSON.parse(localStorage.Immagini) as Array<Immagine>;
    const pref = images.filter((element: Immagine) => {
      return element.pref;
    });

    const imgs = pref
      .map(
        (element: Immagine) =>
          `<div class="cont-img"><img src=${element.src}><p class="add-pref">Pref</p><b>${element.title}</b><p>${element.comment}</p></div>`,
      )
      .join('');

    return imgs;
  }
}

function onShowCard(): any {
  if (!localStorage.Immagini || localStorage.Immagini == '') {
    return `NESSUNA IMMAGINE`;
  } else {
    images = JSON.parse(localStorage.Immagini) as Array<Immagine>;
    const imgs = images
      .map(
        (element: Immagine) =>
          `<div class="cont-img"><img src=${element.src}><p class="add-pref">Pref</p><b>${element.title}</b><p>${element.comment}</p></div>`,
      )
      .join('');

    return imgs;
  }
}

function activBtn() {
  const urlIm = utilityGetNode(mapNodes.urlImg) as HTMLInputElement;
  const titIm = utilityGetNode(mapNodes.titImg) as HTMLInputElement;
  const comIm = utilityGetNode(mapNodes.commImg) as HTMLInputElement;
  const btn = utilityGetNode(mapNodes.addImg) as HTMLButtonElement;
  if (comIm.value != '' && titIm.value != '' && urlIm.value != '') btn.disabled = false;
  else btn.disabled = true;
}

function onAddCard() {
  const urlIm = utilityGetNode(mapNodes.urlImg) as HTMLInputElement;
  const titIm = utilityGetNode(mapNodes.titImg) as HTMLInputElement;
  const comIm = utilityGetNode(mapNodes.commImg) as HTMLInputElement;
  const btn = utilityGetNode(mapNodes.addImg) as HTMLButtonElement;
  const nodeHTML = utilityGetNode(mapNodes.contCard);
  //let img = document.createElement('img');
  //let img = new Image();
  //let src = img.setAttribute('src', urlIm.value);
  //if (regExp3.test(urlIm.value) == true)
  for (let i = 0; i < images.length; i++)
    if (images[0].src == urlIm.value) {
      alert('Immagine già aggiunta');
      urlIm.value = '';
      titIm.value = '';
      comIm.value = '';
      btn.disabled = true;
      return false;
    }
  img = new Immagine(urlIm.value, titIm.value, comIm.value);
  images.push(img);
  localStorage.Immagini = JSON.stringify(images);
  urlIm.value = '';
  titIm.value = '';
  comIm.value = '';
  btn.disabled = true;

  if (nodeHTML.innerHTML == 'NESSUNA IMMAGINE')
    nodeHTML.innerHTML = `<div class="cont-img"><img src=${img.src}><p class="add-pref">Pref</p><b>${img.title}</b><p>${img.comment}</p></div>`;
  else
    nodeHTML.innerHTML += `<div class="cont-img"><img src=${img.src}><p class="add-pref">Pref</p><b>${img.title}</b><p>${img.comment}</p></div>`;

  aggPref();
}

function aggPref() {
  let add = document.getElementsByClassName('add-pref');
  for (let i = 0; i < add.length; i++)
    add[i].addEventListener('click', () => {
      let p = add[i] as HTMLParagraphElement;
      for (let j = 0; j < images.length; j++)
        if (add[i].previousSibling != undefined) {
          let b = add[i].previousSibling as HTMLImageElement;
          if (b.src == images[j].src) {
            if (images[j].pref == true) {
              images[j].pref = false;
              localStorage.pref = parseInt(localStorage.pref) - 1;
            } else {
              images[j].pref = true;
              p.style.color = 'red';
              localStorage.pref = parseInt(localStorage.pref) + 1;
            }
            localStorage.Immagini = JSON.stringify(images);
            break;
          }
        }
    });
}

//let root = document.getElementById('root');

/*function ciao(){
  alert(this.innerHTML)
}*/
//root?.addEventListener('click', () => alert(this));

function onShowHome() {
  localStorage.lastPage = 'Home';
  render('container', onHome);
  utilityAddEventListener(mapNodes.addImg, 'click', onAddCard);
  utilityAddEventListenerForClass(mapNodes.input, 'keyup', activBtn);
  render('cont-card', onShowCard);
  aggPref();
}

function onShowPref() {
  localStorage.lastPage = 'Preferiti';
  render('container', onPref);
  aggPref();
}

window.onload = () => {
  utilityAddEventListener(mapNodes.linkHome, 'click', onShowHome);
  utilityAddEventListener(mapNodes.linkPref, 'click', onShowPref);

  if (!localStorage.pref) localStorage.pref = 0;
  if (localStorage.lastPage == 'Home' || !localStorage.lastPage) {
    render('container', onHome);
    utilityAddEventListener(mapNodes.addImg, 'click', onAddCard);
    utilityAddEventListenerForClass(mapNodes.input, 'keyup', activBtn);
    render('cont-card', onShowCard);
    aggPref();
  } else {
    render('container', onPref);
    aggPref();
  }
};
