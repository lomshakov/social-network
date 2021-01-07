import {Form, Field} from 'react-final-form'
import {required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormsControls/FormsControls";
import {login} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


const Login = (props) => {

    const onSubmit = async formData => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to={"/profile"}/>

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} authError={props.authError}/>
        </div>
    )
}

const LoginForm = (props) => {

    return (
        <Form onSubmit={props.onSubmit}
              render={({
                           handleSubmit,
                           submitting,
                           pristine
                       }) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name="email"
                                 component={TextArea}
                                 validate={required}
                                 placeholder={"email"}>
                          </Field>
                          {props.authError && <span>{props.authError}</span>}
                      </div>
                      <div>
                          <Field name="password"
                                 type="password"
                                 component={TextArea}
                                 validate={required}
                                 placeholder={"password"}>

                          </Field>
                      </div>
                      <div>
                          <Field name="rememberMe"
                                 component="input"
                                 type="checkbox"/>remember me
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authError: state.auth.authError
})

export default connect(mapStateToProps, {login})(Login);