import { NodeID } from '../declarations';
import { utilityGetClass, utilityGetNode } from './getNode';

export function utilityAddEventListener(nodeID: NodeID, event: keyof HTMLElementEventMap, handler: () => void) {
  const node = utilityGetNode(nodeID);
  node.addEventListener(event, handler);
}

export function utilityAddEventListenerForClass(nodeID: NodeID, event: keyof HTMLElementEventMap, handler: () => void) {
  const node = utilityGetClass(nodeID);
  for (let i = 0; i < node.length; i++) node[i].addEventListener(event, handler);
}
