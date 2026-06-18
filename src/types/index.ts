export type SportType =
  | "MMA"
  | "Boxing"
  | "Muay Thai"
  | "Kickboxing"
  | "BJJ"
  | "Wrestling";

export interface Fighter {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  weightClass: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  style: string;
  sport: SportType;
  image: string;
  stats: {
    winRate: number;
    koRate: number;
    submissionRate: number;
    reach: number;
    height: number;
    age: number;
  };
}

export interface SportCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface VersusMatchup {
  id: string;
  fighterA: Fighter;
  fighterB: Fighter;
  fighterC?: Fighter;

  eventName: string;
  date: string;

  title: string;
  storyline: string;
  tension: string;

  prediction: {
    fighterAChance: number;
    fighterBChance: number;
    analysis: string;
  };
}

export type EventStatus = "upcoming" | "live" | "completed";

export interface CombatEvent {
  id: string;
  name: string;
  organization: string;
  date: string;
  time: string;
  mainEvent: string;
  venue: string;
  location: string;
  status: EventStatus;
  image: string;
}

export interface Venue {
  id: string;
  name: string;
  country: string;
  city: string;
  capacity: number;
  majorEvents: string[];
  image: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}