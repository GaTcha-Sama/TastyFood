/**
 * Types for the recipe API response used in the application especially in the Recipes component and RecipesDetails component
 */

export type Recipe = {
  id: number;
  name: string;
  description: string | null;
  thumbnail_url: string;
  url: string;
  country: string;
  instructions: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  total_time_minutes: number;
  cook_time_minutes: number;
  prep_time_minutes: number;
  tags: Array<{
    name: string;
    display_name: string;
    type: string;
  }>;
  user_ratings: {
    count_positive: number;
    score: number;
    count_negative: number;
  };
  sections: Array<{
    components: Array<{
      ingredient: {
        name: string;
        measurements: Array<{
          unit: string;
          quantity: string;
        }>;
      };
    }>;
  }>;
};

export type ApiResponse = {
  results: Recipe[];
  count: number;
}; 