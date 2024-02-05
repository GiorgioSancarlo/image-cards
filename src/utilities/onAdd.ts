import '../css/general.css';
import { Immagine, mapNodes } from '../declarations';
import { images } from '../generate/generate';
import { utilityGetNode } from './getNode';

let img: any;

export function onAddCard() {
  const urlIm = utilityGetNode(mapNodes.urlImg) as HTMLInputElement;
  const titIm = utilityGetNode(mapNodes.titImg) as HTMLInputElement;
  const comIm = utilityGetNode(mapNodes.commImg) as HTMLInputElement;
  const btn = utilityGetNode(mapNodes.addImg) as HTMLButtonElement;
  const nodeHTML = utilityGetNode(mapNodes.contCard);
  for (let i = 0; i < images.length; i++)
    if (images[i].src == urlIm.value) {
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
    nodeHTML.innerHTML = `<div class="cont-img"><img src=${img.src}><img src="icons8-cuore-sottosopra-50.png" title="Aggiungi ai preferiti" class="add-pref"><b>${img.title}</b><p>${img.comment}</p></div>`;
  else
    nodeHTML.innerHTML += `<div class="cont-img"><img src=${img.src}><img src="icons8-cuore-sottosopra-50.png" title="Aggiungi ai preferiti" class="add-pref"><b>${img.title}</b><p>${img.comment}</p></div>`;

  addPref();
}

export function addPref() {
  let add = document.getElementsByClassName('add-pref');
  for (let i = 0; i < add.length; i++)
    add[i].addEventListener('click', () => {
      let p = add[i] as HTMLImageElement;
      for (let j = 0; j < images.length; j++)
        if (add[i].previousSibling != undefined) {
          let b = add[i].previousSibling as HTMLImageElement;
          if (b.src == images[j].src) {
            if (images[j].pref == true) {
              images[j].pref = false;
              p.src = 'icons8-cuore-sottosopra-50.png';
              p.title = 'Aggiungi ai preferiti';
              localStorage.pref = parseInt(localStorage.pref) - 1;
            } else {
              images[j].pref = true;
              p.src = 'icons8-cuore-sottosopra-48.png';
              p.title = 'Rimuovi dai preferiti';
              localStorage.pref = parseInt(localStorage.pref) + 1;
            }
            localStorage.Immagini = JSON.stringify(images);
            break;
          }
        }
    });
}
