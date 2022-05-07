import PageIcon from '_assets/icons/page-icon.svg'
import FilterIcon from '_assets/icons/filter-icon.svg'
import LimitIcon from '_assets/icons/limit-icon.svg'
import OffsetIcon from '_assets/icons/offset-icon.svg'

const QUERY_PARAMS = {
  FILTER: 'filter',
  LIMIT: 'limit',
  OFFSET: 'offset'
}

export const PARAMS_AND_PAGE_ICONS = {
  [QUERY_PARAMS.FILTER]: FilterIcon,
  [QUERY_PARAMS.LIMIT]: LimitIcon,
  [QUERY_PARAMS.OFFSET]: OffsetIcon,
  PAGE: PageIcon
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

export const getCurrentPageName = (location, urlParams) => {
  const hasParams = Object.keys(urlParams).length > 0
  const [_, currentPage] = location.split('/')
  const capitalizedPageName = `${currentPage[0].toUpperCase()}${currentPage.slice(1, currentPage.length - 1)}`
  return hasParams ? `${capitalizedPageName} Details` : capitalizedPageName
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
