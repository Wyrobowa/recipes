export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

// API endpoint conventions (backend design, do not "fix"):
// Reads:   GET /categories, /products, /recipes  (plural)
// Create:  POST /category, /product, /recipe/add  (singular, recipes uses /add suffix)
// Update:  PUT /category/:id, /product/:id, /recipe/edit/:slug
// Delete:  DELETE /category/:id, /product/:id, /recipe/:slug  (recipes use slug, others use id)
