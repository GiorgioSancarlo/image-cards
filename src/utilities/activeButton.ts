import { mapNodes } from '../declarations';
import { utilityGetNode } from './getNode';

export function activBtn() {
  const urlIm = utilityGetNode(mapNodes.urlImg) as HTMLInputElement;
  const titIm = utilityGetNode(mapNodes.titImg) as HTMLInputElement;
  const comIm = utilityGetNode(mapNodes.commImg) as HTMLInputElement;
  const btn = utilityGetNode(mapNodes.addImg) as HTMLButtonElement;
  if (comIm.value != '' && titIm.value != '' && urlIm.value != '') btn.disabled = false;
  else btn.disabled = true;
}
