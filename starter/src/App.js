import { useEffect, useState } from 'react';
import './App.css';
import { getAll } from './BooksAPI';
import { BookShelf } from './components';

function App() {
  const [books, setBooks] = useState(false);

  useEffect(() => {
    getAll()
      .then((Books) => {
        setBooks(Books);
      })
      .catch((err) => console.log(err));
  }, []);

  // Clojure to update state, sent to child comp.
  const updateState = function () {
    return function () {
      getAll()
        .then((Books) => {
          setBooks(Books);
        })
        .catch((err) => console.log(err));
    };
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div>
              {books && (
                <BookShelf
                  books={books.filter(
                    (book) => book.shelf === 'currentlyReading'
                  )}
                  title="Currently Reading"
                  updateState={updateState()}
                />
              )}
            </div>
            <div>
              {books && (
                <BookShelf
                  books={books.filter((book) => book.shelf === 'wantToRead')}
                  title="Want To Read"
                  updateState={updateState()}
                />
              )}
            </div>
            <div>
              {books && (
                <BookShelf
                  books={books.filter((book) => book.shelf === 'read')}
                  title="Read"
                  updateState={updateState()}
                />
              )}
            </div>
          </div>
        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    </div>
  );
}

export default App;
