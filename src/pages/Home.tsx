import logo from '../assets/tasty-logo.jpg'

export const Home = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src={logo} alt="logo" className="border-2 border-amber-100 rounded-full" />
        <h1 className="text-4xl font-bold mt-10">Welcome to Tasty</h1>
        <h2 className="text-2xl font-bold mt-10">Your go-to source for recipes</h2>
        <p className="text-gray-600 mt-5">Find and share recipes from around the world</p>
        <p className="text-gray-600 mt-5">Please login to get started</p>
      </div>
    </section>
  )
} 