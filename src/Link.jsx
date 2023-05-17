import { EVENTS } from './consts'

export function navigate(href) {
  window.history.pushState({}, '', href)
  // evento personalizado para indicar que cambiamos la url
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0 // primary click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      // navegacion con SPA
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
