import {MAX_DAYS} from "../helpers/consts";

function useDefaultFilterDate() {
 let date = new Date();
  const startDate = new Date(date.setDate(date.getDate() - MAX_DAYS));
  date = new Date();
  const endDate = new Date(date.setDate(date.getDate() + MAX_DAYS));

  return {
    startDate,
    endDate
  }
}

export default useDefaultFilterDate;