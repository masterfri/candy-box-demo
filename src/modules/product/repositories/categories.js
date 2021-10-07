import App from 'candy-box/app.js';

const CategoryRepositorySymbol = Symbol('CategoryRepository');
const categories = () => App.make(CategoryRepositorySymbol);

export default categories;

export {
    CategoryRepositorySymbol,
}