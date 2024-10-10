import { ServicesEnum } from "@/app/enums/services";
import { LaundryCardInterface } from "@/app/types/client/item";

export const tempLaundryCardData: LaundryCardInterface[] = [
  {
    id: "1",
    name: "Ezra Magbanua",
    address: "Balay Lampirong, UPV, Miagao, Iloilo, Philippines",
    bag: "Blue Duffle Bag",
    kilos: 7,
    services: [
      ServicesEnum.DELIVER,
      ServicesEnum.DRY,
      ServicesEnum.PICKUP,
      ServicesEnum.WASH,
    ],
  },
  {
    id: "2",
    name: "John Doe",
    address: "Balay Lampirong, UPV, Miagao, Iloilo, Philippines",
    bag: "Red Duffle Bag",
    kilos: 7,
    services: [ServicesEnum.PICKUP, ServicesEnum.WASH],
  },
  {
    id: "3",
    name: "Robert Donald",
    bag: "Green Suitcase",
    kilos: 12,
    services: [ServicesEnum.WASH],
  },
];
