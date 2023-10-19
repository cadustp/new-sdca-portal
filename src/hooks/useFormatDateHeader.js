import { MAX_DAYS } from '../helpers/consts';

function useFormatDateHeader({intl, startDate, endDate, textId}) {
 const parseDate = (dateString, locale) => new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString));

  const defaultStartDateToReturn = () => {
    let date = new Date();
    return parseDate(new Date(date.setDate(date.getDate() - MAX_DAYS)).toString(), intl.locale);
  }

  const defaultEndDateToReturn = () => {
    let date = new Date();
    return parseDate(new Date(date.setDate(date.getDate() + MAX_DAYS)).toString(), intl.locale);
  }

  const getDefaultDates = () => {
   return {
     firstDate: defaultStartDateToReturn(),
     secondDate: defaultEndDateToReturn()
   }
  }

  const getParsedDate = () => {
    return {
      firstDate: parseDate(startDate, intl.locale),
      secondDate: parseDate(endDate, intl.locale)
    }
  }

  const retrieveDates = () => {
    if (startDate && endDate) {
      return getParsedDate()
    } else {
      return getDefaultDates()
    }
  }
 
  return intl.formatMessage(
    { id: textId },
    {
      ...retrieveDates()
    },
  )
}

export default useFormatDateHeader;