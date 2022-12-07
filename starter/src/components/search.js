/*
 * @return {React.JSXElement}
 */
export function SearchPage() {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a href="/" className="close-search">
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
}
