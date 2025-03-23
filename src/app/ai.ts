import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a creative and unique recipe each time.
Try to vary your response to make it different from previous ones.
The recipe can include extra ingredients, but keep them minimal.
Format your response in Markdown.
`;

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_ACCESS_TOKEN || "");

export async function getRecipeFromMistral(
  ingredientsArr: string[]
): Promise<string> {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe!`,
        },
      ],
      max_tokens: 1024,
    });

    return (
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a recipe."
    );
  } catch (err: any) {
    console.error(err.message);
    return "Error fetching recipe.";
  }
}
