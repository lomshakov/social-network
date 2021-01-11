import {Form, Field} from 'react-final-form';
import {required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormsControls/FormsControls";
import {login} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Checkbox, Button, Typography} from "antd";
import FormItem from "antd/lib/form/FormItem";

const {Title} = Typography;

const Login = (props) => {

    const onSubmit = formData => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to={"/profile"}/>

    return (
        <div>
            <Title level={2}>Login</Title>
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

                      <Field name="email"
                             component={TextArea}
                             validate={required}
                             placeholder={"email"}>
                      </Field>

                      {props.authError && <span>{props.authError}</span>}

                      <Field name="password"
                             type="password"
                             component={TextArea}
                             validate={required}
                             placeholder={"password"}>

                      </Field>

                      <FormItem>
                          <Field name="rememberMe"
                                 component={Checkbox}>Remember me
                          </Field>
                      </FormItem>

                      <FormItem>
                          <Button type="primary"
                                  onClick={handleSubmit}
                                  disabled={submitting || pristine}>Login</Button>
                      </FormItem>

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