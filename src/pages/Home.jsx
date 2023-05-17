import { Link } from '../Link'

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Pagina de ejemplo para la home page</p>
      <Link to='/about'>Ir a sobre nosotros</Link>
    </>
  )
}
