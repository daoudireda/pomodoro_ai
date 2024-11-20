import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateTopics(domain: string, focusArea: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educational content curator. Generate three specific, focused learning topics."
        },
        {
          role: "user",
          content: `Generate 3 specific learning topics for ${domain} focusing on ${focusArea}. Each topic should be concise (max 10 words) and actionable.`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No topics generated');

    return content.split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, ''))
      .slice(0, 3);
  } catch (error) {
    console.error('Error generating topics:', error);
    throw error;
  }
}