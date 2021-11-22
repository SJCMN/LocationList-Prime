import ListItem from '../ListItem/ListItem';
import List from '@mui/material/List';


function ListComponent ({list}) {

    // console.log('in ListComponent:', list);
    return (
        <ul>
       
        {list.map((item) => (

                        <ListItem key={item.id} item={item}/>))}
                
                   
        </ul>
    );
};

export default ListComponent;

{/* <List
sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
<List/> */}