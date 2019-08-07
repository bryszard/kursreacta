import toRoman from '../../lib/roman';

describe('toRoman', () => {
  it.each([
    [0, 'none'],
    [1, 'I'],
    [4, 'IV'],
    [5, 'V'],
    [7, 'VII'],
    [9, 'IX'],
    [10, 'X'],
    [11, 'XI'],
    [14, 'XIV'],
    [19, 'XIX'],
    [20, 'XX'],
    [28, 'XXVIII'],
    [49, 'XLIX'],
    [50, 'L'],
    [94, 'XCIV'],
    [100, 'C'],
    [101, 'CI'],
    [146, 'CXLVI'],
    [666, 'DCLXVI'],
    [999, 'CMXCIX'],
    [1000, 'M'],
    [2019, 'MMXIX'],
    [7001, 'MMMMMMMI']
  ])('converts %d to %s', (arabic, expectedRoman) => {
    expect(toRoman(arabic)).toEqual(expectedRoman)
  })
})
