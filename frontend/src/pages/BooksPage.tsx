import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import BookList from '../components/BookList';
import { CartContext } from '../context/CartContext';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartContext value={undefined} />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="row">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
export default BooksPage;
