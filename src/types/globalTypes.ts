export interface IBook {
  _id: string;
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
  _id: string;
  user: string;
  userId: string;
  currentlyReading: boolean;
  planToRead: boolean;
  finished: boolean;
  book: IBook;
}
