import reducer, { initialState } from '../../redux/npvReducer';
import * as types from '../../redux/action';

function createAction(type, payload) {
  return {
    type,
    payload,
  };
}

describe('npv reducer', () => {
  describe('initial state', () => {
    it('should return the initial state when state is undefined', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should return the initial state when action type is unrecognized', () => {
      const state = { ...initialState };
      const nextState = reducer(state, createAction('DO_SOMETHING'));

      expect(nextState).toEqual(state);
    });
  });

  describe('CALCULATE_NPV', () => {
    it('should handle', () => {
      const state = {
        ...initialState,
        results: [{}],
        error: 'Something has gone wrong',
        calculating: false,
      };
      const nextState = reducer(state, createAction(types.CALCULATE_NPV));

      expect(nextState.calculating).toBe(true);
      expect(nextState.results).toHaveLength(0);
      expect(nextState.error).toBeNull();
    });
  });

  describe('CALCULATE_NPV_SUCCESS', () => {
    it('should handle', () => {
      const state = {
        ...initialState,
        calculating: true,
        error: 'Something',
      };
      const results = [{}, {}, {}];
      const nextState = reducer(state, createAction(types.CALCULATE_NPV_SUCCESS, { results }));

      expect(nextState.calculating).toBe(false);
      expect(nextState.results).toHaveLength(3);
      expect(nextState.error).toBeNull();
    });
  });

  describe('CALCULATE_NPV_FAILURE', () => {
    it('should handle', () => {
      const state = {
        ...initialState,
        calculating: true,
        error: null,
        results: [{}]
      };
      const results = [{}, {}, {}];
      const nextState = reducer(state, createAction(types.CALCULATE_NPV_FAILURE, { error: 'Something' }));

      expect(nextState.calculating).toBe(false);
      expect(nextState.results).toHaveLength(0);
      expect(nextState.error).toBe('Something');
    });

    it('should set generic error message when payload error is not a string', () => {
      const state = { ...initialState };
      const nextState = reducer(state, createAction(types.CALCULATE_NPV_FAILURE, { error: {} }));

      expect(nextState.error).toBe('Something has gone wrong');
    });
  });

  describe('SET_PROPERTY', () => {
    it('should set the property when property exists in state', () => {
      const state = { ...initialState };
      const nextState = reducer(state, createAction(types.SET_PROPERTY, { property: 'initialInvestment', value: 32158.332 }));

      expect(nextState).toEqual({ ...initialState, initialInvestment: 32158.332 });
    });

    it('should ignore message when property does not exist in state', () => {
      const state = { ...initialState };
      const nextState = reducer(state, createAction(types.SET_PROPERTY, { property: 'finalInvestment', value: 32158.332 }));

      expect(nextState).toEqual(state);
    });
  });

  describe('ADD_YEAR', () => {
    it('should add another item to cashFlows', () => {
      const state = { ...initialState, cashFlows: [100, 200, 300, 400, 500] };
      const nextState = reducer(state, createAction(types.ADD_YEAR));

      expect(nextState.cashFlows).toEqual([100, 200, 300, 400, 500, 0]);
    });
  });

  describe('REMOVE_YEAR', () => {
      const state = { ...initialState, cashFlows: [100, 200, 300, 400, 500] };
      it('should remove year from cashFlows', () => {
        const nextState = reducer(state, createAction(types.REMOVE_YEAR, { yearNumber: 3 }));

        expect(nextState.cashFlows).toEqual([100, 200, 400, 500]);
      });

    it('should do nothing when year does not exist', () => {
      const nextState = reducer(state, createAction(types.REMOVE_YEAR, { yearNumber: 6 }));

      expect(nextState).toEqual(state);
    });

    it('should create cashFlows having one item 0 when cashFlows is empty', () => {
      const nextState = reducer({...initialState, cashFlows: [123]}, createAction(types.REMOVE_YEAR, { yearNumber: 1 }));

      expect(nextState.cashFlows).toEqual([0]);
    });
  });

  describe('SET_YEAR_CASHFLOW', () => {
    const state = { ...initialState, cashFlows: [100, 200, 300, 400, 500] };
    it('should replace cashFlow year value', () => {
      const nextState = reducer(state, createAction(types.SET_YEAR_CASHFLOW, { yearNumber: 4, cashFlow: 8765.4321 }));

      expect(nextState.cashFlows).toEqual([100, 200, 300, 8765.4321, 500]);
    });

    it('should replace cashFlow year value witn null when value is invalid', () => {
      const nextState = reducer(state, createAction(types.SET_YEAR_CASHFLOW, { yearNumber: 4, cashFlow: 'abcd' }));

      expect(nextState.cashFlows).toEqual([100, 200, 300, null, 500]);
    });

    it('should do nothing when year does not exist', () => {
      const nextState = reducer(state, createAction(types.SET_YEAR_CASHFLOW, { yearNumber: 6 }));

      expect(nextState).toEqual(state);
    });
  });

  describe('SET_CHART_TYPE', () => {
    it('should set chartType', () => {
      const state = { ...initialState };
      const nextState = reducer(state, createAction(types.SET_CHART_TYPE, { chartType: 'line' }));

      expect(nextState.chartType).toEqual('line');
    });
  });
});
