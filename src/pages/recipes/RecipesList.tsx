type Recipe = {
  id: number
  name: string
  description: string
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Tomato Pasta',
    description: 'Quick pasta with garlic, olive oil, and cherry tomatoes.',
  },
  {
    id: 2,
    name: 'Chicken Curry',
    description: 'Creamy curry with coconut milk and mild spices.',
  },
  {
    id: 3,
    name: 'Greek Salad',
    description: 'Cucumber, tomato, olives, feta, and lemon dressing.',
  },
]

const RecipesList = () => {
  return (
    <ul className="recipes-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <div>
            <strong>{recipe.name}</strong>
            <p>{recipe.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RecipesList
