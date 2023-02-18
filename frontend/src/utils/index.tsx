/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const navigateTo = (path: string, navigate) => {
  navigate(`${path}`)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const formatedDate = (item) => {
  const formatMonths = {
    'Jan.': 0,
    'Fév.': 1,
    'Mar.': 2,
    'Avr.': 3,
    'Mai.': 4,
    'Jui.': 5,
    'Juil.': 6,
    'Aoû.': 7,
    'Sept.': 8,
    'Oct.': 9,
    'Nov.': 10,
    'Déc.': 11,
  }

  const getDateArray = (itemDate) => {
    // console.log(itemDate);
    // console.log(itemDate.date);
    return itemDate.date.split(' ')
  }

  const getFixedMonth = (month) => {
    const correspondenceMonth = formatMonths[month]
    if (correspondenceMonth === undefined) {
      console.log('correspondence', month, correspondenceMonth)
    }

    return correspondenceMonth
  }

  const getFixedYear = (year: string) => {
    const currentYear = new Date().getFullYear().toString()
    const currentFormatedYear = currentYear.slice(-2)
    const formatedYear = parseInt(year, 10)
    // @ts-ignore
    const fixedYear = formatedYear > currentFormatedYear ? `19${formatedYear}` : `20${formatedYear}`
    return fixedYear
  }

  const [day, month, year] = getDateArray(item)
  const dateFormated = {
    year: getFixedYear(year),
    month: getFixedMonth(month),
    day: day,
  }
  // @ts-ignore
  const fixedDate = new Date(dateFormated.year, dateFormated.month, dateFormated.day)

  return fixedDate
}

/**
 ** Keep only letters and remove accents
 * @param {string} str
 * @returns {string}
 */
export const toNormalForm = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[.,;:!\?\*"()°]/g, '')
    .replace(/[']/g, ' ')
    .replace(/[\d]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * *Capitalize First character
 * @param {string} str
 * @returns {string}
 */
export const capitalizeFirstChar = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1)
}

export const buildObjectData = (key: string, searchInput: string, employee) => {
  return {
    key: key,
    searchInput: toNormalForm(searchInput),
    employee,
  }
}

export const objectBuilder = (employees) => {
  const arraySearch = []
  employees?.forEach((employee) => {
    const { id, firstName, lastName, department, street, city, state } = employee
    // console.log('employee', firstName, lastName)
    arraySearch.push(
      buildObjectData(
        id,
        firstName
          .concat(',')
          .concat(lastName)
          .concat(',')
          .concat(department)
          .concat(',')
          .concat(street)
          .concat(',')
          .concat(city)
          .concat(',')
          .concat(state),
        employee,
      ),
    )
  })
  console.log('mmm', arraySearch)
  return arraySearch
}
