import IndexOutput from '../IndexOutput/IndexOutput';
import List from '@mui/material/List';


function ListIndexMap ({list}) {

    return (
       
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {list.map((item) => (    
                    <IndexOutput key={item.id} item={item}/>
                ))}
        </List>
        
    );
};

export default ListIndexMap;