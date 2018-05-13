import {
  CALCULATE_NPV,
  CALCULATE_NPV_SUCCESS,
  CALCULATE_NPV_FAILURE,
  SET_PROPERTY,
  ADD_YEAR,
  REMOVE_YEAR,
  SET_YEAR_CASHFLOW,
  SET_CHART_TYPE,
} from './action';
import { toNumber, hasOwnProperty } from '../utils';

export const initialState = {
  discountLowerBound: 0,
  discountUpperBound: 0,
  discountIncrement: 0,
  initialInvestment: 0,
  cashFlows: [0],
  calculating: false,
  error: null,
  chartType: 'bar',
  results: [],
};

export default function npv(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CALCULATE_NPV:
      return {
        ...state,
        calculating: true,
        error: null,
        results: [],
      };
    case CALCULATE_NPV_SUCCESS:
      return {
        ...state,
        calculating: false,
        error: null,
        results: payload.results,
      };
    case CALCULATE_NPV_FAILURE: {
      const error = typeof payload.error === 'string' ? payload.error : 'Something has gone wrong';
      return {
        ...state,
        calculating: false,
        error,
        results: [],
      };
    }
    case SET_PROPERTY: {
      const { property, value } = payload;
      if (!hasOwnProperty(state, property)) {
        return state;
      }

      return {
        ...state,
        [property]: value,
      };
    }
    case ADD_YEAR:
      return {
        ...state,
        cashFlows: [...state.cashFlows, 0],
      };
    case REMOVE_YEAR: {
      const { yearNumber } = payload;
      if (state.cashFlows.length < yearNumber) {
        return state;
      }

      const yearIndex = yearNumber - 1;
      let cashFlows = state.cashFlows.filter((c, i) => i !== yearIndex);

      if (cashFlows.length === 0) {
        cashFlows = initialState.cashFlows;
      }

      return {
        ...state,
        cashFlows,
      };
    }
    case SET_YEAR_CASHFLOW: {
      const { yearNumber, cashFlow } = payload;
      if (state.cashFlows.length < yearNumber) {
        return state;
      }

      const yearIndex = yearNumber - 1;
      return {
        ...state,
        // eslint-disable-next-line no-confusing-arrow
        cashFlows: state.cashFlows.map((c, i) => i === yearIndex ? toNumber(cashFlow) : c),
      };
    }
    case SET_CHART_TYPE:
      return {
        ...state,
        chartType: payload.chartType,
      };
    default:
      return state;
  }
}
