
export default interface Part {
  partId: string;
  launchId: string;
  name: string;
  price: number;
}

export type PartPdf = {
  partId: number;
  name: string;
  price: number;
}
