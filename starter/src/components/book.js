import { ShelfChanger } from '.'

/**
 * @param {{ bookId: string, backgroundImage: string, title: string, authors: string }} prop
 */
export function Book(prop) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${prop.backgroundImage})`
          }}
        ></div>

        <ShelfChanger
          shelf={prop.shelf}
          bookId={prop.bookId}
          updateState={prop.updateState}
        />
      </div>
      <div className="book-title">{prop.title}</div>
      <div className="book-authors">
        {prop.authors ? prop.authors.toString() : 'Unknown'}
      </div>
    </div>
  )
}
