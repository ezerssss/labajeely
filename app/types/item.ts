import { ServicesEnum } from "../enums/services";

export interface LaundryCardInterface {
  id: string;
  name: string;
  address?: string;
  bag: string;
  kilos: number;
  services: ServicesEnum[];
}
