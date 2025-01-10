export abstract class ValueObject {
  public equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false
    }

    return this.isEqual(this, vo)
  }

  private isEqual(value1: any, value2: any): boolean {
    if (value1 === value2) {
      return true
    }

    if (typeof value1 !== typeof value2) {
      return false
    }

    if (typeof value1 === 'object' && value1 !== null && value2 !== null) {
      const keys1 = Object.keys(value1)
      const keys2 = Object.keys(value2)

      if (keys1.length !== keys2.length) {
        return false
      }

      for (const key of keys1) {
        if (!keys2.includes(key) || !this.isEqual(value1[key], value2[key])) {
          return false
        }
      }

      return true
    }

    return false
  }
}
