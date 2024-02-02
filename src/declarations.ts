/** @format */

export const mapNodes = {
  container: 'container',
  contCard: 'cont-card',
  urlImg: 'url-img',
  titImg: 'tit-img',
  commImg: 'comm-img',
  addImg: 'add-img',
} as const;

export type NodeID = (typeof mapNodes)[keyof typeof mapNodes];

export type Immagine = {
  src: string;
  title: string;
  comment: string;
};
