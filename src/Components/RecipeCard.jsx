export default function RecipeCard({ recipe, index }) {
    return (
        <>
            <div
                key={index}
                className="flex flex-col items-center bg-gray-800 text-white gap-4 border-2 border-gray-300 rounded-md p-4"
            >
                <h2 className="text-2xl font-bold">{recipe.recipe.label}</h2>
                <img
                    src={recipe.recipe.image}
                    alt={recipe.recipe.label}
                    className="flex"
                />
            </div>
        </>
    );
}
