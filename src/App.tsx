import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout, NavBar, Text } from 'tharaday';
import CategoriesPage from './pages/categories/CategoriesPage.tsx';
import ProductsPage from './pages/products/ProductsPage.tsx';
import RecipesPage from './pages/recipes/RecipesPage.tsx';

const navItems = [
  { id: 'recipes', label: 'Recipes', href: '/recipes' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'categories', label: 'Categories', href: '/categories' },
];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeNavId =
    navItems.find((item) => location.pathname.startsWith(item.href))?.id ?? 'recipes';

  return (
    <AppLayout
      navbar={
        <NavBar
          logo={<Text weight="bold">Recipes</Text>}
          items={navItems}
          activeId={activeNavId}
          onItemClick={(id: string) => navigate(`/${id}`)}
        />
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
