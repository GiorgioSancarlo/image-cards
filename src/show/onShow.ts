import '../css/general.css';
import { mapNodes } from '../declarations';
import { onGenCard, onGenPref } from '../generate/generate';
import { activBtn } from '../utilities/activeButton';
import { utilityAddEventListener, utilityAddEventListenerForClass } from '../utilities/addEventListener';
import { addPref, onAddCard } from '../utilities/onAdd';
import { onHome } from '../utilities/onHome';
import { render } from '../utilities/render';

export function onShowHome() {
  localStorage.lastPage = 'Home';
  render('container', onHome);
  utilityAddEventListener(mapNodes.addImg, 'click', onAddCard);
  utilityAddEventListenerForClass(mapNodes.input, 'keyup', activBtn);
  render('cont-card', onGenCard);
  addPref();
}

export function onShowPref() {
  localStorage.lastPage = 'Preferiti';
  render('container', onGenPref);
  addPref();
}
