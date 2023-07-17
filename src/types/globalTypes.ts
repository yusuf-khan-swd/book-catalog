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

export interface IWishlist {
  user: string;
  currentlyReading: boolean;
  planToRead: boolean;
  finished: boolean;
  book: IBook;
}
