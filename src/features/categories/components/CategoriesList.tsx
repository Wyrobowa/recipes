import NamedEntityCrudList from '../../shared/components/NamedEntityCrudList.tsx';
import { categoryListConfig } from '../helpers/categoryListConfig.ts';
import { useCategories } from '../hooks/useCategories.ts';

const CategoriesList = () => {
  const {
    categories,
    isLoading,
    error,
    isCreating,
    updatingCategoryId,
    deletingCategoryId,
    actionError,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  return (
    <NamedEntityCrudList
      items={categories}
      singularLabel={categoryListConfig.singularLabel}
      pluralLabel={categoryListConfig.pluralLabel}
      inputId={categoryListConfig.inputId}
      inputPlaceholder={categoryListConfig.inputPlaceholder}
      isLoading={isLoading}
      error={error}
      isCreating={isCreating}
      updatingItemId={updatingCategoryId}
      deletingItemId={deletingCategoryId}
      actionError={actionError}
      onCreate={createCategory}
      onUpdate={updateCategory}
      onDelete={deleteCategory}
    />
  );
};

export default CategoriesList;
