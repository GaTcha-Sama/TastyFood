import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

type ApiResponse = {
  results: {
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
    servings: number;
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
  }[];
  count: number;
};

export const Recipes = () => {
  const navigate = useNavigate();
  const { isConnected, favorites, addToFavorites, removeFromFavorites } = useAuthContext();
  
  const { error, loading, data } = useFetch<ApiResponse>({
    url: 'https://tasty.p.rapidapi.com/recipes/list',

    params: {
      from: 0,
      size: 20,
      tags: 'under_30_minutes'
    },
    options: {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    }
  });
  console.log('API Response:', data);

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center font-serif">
          Our Delicious Recipes
        </h1>
        
        {data?.results && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.results.map((recipe) => (
              <div 
                key={recipe.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
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
                  <h2 className="text-xl font-bold text-orange-900 mb-3 font-serif">
                    {recipe.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {recipe.description || "No description available"}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Temps total:</span>
                      <span>{recipe.total_time_minutes || '?'} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Calories:</span>
                      <span>{recipe.nutrition?.calories || '?'} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Note:</span>
                      <span>{recipe.user_ratings?.score ? `${(recipe.user_ratings.score * 100).toFixed(0)}%` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags?.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
                      >
                        {tag.display_name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button 
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
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
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
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

        {error && (
          <div className="text-red-600 text-center p-8 bg-red-50 rounded-lg">
            <p className="font-medium">An error occurred</p>
            <p className="text-sm mt-2">Please try again later</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-orange-800 font-medium">Preparing recipes...</p>
          </div>
        )}
      </div>
    </div>
  );
}
