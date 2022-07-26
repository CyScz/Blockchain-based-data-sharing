import Form from './Form'
import FormHeader from './FormHeader'
import '../../styles/Login.css';

function LoginPage() {
    return (
        <div id="loginform">
            <FormHeader title="Login" />
            <Form />
      </div>
    )
}

export default LoginPage