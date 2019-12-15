/**
 * Inspired by Adrien Gibrat
 * @see https://github.com/adriengibrat/ts-custom-error
 */
export abstract class CustomErrorBase extends Error {
  name: string

  constructor(message?: string) {
    super(message)
    // set error name as constructor name, make it not enumerable to keep native Error behavior
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
    // see https://github.com/adriengibrat/ts-custom-error/issues/30
    Object.defineProperty(this, 'name', {
      value: new.target.name,
      enumerable: false,
    })
    // fix the extended class' prototype chain
    // because typescript __extends implementation can't
    // see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    if ('setPrototypeOf' in (Object as any)) {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      ((this as any).__proto__ = new.target.prototype);
    }
    // try to remove contructor from stack trace
    const captureStackTrace: Function = (Error as any).captureStackTrace;
    captureStackTrace && captureStackTrace(this, this.constructor);
  }
}
