// import { useFetch } from '../hooks/useFetch'; // comment useFetch to prevent api call

type ApiResponse = {
  results: {
    id: number;
    name: string;
    description: string | null;
    thumbnail_url: string;
  }[];
  count: number;
};

// Add mock data for prevent api call
const mockData: ApiResponse = {
  count: 5,
  results: [
    {
      id: 1,
      name: "Homemade Pizza",
      description: "Classic margherita pizza with fresh basil and mozzarella",
      thumbnail_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      description: "Creamy pasta with pancetta and parmesan",
      thumbnail_url: "https://images.unsplash.com/photo-1546549032-9571cd6b27df"
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with homemade caesar dressing",
      thumbnail_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },
    // ... you can add more examples
  ]
};


export const Recipes = () => {
  // Temporarily comment the real API call
  /*
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
        'x-rapidapi-key': import.meta.env.RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.RAPIDAPI_HOST
      }

    }
  });
  */

  // Use mock data instead
  const data = mockData;
  const loading = false;
  const error = null;


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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {recipe.description || "No description available"}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-medium transition-colors duration-300">
                    View Recipe
                  </button>
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
