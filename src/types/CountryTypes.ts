
export interface Country {
  area: any;
  code: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  emoji: string;
  currency: string;
  continent:{
    name:"string"
  }
  languages: {
    name: string;
  }[];
  currencies: {
    name: string;
  }[];
  neighbors: {
    name: string;
  }[];
  timezones: string[];
}
