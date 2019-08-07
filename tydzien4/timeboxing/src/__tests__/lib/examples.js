import { fizzBuzz, fib, xxx } from '../../lib/examples';

describe('fizzBuzz', () => {
  describe('when divisable by 3', () => {
    it('returns Fizz string', () => {
      expect(fizzBuzz(3)).toBe('Fizz')
    })
  })

  describe('when divisable by 5', () => {
    it('returns Fizz string', () => {
      expect(fizzBuzz(5)).toBe('Buzz')
    })
  })

  describe('when divisable by 3 and 5', () => {
    it('returns Buzz string (value - 15)', () => {
      expect(fizzBuzz(15)).toBe('FizzBuzz')
    })

    it('returns FizzBuzz string (value - 0)', () => {
      expect(fizzBuzz(0)).toBe('FizzBuzz')
    })
  })

  describe('when not divisable by 3 nor 5', () => {
    it('returns given argument', () => {
      expect(fizzBuzz(16)).toBe(16)
    })
  })
})

describe('fib', () => {
  describe('when value is 0', () => {
    it('returns 0', () => {
      expect(fib(0)).toBe(0)
    })
  })

  describe('when value is 1', () => {
    it('returns 1', () => {
      expect(fib(1)).toBe(1)
    })
  })

  describe('when value is 2', () => {
    it('returns 2', () => {
      expect(fib(2)).toBe(1)
    })
  })

  describe('when value is 3', () => {
    it('returns 2', () => {
      expect(fib(3)).toBe(2)
    })
  })

  describe('when value is 4', () => {
    it('returns 3', () => {
      expect(fib(4)).toBe(3)
    })
  })

  describe('when value is 5', () => {
    it('returns 5', () => {
      expect(fib(5)).toBe(5)
    })
  })

  describe('when value is 6', () => {
    it('returns 8', () => {
      expect(fib(6)).toBe(8)
    })
  })

  describe('when value is 10', () => {
    it('returns 10', () => {
      expect(fib(10)).toBe(55)
    })
  })

  describe('when value is negative', () => {
    it('returns same value', () => {
      expect(fib(-2)).toBe(-2)
    })
  })
})

describe('xxx', () => {
  describe('when value is 0', () => {
    it('throws an error', () => {
      expect(() => xxx(0)).toThrow()
    })
  })

  describe('when value is a string', () => {
    it('for empty returns empty', () => {
      expect(xxx('')).toBe('')
    })

    it('for one word string returns mirrored', () => {
      expect(xxx('roberto')).toBe('otrebor')
    })

    it('for multiple words returns mirrored', () => {
      expect(xxx('roberto baggio')).toBe('oiggab otrebor')
    })
  })
})
