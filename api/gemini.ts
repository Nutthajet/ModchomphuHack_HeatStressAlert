import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const { animal, weather, animalFactors } = req.body;

  const prompt = `
ให้คำแนะนำลดความเครียดจากความร้อนในสัตว์ ${animal}

อุณหภูมิ ${weather.temperature}
ความชื้น ${weather.humidity}
ปัจจัยในฟาร์ม ${animalFactors}

ตอบแบบสั้น เข้าใจง่าย เป็นข้อๆ
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  res.status(200).json({
    text: response.text
  });
}