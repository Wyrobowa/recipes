import RecipesList from '../../features/recipes/components/RecipesList.tsx';

const RecipesListPage = () => (
  <main className="page">
    <header className="page-header">
      <h1>Recipes List</h1>
      <p>Your first recipe page.</p>
    </header>

    <section className="panel" aria-label="Recipes">
      <RecipesList />
    </section>
  </main>
);

export default RecipesListPage;
