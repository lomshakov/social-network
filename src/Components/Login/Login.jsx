import {Form, Field} from 'react-final-form'

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginForm = (props) => {


    // это валидаторы из Redux Final Form
    // можно их совместно использовать при помощи функции внизу composeValidators
    // подробнее - https://final-form.org/docs/react-final-form/examples/field-level-validation

    const required = value => (value ? undefined : 'Required')
    const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
    const minValue = min => value =>
        isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)




    return (
        <Form onSubmit={props.onSubmit}
              render={ ( {handleSubmit, submitting, pristine, values} ) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name="login"
                                 component="input"
                                 type="text"
                                 placeholder="login"
                                 validate={required}>

                              {({ input, meta }) => (
                                  <div>
                                      <input {...input} type="text" placeholder="login" />
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}



                          </Field>
                      </div>
                      <div>
                          <Field name="password"
                                 component="input"
                                 type="text"
                                 placeholder="password"
                                 validate={required}>

                              {({ input, meta }) => (
                                  <div>
                                      <input {...input} type="text" placeholder="your password" />
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}

                          </Field>
                      </div>
                      <div>
                          <Field name="rememberMe"
                                 component="input"
                                 type="checkbox" />remember me
                      </div>
                      <div>
                          <button type="submit" disabled={submitting || pristine}>login</button>
                      </div>
                  </form>
              )
              }
        />
    )
}

export default Login;