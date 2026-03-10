import { GoogleGenAI } from "@google/genai";
import { AnimalType, WeatherData } from "../types";
import { ANIMAL_NAMES_TH } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getHeatStressAdvice = async (
    animal: AnimalType,
    weather: WeatherData,
    animalFactors: string
): Promise<string> => {
    if (!API_KEY) {
        return "คุณสมบัติ AI ถูกปิดใช้งานเนื่องจากไม่ได้ตั้งค่า API key";
    }
    try {
        const animalName = ANIMAL_NAMES_TH[animal] || animal;
        
        let prompt = `สวมบทบาทเป็น 'พี่เมฆ' สัตวบาลที่เชี่ยวชาญและเป็นมิตร กำลังให้คำแนะนำกับเกษตรกรรายย่อย

**เป้าหมาย:** ให้คำแนะนำที่ **"สั้น กระชับ เข้าใจง่าย และทำตามได้ทันที"** เพื่อลดความเครียดจากความร้อนใน **"${animalName}"**

**ข้อมูลสภาพอากาศ:**
- อุณหภูมิ: ${weather.temperature.toFixed(1)}°C
- ความชื้น: ${weather.humidity.toFixed(1)}%`;

        if (weather.windSpeed !== undefined) {
            prompt += `\n- ความเร็วลม: ${weather.windSpeed} m/s`;
        }
        if (weather.solarRadiation !== undefined) {
            prompt += `\n- การแผ่รังสีดวงอาทิตย์: ${weather.solarRadiation} W/m²`;
        }
        
        prompt += `\n- ปัจจัยในฟาร์ม: ${animalFactors || "ไม่มีข้อมูลเพิ่มเติม"}`;

        prompt += `

**คำสั่ง:**
1.  **สรุปเป็นข้อๆ:** ใช้ bullet point (*) หรือตัวเลข จัดลำดับสิ่งที่ควรทำก่อน-หลัง
2.  **เน้นการปฏิบัติ:** บอกให้ชัดว่าต้อง "ทำอะไร" (เช่น "เปิดพัดลม", "ให้น้ำเย็น")
3.  **ภาษาชาวบ้าน:** ใช้คำพูดง่ายๆ ไม่ต้องใช้ศัพท์วิชาการ
4.  **สั้นที่สุด:** เอาแต่ใจความสำคัญ ไม่ต้องอธิบายยาว`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error fetching advice from Gemini API:", error);
        return "เกิดข้อผิดพลาดในการเรียกคำแนะนำ โปรดลองอีกครั้งในภายหลัง";
    }
};
