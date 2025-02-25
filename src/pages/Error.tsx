/**
 * Error component - Displays a 404 error page
 * A responsive React component that renders a centered error message
 * with a "404" heading, "Page not found" text, and a "Back to Home" button
 */

export const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

