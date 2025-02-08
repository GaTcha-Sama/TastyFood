import { useFetch } from '../hooks/useFetch';

type ApiResponse = {
  results: {
    id: number;
    name: string;
    description: string | null;
    thumbnail_url: string;
  }[];
  count: number;
};

export const Recipes = () => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Recettes</h1>
      
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>

      {data?.results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((recipe) => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {recipe.thumbnail_url && (
                <img 
                  src={recipe.thumbnail_url} 
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.name}
                </h2>
                <p className="text-gray-600">
                  {recipe.description || "Pas de description disponible"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="text-red-600 text-center">Une erreur est survenue</div>
      )}
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      )}
    </div>
  );
}
