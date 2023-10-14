import generateCompletion from "@/pages/openai/completion";

const PROMPT_TEMPLATE = `
Give me a list of reasons to $BUY a stock with ticker $STOCK with a personalized description.
Use a valid JSON formatted list of objects with the keys "ticker", "reason", and "sentiment".
List in order of importance.
`;

export interface suggestionPromptData {
  ticker: string;
  buy: string;
}

export interface suggestionResponse {
  ticker: string;
  reason: string;
  sentiment: string;
}

export default async function suggestion(
    promptData: suggestionPromptData
): Promise<suggestionResponse[]> {
    let PROMPT = PROMPT_TEMPLATE.replace("\n", "");
    PROMPT = PROMPT.replace("$BUY", `${promptData.buy || "buy"}`);
    PROMPT = PROMPT.replace("$STOCK", `${promptData.ticker}`);
    const completion = await generateCompletion(
        PROMPT,
        100
    );
    console.log(completion);
    const parsedCompletion = JSON.parse(completion || "[]");
    return parsedCompletion.map((response: suggestionResponse) => ({
        ticker: promptData.ticker,
        buy: promptData.buy || "buy",
        reason: response.reason,
        sentiment: response.sentiment,
    }));
}
