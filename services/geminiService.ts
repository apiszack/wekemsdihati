
import { GoogleGenAI, Type } from "@google/genai";
import { Booking, RoomType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askBookingAI(query: string, currentBookings: Booking[]) {
  const systemInstruction = `
    Anda adalah asisten pintar untuk Sistem Tempahan (WEKEMS) SK Kemasek. 
    Tugas anda adalah membantu guru-guru menyemak kekosongan dan memberikan cadangan aktiviti bagi penggunaan Bilik Tayang atau Makmal Komputer.
    
    Data tempahan semasa: ${JSON.stringify(currentBookings)}
    
    Peraturan:
    1. Berikan jawapan dalam Bahasa Melayu yang sopan.
    2. Jika ditanya tentang kekosongan, semak data tempahan semasa yang diberikan.
    3. Jika terdapat konflik masa, cadangkan slot lain yang kosong.
    4. Waktu operasi adalah 8:00 AM hingga 5:00 PM.
    5. Bilik Tayang sesuai untuk tayangan video, pembentangan, dan ceramah.
    6. Makmal Komputer sesuai untuk PdP berasaskan ICT, ujian online, dan pencarian maklumat.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Maaf, saya tidak dapat memproses permintaan anda buat masa ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Berlaku ralat semasa menghubungi asisten AI. Sila cuba lagi.";
  }
}
