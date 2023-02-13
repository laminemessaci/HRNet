export const navigateTo = (path: string, navigate) => {
  navigate(`${path}`)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
