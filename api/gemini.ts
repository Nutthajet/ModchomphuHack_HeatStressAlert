import { GoogleGenerativeAI } from "@google/genai";

export default async function handler(req, res) {

  const genAI = new GoogleGenerativeAI({
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

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.status(200).json({
    text: text
  });
}