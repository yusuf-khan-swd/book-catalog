export interface IBook {
  _id: number;
  title: string;
  genre: string;
  author: string;
  publicationDate: Date;
}

export interface IBookForm {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
