import { useEffect, useState } from 'react'
import { get, update } from '../BooksAPI'

/**
 * @description Responisble for handling state changes.
 */
export function ShelfChanger(prop: {
  bookId: string
  shelf: string | null
  updateState: () => void
}) {
  const [shelf, setShelf] = useState('default')

  useEffect(() => {
    // This is done because the search API doesnt return a shelf...!!!!
    if (!prop.shelf) {
      get(prop.bookId)
        .then(res => {
          return setShelf(res.shelf)
        })
        .catch(err => console.log(err))
    }
    return setShelf(prop.shelf ?? 'none')
  }, [])

  return (
    <div className="book-shelf-changer">
      <select
        value={shelf}
        onChange={e =>
          handleBookState(
            { bookId: prop.bookId, state: e.target.value as Backend.Shelf },
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
function handleBookState(
  item: {
    bookId: string
    state: Backend.Shelf
  },
  updateState: () => void
) {
  update(item.bookId, item.state)
    .then(() => {
      updateState()
    })
    .catch(err => console.log(err))
}
