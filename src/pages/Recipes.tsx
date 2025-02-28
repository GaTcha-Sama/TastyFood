/**
 * Recipes component - Main recipe listing page
 * A responsive React component that displays a grid of recipe cards
 * Features:
 * - Search functionality with debounced input
 * - Mock data integration (currently using static data instead of API) at the end of the file and commented out
 * - Recipe cards showing:
 *   - Thumbnail image with hover effects
 *   - Recipe name and description
 *   - Cooking time and nutritional info
 *   - Tags and ratings
 * - Favorite system integration:
 *   - Add/remove recipes to favorites (for connected users)
 *   - Visual feedback for favorite status
 * - Loading states and error handling
 * - Responsive grid layout (1-3 columns based on screen size)
 * - Navigation to detailed recipe view
 * - Styled with Tailwind CSS for modern UI/UX
 */

import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ApiResponse } from '../types/recipe';
import { useFetch } from '../hooks/useFetch';

export const Recipes = () => {
  const navigate = useNavigate();
  const { isConnected, favorites, addToFavorites, removeFromFavorites } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error } = useFetch<ApiResponse>(
    'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20'
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = data?.results?.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags?.some(tag => 
      tag.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) 
    return <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    </div>
  if (error) return <div>{error}</div>;
  
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center font-serif">
          Our Delicious Recipes
        </h1>

        <div className="mb-8">
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search by recipe name or ingredient..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 rounded-full border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
        
        {filteredRecipes && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100 cursor-pointer"
              >
                {recipe.thumbnail_url && (
                  <div className="relative group">
                    <img 
                      src={recipe.thumbnail_url} 
                      alt={recipe.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-orange-900 mb-3 font-serif text-center">
                    {recipe.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {recipe.description || "No description available"}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Total Time:</span>
                      <span>{recipe.total_time_minutes || '?'} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Calories:</span>
                      <span>{recipe.nutrition?.calories || '?'} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Rate:</span>
                      <span>{recipe.user_ratings?.score ? `${(recipe.user_ratings.score * 100).toFixed(0)}%` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {recipe.tags?.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                      >
                        {tag.display_name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-4 justify-center">
                    <button 
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors duration-300 hover:scale-103 cursor-pointer"
                    >
                      View Recipe Details
                    </button>
                    {isConnected && (
                      <button 
                        onClick={() => {
                          const isFavorite = favorites.some(fav => fav.id === recipe.id);
                          if (isFavorite) {
                            removeFromFavorites(recipe.id);
                          } else {
                            addToFavorites(recipe);
                          }
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                          favorites.some(fav => fav.id === recipe.id)
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {favorites.some(fav => fav.id === recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



// MOCK DATA
// const mockData: ApiResponse = {
//   results: Array(6).fill({
//     id: 1,
//     name: "Ratatouille Provençale",
//     description: "Un plat traditionnel français rempli de légumes d'été mijotés",
//     thumbnail_url: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?q=80&w=1000&fit=max",
//     url: "",
//     country: "France",
//     instructions: "Instructions détaillées de la recette...",
//     nutrition: {
//       calories: 250,
//       protein: 5,
//       fat: 12,
//       carbs: 35
//     },
//     total_time_minutes: 45,
//     cook_time_minutes: 30,
//     prep_time_minutes: 15,
//     servings: 4,
//     tags: [
//       { name: "healthy", display_name: "Healthy", type: "dietary" },
//       { name: "vegetarian", display_name: "Végétarien", type: "dietary" },
//       { name: "french", display_name: "Français", type: "cuisine" }
//     ],
//     user_ratings: {
//       count_positive: 150,
//       score: 0.92,
//       count_negative: 13
//     },
//     sections: [{
//       components: [{
//         ingredient: {
//           name: "Aubergine",
//           measurements: [{
//             unit: "pièce",
//             quantity: "2"
//           }]
//         }
//       }]
//     }]
//   }),
//   count: 6
// };

// MOCK DATA
  // const [loading] = useState(false);
  // const [error] = useState<string | null>(null);
  // const [data] = useState<ApiResponse>(mockData);

