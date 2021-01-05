import {Form, Field} from 'react-final-form'
import {required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormsControls/FormsControls";

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

    return (
        <Form onSubmit={props.onSubmit}
              render={ ( {handleSubmit, submitting, pristine} ) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name="login"
                                 component={TextArea}
                                 validate={required}
                                 placeHolder={"login"}>
                          </Field>
                      </div>
                      <div>
                          <Field name="password"
                                 component={TextArea}
                                 validate={required}
                                 placeHolder={"password"}>

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