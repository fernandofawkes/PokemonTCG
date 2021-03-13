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
