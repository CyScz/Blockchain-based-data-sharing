import '../../styles/Login.css';
import { NavLink } from 'react-router-dom';

function FormButton(props) {
    return (
        <div id="button" class="row">
            <button><NavLink to='/dashboard'>{props.title}</NavLink></button>
        </div>
    )
}

export default FormButton