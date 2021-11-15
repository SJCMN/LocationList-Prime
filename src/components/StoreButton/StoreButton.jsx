import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

function StoreButton (props) {
    const history = useHistory();
    return (
    <button
        className={props.className}
        onClick={() => history.push('/stores')}
        >
        Stores</button>
    );
};

export default StoreButton;