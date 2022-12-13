import { Book } from '.'

export function BookShelf(prop) {
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
                    author={book.author}
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
