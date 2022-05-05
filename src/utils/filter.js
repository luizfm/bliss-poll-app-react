const QUERY_PARAMS = {
  FILTER: 'filter',
  LIMIT: 'limit',
  OFFSET: 'offset'
}

export const filterParse = (filter) => {
  const parsedFilter = filter.replace('?', '')
  const params = parsedFilter.split('&')

  const newParams = {}
  params.forEach((param) => {
    const [key, value] = param.split('=')
    if (!value) {
      return
    }
    if ((key === QUERY_PARAMS.LIMIT || key === QUERY_PARAMS.OFFSET) && value) {
      newParams[key] = Number(value)
      return
    }

    newParams[key] = value
  })

  return newParams
}

export const getCurrentPageName = (location) => {
  const [_, currentPage] = location.split('/')
  const capitalizedPageName = `${currentPage[0].toUpperCase()}${currentPage.slice(1, currentPage.length - 1)}`
  return capitalizedPageName
}

export const contentUrlParse = (filter) => {
  let url = process.env.APPLICATION_URL
  const { path, ...restProps } = filter
  url = `${url}${path}`

  const formattedUrl = Object.keys(restProps).reduce((acc, currentKey, currentIndex) => {
    if (restProps[currentKey]) {
      return `${acc}${currentIndex === 0 ? '?' : '&'}${currentKey}=${restProps[currentKey]}`
    }
    return acc
  }, url)

  return formattedUrl
}
