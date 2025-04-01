import { Book } from '../types/Book';

interface FetchBookResponse {
  Books: Book[];
  totalNumProjects: number;
}

const API_URL = 'https://localhost:8005/api/Store';

export const fetchProjects = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBookResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `BookTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Projects:', error);
    throw error;
  }
};

export const addProject = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Store/AddBook?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add Book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding books', error);
    throw error;
  }
};
export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(
      `${API_URL}/Water/UpdateBook/${bookId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error updating Projects', error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete Porject');
    }
  } catch (error) {
    console.error('Error deleting Porject:', error);
    throw error;
  }
};
