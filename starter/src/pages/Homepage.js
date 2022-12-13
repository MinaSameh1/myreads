import { useEffect, useState } from 'react'
import './Homepage.css'
import { getAll } from '../BooksAPI'
import { BookShelf } from '../components'
import { Link } from 'react-router-dom'

/**
 * @description Main Portion of the website.
 * @return {React.JSXElement}
 */
export function Homepage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    setBooks(getBooks())
  }, [])

  /**
   * @description Cache books in localStorage.
   * @returns {Array<book>}
   */
  function getBooks() {
    getAll()
      .then(Books => {
        console.log('Api Request sent')
        setBooks(Books)
      })
      .catch(err => console.log(err))
  }

  // Clojure to update state, sent to child comp.
  const updateState = function () {
    return function () {
      getBooks()
    }
  }

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
                    book => book.shelf === 'currentlyReading'
                  )}
                  title="Currently Reading"
                  updateState={updateState()}
                />
              )}
            </div>
            <div>
              {books && (
                <BookShelf
                  books={books.filter(book => book.shelf === 'wantToRead')}
                  title="Want To Read"
                  updateState={updateState()}
                />
              )}
            </div>
            <div>
              {books && (
                <BookShelf
                  books={books.filter(book => book.shelf === 'read')}
                  title="Read"
                  updateState={updateState()}
                />
              )}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" state={{ updateState: updateState() }}>
            Add a book
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
