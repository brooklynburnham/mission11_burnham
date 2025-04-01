import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFiler from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary';
import WelcomeBand from '../components/WelcomeBand';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
    <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
        <CategoryFiler
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
export default BooksPage;
