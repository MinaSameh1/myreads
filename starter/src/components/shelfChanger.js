import { useEffect, useState } from 'react'
import { get, update } from '../BooksAPI'

/**
 * @description Responisble for handling state changes.
 * @param {{ bookId: string; }} prop
 */
export function ShelfChanger(prop) {
  const [shelf, setShelf] = useState('default')

  useEffect(() => {
    // This is done because the search API doesnt return a shelf...!!!!
    if (!prop.shelf) {
      return get(prop.bookId)
        .then(res => {
          setShelf(res.shelf)
        })
        .catch(err => console.log(err))
    }
    setShelf(prop.shelf)
  }, [])

  return (
    <div className="book-shelf-changer">
      <select
        value={shelf}
        onChange={e =>
          handleBookState(
            { bookId: prop.bookId, state: e.target.value },
            prop.updateState
          )
        }
      >
        <option value="default" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

/**
 * @param {{ bookId: string, state: "currentlyReading" | "wantToRead" | "read" | "none"}} item
 */
function handleBookState(item, updateState) {
  update(item.bookId, item.state)
    .then(() => {
      updateState()
    })
    .catch(err => console.log(err))
}
