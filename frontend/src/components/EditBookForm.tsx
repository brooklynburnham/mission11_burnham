import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handelSubmit}>
      <h2>Update Book</h2>
      <label>
        Book Title:
        <input
          type="text"
          name="bookTitle"
          value={formData.title}
          onChange={handelChange}
        />
      </label>
      <label>
        Book Author:
        <input
          type="text"
          name="bookAuthor"
          value={formData.author}
          onChange={handelChange}
        />
      </label>
      <label>
        Book Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handelChange}
        />
      </label>
      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handelChange}
        />
      </label>
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handelChange}
        />
      </label>
      <label>
        Book Category:
        <input
          type="text"
          name="bookCategory"
          value={formData.category}
          onChange={handelChange}
        />
      </label>
      <label>
        Page Count:
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handelChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="bookPrice"
          value={formData.price}
          onChange={handelChange}
        />
      </label>
      <button type="submit">Add Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
