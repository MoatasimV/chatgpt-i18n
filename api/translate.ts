import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, OpenAIApi } from 'openai'
export default async function handler(request: VercelRequest, response: VercelResponse) {
    const params = request.body;
    const { content, targetLang } = params;
    console.log('start', params, process.env.OPENAI_API_KEY)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.log('new')
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `Translate a i18n locale json content to ${targetLang}.`,
            },
            {
                role: "user",
                content: content
            }
        ],
    });
    console.log(completion.data);

    response.status(200).json({
        success: true,
        data: completion.data.choices[0].message?.content
    });
}