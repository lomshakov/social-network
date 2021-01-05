// это валидаторы из Redux Final Form
// можно их совместно использовать при помощи функции внизу composeValidators
// подробнее - https://final-form.org/docs/react-final-form/examples/field-level-validation


export const required = value => (value ? undefined : 'Required')

export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)

export const minLength = min => value => value.length >= min ? undefined : `Should be greater than ${min} symbols`

export const maxLength = max => value => value.length <= max ? undefined : `Should be less than ${max} symbols`

export const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

export const maxValue = max => value =>
    isNaN(value) || value <= max ? undefined : `Should be less than ${max}`


export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)