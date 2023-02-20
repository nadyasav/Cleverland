export interface IReviewEl {
  id: string;
  icon: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}
export interface IDataCard {
  id: number;
  imgUrl: string;
  imgBookPage: Array<{ id: string; img: string }>;
  rating: number;
  title: string;
  author: string;
  date: string;
  booked: boolean;
  busy: string;
  category: { key: string; value: string };
  description: Array<{ id: string; paragraph: string }>;
  info: Array<{ id: string; key: string; value: string }>;
  reviews: IReviewEl[];
}

export interface IBaseBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnRef?: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  stylesInherit?: boolean;
  booked?: boolean;
}

export interface ICard {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  image: { url: string } | null;
  categories: string[] | null;
  id: number;
  booking: IBooking | null;
  delivery: IDelivery | null;
  history: IHistory[] | null;
}

export interface IBooking {
  id: number;
  order: boolean;
  dateOrder: string | null;
  customerId: number | null;
  customerFirstName: string | null;
  customerLastName: string | null;
}

export interface IDelivery {
  id: number;
  handed: boolean;
  dateHandedFrom: string | null;
  dateHandedTo: string | null;
  recipientId: number | null;
  recipientFirstName: string | null;
  recipientLastName: string | null;
}

export interface IHistory {
  id: number | null;
  userId: number | null;
}

export interface IComment {
  id: number;
  rating: number;
  text: string | null;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  } | null;
}

export interface IBook {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string | null;
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  authors: string[] | null;
  images: Array<{ url: string }> | null;
  categories: string[] | null;
  comments: IComment[] | null;
  booking: IBooking | null;
  delivery: IDelivery | null;
  history: IHistory[] | null;
}
