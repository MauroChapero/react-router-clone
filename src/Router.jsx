import { useState, useEffect, Children } from 'react'
import { EVENTS } from './consts'
import { match } from 'path-to-regexp'

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    // suscribirse al evento
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      // desuscribirse al evento
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  }).filter(Boolean)

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  // routes.path === window.location.pathname
  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // uso de path-to-regexp
    // para detectar rutas dinamicas
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // como por ejemplo
    // /search/:query
    routeParams = matched.params // { query: 'react' } // /search/react
    return true
  })?.Component

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  )
}
