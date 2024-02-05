/** @format */

import './css/general.css';
import { mapNodes } from './declarations';
import { onGenCard, onGenPref } from './generate/generate';
import { onShowHome, onShowPref } from './show/onShow';
import { activBtn } from './utilities/activeButton';
import { utilityAddEventListener, utilityAddEventListenerForClass } from './utilities/addEventListener';
import { addPref, onAddCard } from './utilities/onAdd';
import { onHome } from './utilities/onHome';
import { render } from './utilities/render';

window.onload = () => {
  utilityAddEventListener(mapNodes.linkHome, 'click', onShowHome);
  utilityAddEventListener(mapNodes.linkPref, 'click', onShowPref);

  if (!localStorage.pref) localStorage.pref = 0;
  if (localStorage.lastPage == 'Home' || !localStorage.lastPage) {
    render('container', onHome);
    utilityAddEventListener(mapNodes.addImg, 'click', onAddCard);
    utilityAddEventListenerForClass(mapNodes.input, 'keyup', activBtn);
    render('cont-card', onGenCard);
  } else {
    render('container', onGenPref);
  }
  addPref();
};
