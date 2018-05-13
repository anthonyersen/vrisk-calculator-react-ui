import {
  setProperty,
  addYear,
  removeYear,
  setYearCashFlow,
  setChartType,

  SET_PROPERTY,
  ADD_YEAR,
  REMOVE_YEAR,
  SET_YEAR_CASHFLOW,
  SET_CHART_TYPE,
} from '../../redux/action';

describe('actions', () => {
  describe('setProperty', () => {
    it('should set property and value', () => {
      const action = setProperty('someProp', 132.43);

      expect(action.type).toBe(SET_PROPERTY);
      expect(action.payload).toEqual({
        property: 'someProp',
        value: 132.43,
      });
    });
  });

  describe('addYear', () => {
    it('should handle', () => {
      const action = addYear();

      expect(action.type).toBe(ADD_YEAR);
      expect(action.payload).toEqual({});
    });
  });

  describe('removeYear', () => {
    it('should set yearNumber', () => {
      const action = removeYear(32);

      expect(action.type).toBe(REMOVE_YEAR);
      expect(action.payload).toEqual({
        yearNumber: 32,
      });
    });
  });

  describe('setYearCashFlow', () => {
    it('should set yearNumber and cashFlow', () => {
      const action = setYearCashFlow(32, 123.45);

      expect(action.type).toBe(SET_YEAR_CASHFLOW);
      expect(action.payload).toEqual({
        yearNumber: 32,
        cashFlow: 123.45,
      });
    });
  });

  describe('setChartType', () => {
    it('should set chartType', () => {
      const action = setChartType('line');

      expect(action.type).toBe(SET_CHART_TYPE);
      expect(action.payload).toEqual({
        chartType: 'line',
      });
    });
  });

});
