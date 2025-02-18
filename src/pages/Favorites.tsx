import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export const Favorites = () => {
  const { favorites, removeFromFavorites } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center font-serif">
          My Favorite Recipes
        </h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">You haven't added any favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((recipe) => (
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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {recipe.description || "No description available"}
                  </p>
                  <div className="mt-4 flex gap-4">
                  <button 
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
                    >
                      View Recipe Details
                    </button>
                    <button 
                      onClick={() => removeFromFavorites(recipe.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
                    >
                      Remove from Favorites
                    </button>
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
