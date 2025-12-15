/**
 * A function type that defines a converter. A converter function takes a value of any type
 * and transforms it into another value.
 *
 * In the context of the `@State` decorator, this function is used to convert a component's
 * property value into a boolean. The boolean result determines whether a custom CSS state
 * should be applied to the element.
 *
 * @param value The input value from the component's property.
 * @returns The transformed value. For the `@State` decorator, this should be a boolean.
 *
 * @example
 * // A converter that checks if a number is greater than zero.
 * const isPositive: ConverterFn = (value: number) => value > 0;
 *
 * // A converter that checks if a string is not empty.
 * const isNotEmpty: ConverterFn = (value: string) => value.length > 0;
 */
export type ConverterFn = (value: any) => any;
