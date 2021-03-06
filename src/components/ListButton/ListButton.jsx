import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

function ListButton (props) {
    const history = useHistory();
    return (
    <button
        className={props.className}
        onClick={() => history.push('/lists')}
        >
        Lists</button>
    );
};

export default ListButton;