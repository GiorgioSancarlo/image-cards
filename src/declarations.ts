/** @format */

//export let images: any = [];

export const mapNodes = {
  container: 'container',
  contCard: 'cont-card',
  urlImg: 'url-img',
  titImg: 'tit-img',
  commImg: 'comm-img',
  addImg: 'add-img',
  input: 'input',
  linkHome: 'link-home',
  linkPref: 'link-pref',
  addPref: 'add-pref',
} as const;

export type NodeID = (typeof mapNodes)[keyof typeof mapNodes];

/*export type Immagine = {
  src: string;
  title: string;
  comment: string;
};*/

export class Immagine {
  constructor(path: string, tit: string, comm: string) {
    this.src = path;
    this.title = tit;
    this.comment = comm;
    this.pref = false;
  }

  src: string;
  title: string;
  comment: string;
  pref: boolean;
}
