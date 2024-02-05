export function onHome() {
  return `<div class="cont-gen">
    <input type="url" class="input" id="url-img" placeholder = "Inserisci URL immagine">
    <input type="text" class="input" id="tit-img" placeholder = "Inserisci titolo immagine">
    <textarea class="input" id="comm-img" placeholder = "Inserisci commento immagine"></textarea>
    <button type="button" id="add-img" disabled>AGGIUNGI IMMAGINE</button>
    </div>
    <div id="cont-card"></div>`;
}
