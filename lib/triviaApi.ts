import { Question } from "@/types/quiz";

export const fetchQuestions = async (
  amount: number = 10,
  category?: number,
  difficulty?: string
): Promise<Question[]> => {
  const url = new URL("https://opentdb.com/api.php");
  url.searchParams.append("amount", amount.toString());
  if (category) url.searchParams.append("category", category.toString());
  if (difficulty) url.searchParams.append("difficulty", difficulty);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const fetchCategories = async (): Promise<
  { id: number; name: string }[]
> => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
