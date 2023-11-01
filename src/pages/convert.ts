import {OpenAI} from "openai";
import type {APIRoute} from "astro";

const openai = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY,
});


export const POST: APIRoute = async ({request}) => {

    const input = await request.json().then(data => data.input);
    if (input == "") return new Response(JSON.stringify({message: "Please enter some text."}))

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `
        translate this text to shakesperean:
        
        ${input}` }],
        model: 'gpt-3.5-turbo',
    });

    const response = chatCompletion.choices[0].message.content

    console.log(response)

    return new Response(JSON.stringify({message: response}))
}