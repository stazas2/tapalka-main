import { ICard } from "@/features/clicker";

export type CardType = {
  _id: number;
  title: string;
  description: string;
  level: number;
  salary: number;
  rph: number;
  progress: number;
  urlPicture: string;
  price: number;
  dateCreation: string;
  upgradeCost: number;
  paid?: boolean
  //varind: "default" | "new" | "approved";
};

export type IUserCardType = {
  _id: number,
  level: number,
  salary: number,
  upgradeCost: number,
  card: {
    _id: number;
    title: string;
    description: string;
    level: number;
    salary: number;
    rph: number;
    progress: number;
    urlPicture: string;
    price: number;
    dateCreation: string;
    upgradeCost: number;
    //varind: "default" | "new" | "approved";
  };
}

export type CardDetailsModalProps = {
  card: ICard;
  onClose: () => void;
  isView: boolean;
  onClickBuyCard: (cardId: number) => void;
  onClickUpdateCard: (cardId: number) => void;
  coins: number;

};
