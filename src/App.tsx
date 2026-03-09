import RecipesListPage from './pages/recipes/RecipesPage.tsx';
import './App.css';
import { AppLayout, Text } from 'tharaday';

const navItems = [{ id: 'recipes', label: 'Recipes', href: '#' }];

const App = () => (
  <AppLayout headerLogo={<Text weight="bold">Recipes</Text>} navItems={navItems}>
    <RecipesListPage />
  </AppLayout>
);

export default App;
