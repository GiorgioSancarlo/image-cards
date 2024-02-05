/*function onPref(): any {
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
  }*/
