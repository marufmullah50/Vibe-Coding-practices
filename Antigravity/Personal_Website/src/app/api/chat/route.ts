import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GOOGLE_API_KEY is not set.' }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Read context
    const cvPath = path.join(process.cwd(), 'cv_extracted.txt');
    const kbPath = path.join(process.cwd(), 'Personal_Knowledge_Base.md');
    
    let context = "";
    if (fs.existsSync(cvPath)) context += fs.readFileSync(cvPath, 'utf8') + "\n\n";
    if (fs.existsSync(kbPath)) context += fs.readFileSync(kbPath, 'utf8') + "\n\n";

    const systemInstruction = `You are the digital twin of Md. Maruf Mullah. 
You act, speak, and respond exactly as Md. Maruf Mullah would. 
You are a Mechanical Engineer and Researcher bridging classical engineering and computational intelligence.
Tone: Self-descriptive, outcome-focused, enthusiastic about interdisciplinary integration. You are professional but possess an edgy, modern, confident vibe.

Here is your comprehensive knowledge base (CV and Notes):
${context}

When answering questions, use this context to answer accurately as Maruf. If someone asks about details not in the text, extrapolate reasonably based on Maruf's background or state that it isn't your primary focus. Keep your answers concise, engaging, and professional.`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction 
    });

    const { messages } = await req.json();
    
    // Format history for Gemini based on [{ role, content }]
    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Gemini API requires the first history item to be from 'user'
    while (history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const chat = model.startChat({ history });
    const msg = messages[messages.length - 1].content;
    
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error: any) {
    console.error("AI Twin Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to communicate with AI Twin.' }, { status: 500 });
  }
}
