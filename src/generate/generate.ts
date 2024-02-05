export let images: any = [];

import '../css/general.css';
import { Immagine } from '../declarations';

export function onGenCard(): any {
  if (!localStorage.Immagini || localStorage.Immagini == '') {
    return `NESSUNA IMMAGINE`;
  } else {
    let p;
    let alt;
    images = JSON.parse(localStorage.Immagini) as Array<Immagine>;
    const imgs = images
      .map((element: Immagine) => {
        p = element.pref == true ? 'icons8-cuore-sottosopra-48.png' : 'icons8-cuore-sottosopra-50.png';
        alt = element.pref == true ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti';
        return `<div class="cont-img"><img src=${element.src}><img src=${p} title= ${alt} class="add-pref"><b>${element.title}</b><p>${element.comment}</p></div>`;
      })
      .join('');

    return imgs;
  }
}

export function onGenPref(): any {
  if (!localStorage.pref || localStorage.pref == 0) return 'NESSUNA IMMAGINE';
  else {
    images = JSON.parse(localStorage.Immagini) as Array<Immagine>;
    const pref = images.filter((element: Immagine) => {
      return element.pref;
    });

    const imgs = pref
      .map(
        (element: Immagine) =>
          `<div class="cont-img"><img src=${element.src}><img src="icons8-cuore-sottosopra-48.png" title="Rimuovi dai preferiti" class="add-pref"><b>${element.title}</b><p>${element.comment}</p></div>`,
      )
      .join('');

    return `<div id="cont-card">${imgs}</div>`;
  }
}
