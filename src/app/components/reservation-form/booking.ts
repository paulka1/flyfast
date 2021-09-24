import { Line } from "./line";

export class Booking {
    customerName: string;
    tripId: number;
    PriceEUR: number;
    PriceUSD: number;
    Lines: Array<Line>;
    company: string;
    date: string;
    basePrice: number;

  }