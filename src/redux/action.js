import apiClient from '../api/NpvCalculatorClient';

export const CALCULATE_NPV = 'CALCULATE_NPV';
export const CALCULATE_NPV_SUCCESS = 'CALCULATE_NPV_SUCCESS';
export const CALCULATE_NPV_FAILURE = 'CALCULATE_NPV_FAILURE';

export const SET_PROPERTY = 'SET_PROPERTY';

export const ADD_YEAR = 'ADD_YEAR';
export const REMOVE_YEAR = 'REMOVE_YEAR';
export const SET_YEAR_CASHFLOW = 'SET_YEAR_CASHFLOW';

export const SET_CHART_TYPE = 'SET_CHART_TYPE';

function createActionCreator(type, ...argNames) {
  return function actionCreator(...args) {
    const payload = { };
    argNames.forEach((arg, index) => payload[argNames[index]] = args[index]);
    return { type, payload };
  };
}

const calculateNpvSuccess = createActionCreator(CALCULATE_NPV_SUCCESS, 'results');
const calculateNpvFailure = createActionCreator(CALCULATE_NPV_FAILURE, 'error');

export function calculateNpv(calculateNpvRequest) {
  return async (dispatch) => {
    try {
      dispatch({ type: CALCULATE_NPV });
      const result = await apiClient.calculateNpv(calculateNpvRequest);
      dispatch(calculateNpvSuccess(result));
    } catch (error) {
      dispatch(calculateNpvFailure(error));
    }
  };
}

export const setProperty = createActionCreator(SET_PROPERTY, 'property', 'value');

export const addYear = createActionCreator(ADD_YEAR);
export const removeYear = createActionCreator(REMOVE_YEAR, 'yearNumber');
export const setYearCashFlow = createActionCreator(SET_YEAR_CASHFLOW, 'yearNumber', 'cashFlow');

export const setChartType = createActionCreator(SET_CHART_TYPE, 'chartType');
