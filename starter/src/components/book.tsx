import { ShelfChanger } from '.'

interface Props extends Pick<Backend.Book, 'authors' | 'title'> {
  updateState: () => void
  bookId: Backend.Book['id']
  backgroundImage: string
  shelf: Backend.Shelf | null
}

export function Book(prop: Props) {
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
