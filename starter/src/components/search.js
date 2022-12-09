import { useState } from 'react';
import { search } from '../BooksAPI';
import { Book } from './book';

/**
 * @description Responsible for searching.
 * @return {React.JSXElement}
 */
export function SearchPage(prop) {
  const [searchResult, setSearchResults] = useState([]);

  const handleInput = (e) => {
    setSearchResults(search(e.target.value, 5));
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a href="/" className="close-search">
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult &&
            searchResult.map((book) => (
              <li key={book.id}>
                <Book
                  bookId={book.id}
                  title={book.title}
                  author={book.author}
                  backgroundImage={book.imageLinks.smallThumbnail}
                  updateState={prop.updateState}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
