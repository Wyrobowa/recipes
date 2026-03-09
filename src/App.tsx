import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout, Text } from 'tharaday';
import CategoriesPage from './pages/categories/CategoriesPage.tsx';
import RecipesPage from './pages/recipes/RecipesPage.tsx';

const navItems = [
  { id: 'recipes', label: 'Recipes', href: '/recipes' },
  { id: 'categories', label: 'Categories', href: '/categories' },
];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeNavId = location.pathname.startsWith('/categories') ? 'categories' : 'recipes';

  return (
    <AppLayout
      headerLogo={<Text weight="bold">Recipes</Text>}
      navItems={navItems}
      activeNavId={activeNavId}
      onNavItemClick={(id) => navigate(`/${id}`)}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
