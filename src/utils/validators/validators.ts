// validators types
export type FieldValidatorStringType = (value: string) => string | undefined
export type FieldValidatorIsNaNType = (value: any) => string | undefined
export type FieldValidatorNumberType = (value: number) => string | undefined

export type FieldValidatorsType = FieldValidatorStringType & FieldValidatorIsNaNType & FieldValidatorNumberType

// validators
export const required: FieldValidatorStringType = value => (value ? undefined : 'Required')
export const mustBeNumber: FieldValidatorIsNaNType = value => (isNaN(value) ? 'Must be a number' : undefined)
export const minLength = (min: number): FieldValidatorStringType => value => value.length >= min ? undefined : `Should be greater than ${min} symbols`
export const maxLength = (max: number): FieldValidatorStringType => value => value.length <= max ? undefined : `Should be less than ${max} symbols`
export const minValue = (min: number): FieldValidatorNumberType => value => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
export const maxValue = (max: number): FieldValidatorNumberType => value => isNaN(value) || value <= max ? undefined : `Should be less than ${max}`

// compose Validators for using together
export const composeValidators = (...validators: Array<any>) => (value: any) =>
    validators.reduce((error, validator) => error || validator(value), undefined)