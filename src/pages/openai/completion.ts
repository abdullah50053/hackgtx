import openai from "./config";

async function generateCompletion(prompt: string, maxTokens: number = 500) {
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt,
    n: 1,
    max_tokens: maxTokens,
  });
  return completion.data.choices[0].text;
}

export default generateCompletion;
