import { httpError } from './utils/httpError'

const api = 'https://reactnd-books-api.udacity.com'

let token = localStorage.token

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  Authorization: token as string
}

export async function fetchUrl(
  url: string,
  errorMessage: string,
  options: RequestInit = { headers: DEFAULT_HEADERS }
) {
  const res = await fetch(`${api}${url}`, { ...options })
  if (!res.ok) throw new httpError(errorMessage, res)
  const data = await res.json()
  return data
}

export const get = (bookId: string): Promise<Backend.Book> =>
  fetchUrl(`/books/${bookId}`, 'Error in get book').then(data => data.book)

export const getAll = (): Promise<Array<Backend.Book>> =>
  fetchUrl('/books', 'error in getAllBooks').then(data => data.books)

export const update = (bookId: string, shelf: Backend.Book['shelf']) =>
  fetchUrl(`/books/${bookId}`, 'error in update book', {
    method: 'PUT',
    headers: {
      ...DEFAULT_HEADERS,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res)

export const search = (
  query: string,
  maxResults: number
): Promise<Array<Backend.Book>> =>
  fetchUrl('/search', 'error in search', {
    method: 'POST',
    headers: {
      ...DEFAULT_HEADERS,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(data => {
    if (data.books.error) throw new httpError(data.books.error, null)
    return data.books
  })
