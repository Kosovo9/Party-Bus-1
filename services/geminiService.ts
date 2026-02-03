
import { GoogleGenAI, Type } from "@google/genai";

const GLOBAL_NEGATIVE_PROMPT = "no logos reales, no marcas registradas, no texto legible, no nombres de empresas, no placas de vehículos detalladas, no caras hiperrealistas de personas famosas, no violencia, no armas, no contenido sexual, no desnudos, no gestos ofensivos, no escenas borrosas, no ojos deformes, no manos deformes, no proporciones corporales extrañas, no baja resolución, no ruido digital excesivo, no estilo caricatura, no ilustración, no 3D, solo fotografía hiperrealista limpia y bien iluminada";

// analyzeGroupPhoto uses gemini-3-pro-preview to evaluate the group's needs based on their photo
export const analyzeGroupPhoto = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Analiza esta foto de grupo. Dime aproximadamente cuántas personas ves y qué tipo de paquete de PartyBus en Guadalajara les recomendarías (Renta por hora, Tour Tequila, etc) basándote en su vibra. Responde de forma divertida y vendedora." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "¡Vaya! Parece que la fiesta está tan buena que no pude contar a todos. ¡Mejor escríbenos por WhatsApp!";
  }
};

// generateServiceVisual uses gemini-3-pro-image-preview for high quality visual previews of the services
export const generateServiceVisual = async (prompt: string, specificNegative?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const combinedNegative = specificNegative 
      ? `${GLOBAL_NEGATIVE_PROMPT}, ${specificNegative}` 
      : GLOBAL_NEGATIVE_PROMPT;

    // Use gemini-3-pro-image-preview for high-quality visualizations which require a user-selected API key
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: `${prompt}. Negative prompt: ${combinedNegative}` },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      },
    });

    // Extract the image from the response parts
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    // Gracefully handle key-related errors by signaling the UI to prompt for a new key
    if (error.message?.includes("entity was not found") || error.message?.includes("permission denied")) {
      return "KEY_ERROR";
    }
    return null;
  }
};

// editPartyPhoto uses gemini-2.5-flash-image for real-time image editing
export const editPartyPhoto = async (base64Image: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: `Edita esta foto de fiesta: ${prompt}. Haz que se vea lujosa y llena de luces neón tipo antro en Guadalajara.` }
        ]
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    return null;
  }
};
