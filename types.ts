export enum AnimalType {
  BeefCattle = 'BeefCattle',
  DairyCattle = 'DairyCattle',
  Buffalo = 'Buffalo',
  Pigs = 'Pigs',
  NativeChicken = 'NativeChicken',
  BroilerChicken = 'BroilerChicken',
  LayingHen = 'LayingHen',
  Duck = 'Duck',
  Goat = 'Goat',
  Sheep = 'Sheep',
}

export enum THIStatus {
  NoStress = 'NoStress',
  MildStress = 'MildStress',
  ModerateStress = 'ModerateStress',
  Danger = 'Danger',
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed?: number;
  solarRadiation?: number;
}

export interface ForecastData extends WeatherData {
  day: string;
}

export interface AnimalTHIData {
  animal: AnimalType;
  thi: number;
  status: THIStatus;
  recommendations: string[];
}

export type Screen = 'dashboard' | 'advice' | 'settings' | 'map';

export type Plan = 'free' | 'iot';

export type Settings = {
    plan: Plan;
    selectedAnimals: AnimalType[];
    location: string;
    animalFactors: string;
}

export interface Notification {
  id: string;
  animal: AnimalType;
  status: THIStatus;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface NationwideTHIData {
  region: string;
  thi: number;
  status: THIStatus;
}
