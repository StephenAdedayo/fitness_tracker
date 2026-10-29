import { GoogleGenAI } from "@google/genai";
import fs from 'fs'

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});


export const analyseImage = async (filePath :string) => {

    try {
const base64ImageFile = fs.readFileSync(filePath, {
  encoding: "base64",
});

// const config = {
//     responseMimeType : "application/json",
//     responseJsonSchema : {
//         type : "object",
//         properties : {
//             name : {
//                 type : "string",

//             },
//             calories : {
//                 type :"number"
//             }
//         }
//     }
// }

// await ai.models.generateContent uses config above 

const foodSchema = {
    type: "object",
    properties: {
        name: { type: "string", description: "Name of the food" },
        calories: { type: "integer", description: "Estimated calories" }
    },
    required: ["name", "calories"]
};

const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: [
        {type: "text", text: "Extract the food name and estimated calories from this image in a JSON object."},
        {
            type: "image",
            data: base64ImageFile,
            mime_type: "image/jpeg"
        }
    ],
    response_format: {
        type: "text",
        mime_type: "application/json",
        schema: foodSchema
    }

});

// response.text should be valid json response
return JSON.parse(interaction.output_text ?? "{}")

        
    } catch (error:any) {
        console.log(error);
        throw error
        
    }
}