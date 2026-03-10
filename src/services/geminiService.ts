import { AnimalType, WeatherData } from "../types";

export const getHeatStressAdvice = async (
  animal: AnimalType,
  weather: WeatherData,
  animalFactors: string
): Promise<string> => {

  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      animal,
      weather,
      animalFactors
    })
  });

  const data = await res.json();
  return data.text;
};