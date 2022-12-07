import { update } from '../BooksAPI';

/**
 * @description Responisble for handling state changes.
 * @param {{ bookId: string; }} prop
 */
export function ShelfChanger(prop) {
  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={'default'}
        onChange={(e) =>
          handleBookState(
            { bookId: prop.bookId, state: e.target.value },
            prop.updateState
          )
        }
      >
        <option value={'default'} disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

/**
 * @param {{ bookId: string, state: "currentlyReading" | "wantToRead" | "read" | "none"}} item
 */
function handleBookState(item, updateState) {
  console.dir(item, { depth: 2 });
  update(item.bookId, item.state)
    .then((res) => {
      console.log(res);
      updateState();
    })
    .catch((err) => console.log(err));
}
