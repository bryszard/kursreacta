import { extractTimeFromMilliseconds } from "../../lib/time"

describe('extractTimeFromMilliseconds', () => {
  let argument

  describe('when 0 value passed', () => {
    beforeEach(() => {
      argument = 0
    })

    it('returns 000 for milliseconds', () => {
      expect(extractTimeFromMilliseconds(argument).milliseconds).toEqual('000')
    })

    it('returns 00 for seconds', () => {
      expect(extractTimeFromMilliseconds(argument).seconds).toEqual('00')
    })

    it('returns 00 for minutes', () => {
      expect(extractTimeFromMilliseconds(argument).minutes).toEqual('00')
    })

    it('returns 00 for hours', () => {
      expect(extractTimeFromMilliseconds(argument).hours).toEqual('00')
    })
  })

  describe('when ideally 30 seconds value (in milliseconds) passed', () => {
    beforeEach(() => {
      argument = 30 * 1000
    })

    it('returns 000 for milliseconds', () => {
      expect(extractTimeFromMilliseconds(argument).milliseconds).toEqual('000')
    })

    it('returns 30 for seconds', () => {
      expect(extractTimeFromMilliseconds(argument).seconds).toEqual('30')
    })

    it('returns 00 for minutes', () => {
      expect(extractTimeFromMilliseconds(argument).minutes).toEqual('00')
    })

    it('returns 00 for hours', () => {
      expect(extractTimeFromMilliseconds(argument).hours).toEqual('00')
    })
  })

  describe('when more complex value passed (duration of above hour)', () => {
    beforeEach(() => {
      argument = (11 * 49 * 57 * 1000) + 532
    })

    it('returns 532 for milliseconds', () => {
      expect(extractTimeFromMilliseconds(argument).milliseconds).toEqual('532')
    })

    it('returns 03 for seconds', () => {
      expect(extractTimeFromMilliseconds(argument).seconds).toEqual('03')
    })

    it('returns 32 for minutes', () => {
      expect(extractTimeFromMilliseconds(argument).minutes).toEqual('32')
    })

    it('returns 08 for hours', () => {
      expect(extractTimeFromMilliseconds(argument).hours).toEqual('08')
    })
  })

  describe('when maximum value (just below 24 hours)', () => {
    beforeEach(() => {
      argument = (24 * 60 * 60 * 1000) - 1
    })

    it('returns 999 for milliseconds', () => {
      expect(extractTimeFromMilliseconds(argument).milliseconds).toEqual('999')
    })

    it('returns 59 for seconds', () => {
      expect(extractTimeFromMilliseconds(argument).seconds).toEqual('59')
    })

    it('returns 59 for minutes', () => {
      expect(extractTimeFromMilliseconds(argument).minutes).toEqual('59')
    })

    it('returns 23 for hours', () => {
      expect(extractTimeFromMilliseconds(argument).hours).toEqual('23')
    })
  })

  describe('when 24 hours passed', () => {
    beforeEach(() => {
      argument = (24 * 60 * 60 * 1000)
    })

    it('throws an error for too big value', () => {
      expect(() => { extractTimeFromMilliseconds(argument) }).toThrow(/too big/)
    })
  })
})
