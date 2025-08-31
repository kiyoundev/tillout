import { getCircleProps } from './VarianceDial.utils';

describe('getCircleProps', () => {
  test('returns correct circle properties for thickness 4', () => {
    const result = getCircleProps(4);

    expect(result).toEqual({
      viewBox: '22 22 44 44',
      cx: 44,
      cy: 44,
      r: 20,
      strokeLinecap: 'round',
      fill: 'none'
    });
  });

  test('calculates correct radius for different thickness', () => {
    const result = getCircleProps(6);
    expect(result.r).toBe(19); // (44 - 6) / 2 = 19
  });

  test('returns correct viewBox for thickness 2', () => {
    const result = getCircleProps(2);
    expect(result.viewBox).toBe('22 22 44 44'); // Same viewBox regardless of thickness
  });

  test('returns correct cx and cy', () => {
    const result = getCircleProps(4);
    expect(result.cx).toBe(44);
    expect(result.cy).toBe(44);
  });

  test('returns correct strokeLinecap and fill', () => {
    const result = getCircleProps(4);
    expect(result.strokeLinecap).toBe('round');
    expect(result.fill).toBe('none');
  });
});
