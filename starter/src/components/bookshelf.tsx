import { Book } from '.'

interface Props {
  books: Array<Backend.Book>
  title: string
  updateState: () => unknown
}

export function BookShelf(prop: Props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{prop.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {prop.books &&
            prop.books.map(book => {
              return (
                <li key={book.id}>
                  <Book
                    shelf={book.shelf}
                    bookId={book.id}
                    title={book.title}
                    authors={book.authors}
                    backgroundImage={book.imageLinks.smallThumbnail}
                    updateState={prop.updateState}
                  />
                </li>
              )
            })}
        </ol>
      </div>
    </div>
  )
}
