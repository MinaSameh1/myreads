// Taken from react-router offical docs https://github.com/remix-run/react-router/blob/main/docs/start/tutorial.md

import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>
        <br /> An Error Has Occured
      </h1>
      <p>
        <br />
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i>
          <br />
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage
