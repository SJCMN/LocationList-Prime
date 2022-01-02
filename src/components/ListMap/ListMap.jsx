import List from '@mui/material/List';

function ListMap({ list }) {

    return (

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {list.map((item) => (
                <ListOutput key={item.id} item={item} />
            ))}
        </List>

    );
};

export default ListMap;


