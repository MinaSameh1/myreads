import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import { Book } from '../components'
import './Homepage'

/**
 * @description Page that is Responsible for searching.
 * @return {React.JSXElement}
 */
export function SearchPage() {
  let timeout
  const [searchResult, setSearchResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeout) // Cleanup
  }, [])

  const handleInput = e => {
    // A basic implemntation of debounce.
    setLoading(true) // tell user we are loading
    setError('') // Clear the error.
    clearTimeout(timeout) // Cancel previous ones.
    timeout = setTimeout(() => {
      search(e.target.value, 5)
        .then(res => {
          if (res.error) return handleError(res.error)
          // Reset error if exists.
          setError('')
          // Set the results
          return setSearchResults(res)
        })
        .catch(err => {
          console.log(err)
          return setSearchResults([])
        })
      setLoading(false)
    }, 500)
  }

  const handleUpdate = () => {
    // Reset everything.
    textRef.current.value = ''
    setSearchResults([])
    setLoading(false)
    setError('')
  }

  const handleError = err => {
    // clean the shelf
    setSearchResults([])
    switch (err) {
      case 'empty query':
        return setError('No books found.')
      default:
        console.log(err)
        return setError('Something went wrong, Please try again.')
    }
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            ref={textRef}
            placeholder="Search by title, author, or ISBN"
            onChange={e => handleInput(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {loading && <h3>Loading....</h3>}
        {error}
        <ol className="books-grid">
          {searchResult?.length > 0 &&
            searchResult.map(book => (
              <li key={book.id}>
                <Book
                  shelf={null}
                  bookId={book.id}
                  title={book.title}
                  author={book.author}
                  backgroundImage={book?.imageLinks?.smallThumbnail}
                  updateState={handleUpdate}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  )
}
