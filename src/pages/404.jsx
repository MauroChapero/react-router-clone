import { Link } from '../Link'

export function Page404() {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img src="https://midu.dev/images/this-is-fine-404.gif" />
      </div>
      <Link to="/">Volver a la home</Link>
    </>
  )
}
