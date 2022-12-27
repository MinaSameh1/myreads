import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import { Book } from '../components'
import { httpError } from '../utils/httpError'
import './Homepage'

/**
 * @description Page that is Responsible for searching.
 */
export function SearchPage() {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const [searchResult, setSearchResults] = useState<Array<Backend.Book>>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const textRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => clearTimeout(timeout.current) // Cleanup
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // A basic implemntation of debounce.
    setLoading(true) // tell user we are loading
    setError('') // Clear the error.
    clearTimeout(timeout.current) // Cancel previous ones.
    timeout.current = setTimeout(() => {
      if (e.target.value != '')
        search(e.target.value, 5)
          .then(res => {
            // Reset error if exists.
            setError('')
            // Set the results
            return setSearchResults(res as Array<Backend.Book>)
          })
          .catch(async err => {
            if (err instanceof httpError)
              return handleError(await err.getMessage())
            console.log(err)
            return setSearchResults([])
          })
      setLoading(false)
    }, 500)
  }

  const handleUpdate = () => {
    // Reset everything.
    if (textRef.current?.value) textRef.current.value = ''
    setSearchResults([])
    setLoading(false)
    setError('')
  }

  const handleError = (err: string) => {
    console.log(err)
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
                  authors={book.authors}
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
