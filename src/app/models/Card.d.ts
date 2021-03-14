import { Attack } from "./Attack";
import { Resistance } from "./Resistance";
import { Weakness } from "./Weakness";

interface Card {
  "id": string,
  "name": string,
  "types": string[],
  "attacks": Attack[],
  "weaknesses": Weakness[],
  "resistances": Resistance[],
  "images": {
    "small": string,
    "large": string
  }
}

export {Card};