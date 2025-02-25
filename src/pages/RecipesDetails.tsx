/**
 * RecipesDetails component - Detailed view of a single recipe
 * A responsive React component that fetches and displays comprehensive recipe information
 * Features:
 * - Fetches recipe data from Tasty API using RapidAPI
 * - Displays loading spinner during data fetch
 * - Shows error message if recipe not found
 * - Presents detailed recipe information including:
 *   - Title and featured image
 *   - Description and cooking instructions
 *   - Cooking times and serving information
 *   - Ingredients list with measurements
 *   - User ratings and nutritional information
 * - Responsive layout with grid system for different screen sizes
 * - Styled with Tailwind CSS for an elegant presentation
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe } from '../types/recipe';

export const RecipesDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
          }
        });
        const data = await response.json();
        if (isMounted) {
          setRecipe(data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipe();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return (
    <div className="text-center py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto"></div>
      <p className="mt-6 text-orange-800 font-medium">Recipe is loading...</p>
    </div>
  );
  
  if (!recipe) return (
    <div className="text-red-600 text-center p-8 bg-red-50 rounded-lg">
      <p className="font-medium">Recipe not found</p>
      <p className="text-sm mt-2">Please check URL and retry</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-amber-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-orange-800 font-serif">{recipe.name}</h1>
        <img 
          src={recipe.thumbnail_url} 
          alt={recipe.name} 
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="mb-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-orange-900">Description</h2>
            <p>{recipe.description || "Aucune description disponible"}</p>
          </section>

          <section className="mb-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-orange-900">Instructions</h2>
            <div className="space-y-4">
              {Array.isArray(recipe.instructions) 
                ? recipe.instructions.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="font-bold text-orange-600">{index + 1}.</span>
                      <p>{typeof step === 'object' && step.display_text ? step.display_text : step}</p>
                    </div>
                  ))
                : typeof recipe.instructions === 'string'
                  ? recipe.instructions.split('\n').map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <span className="font-bold text-orange-600">{index + 1}.</span>
                        <p>{step}</p>
                      </div>
                    ))
                  : <p>Aucune instruction disponible</p>
              }
            </div>
          </section>
        </div>

        <div className="md:col-span-1">
          <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-3 text-orange-900">Infos</h2>
            <div className="space-y-3">
              <p>⏱️ Time total: {recipe.total_time_minutes || '?'} min</p>
              <p>🍳 Cooking time: {recipe.cook_time_minutes || '?'} min</p>
              <p>⚡ Preparation: {recipe.prep_time_minutes || '?'} min</p>
              <p>👥 Portions: {recipe.servings || '?'}</p>
              <p>🔥 Calories: {recipe.nutrition?.calories || '?'} kcal</p>
              <p>⭐ Note: {recipe.user_ratings?.score ? `${(recipe.user_ratings.score * 100).toFixed(0)}%` : 'N/A'}</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-orange-900">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.sections?.map((section, sectionIndex) => 
                section.components.map((component, componentIndex) => {
                  const measurement = component.ingredient.measurements?.[0];
                  return (
                    <li key={`${sectionIndex}-${componentIndex}`} className="flex items-center">
                      <span>• {measurement ? `${measurement.quantity} ${measurement.unit} ` : ''}{component.ingredient.name}</span>
                    </li>
                  );
                })
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
