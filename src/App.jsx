import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "./Components/RecipeCard";

function App() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_ID = import.meta.env.VITE_API_ID;

    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${API_ID}&app_key=${API_KEY}`
            );
            setRecipes(response.data.hits);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
    };

    useEffect(() => {
        handleSearch();
    }, []);

    console.log(recipes);

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center justify-center bg-gray-500 text-white">
                    <p>Error: {error.message}</p>
                </div>
            ) : loading ? (
                <div className="flex flex-col items-center justify-center bg-gray-500 text-white">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center bg-gray-500 text-white gap-4">
                        <p>Search for : {searchTerm}</p>
                        <input
                            type="text"
                            value={searchTerm}
                            placeholder="Search for recipes"
                            className="border-2 border-gray-300 rounded-md p-2 text-black"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>

                    {recipes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {recipes.map((recipe, index) => (
                                <RecipeCard
                                    recipe={recipe}
                                    index={index}
                                    key={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-gray-500 text-red-300">
                            <p className="text-2xl font-bold">No recipes !</p>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default App;
