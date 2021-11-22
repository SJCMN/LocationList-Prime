import ListItem from '../ListItem/ListItem';


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