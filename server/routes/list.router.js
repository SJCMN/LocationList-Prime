const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios')

// Pythagorean theorem rounded to 2 decimal places
// calcs distance from origin to item x y
function calcDistance(x,y) {
    distance =  Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    return Math.round((distance + Number.EPSILON) * 100) / 100;
  }

// Handles AXIOS request for API information using keyword and TCIN search if user is authenticated
router.get('/keyword/:searchTerm/:currentIndex', rejectUnauthenticated, (req, res) => {
  

    let searchTerm = req.params.searchTerm
    let currentIndex = req.params.currentIndex
    console.log('in searchTerm GET', searchTerm, currentIndex)

    const options = {
        method: 'GET',
        url: 'https://target1.p.rapidapi.com/products/v2/list',
        params: {
        store_id: '931',
        category: '5xtg6',
        keyword: `${searchTerm}`,
        count: '1',
        offset: '0',
        default_purchasability_filter: 'true',
        sort_by: 'relevance'
        },
        headers: {
        'x-rapidapi-host': 'target1.p.rapidapi.com',
        'x-rapidapi-key': process.env.rapidapi_key
        }
    };
    
    // nested request to API 
    axios.request(options)
    .then(function (response) {
        console.log('server v2 request response:',response.data);

        const listItemTCIN =  response.data.data.search.products[0].item.tcin
        console.log('server v2 tcin', listItemTCIN);
        
        // Handles request for to v3 product API using TCIN from first request above 
        
        const options = {
            method: 'GET',
            url: 'https://target1.p.rapidapi.com/products/v3/get-details',
            params: {tcin: `${listItemTCIN}`, store_id: '931'},
            headers: {
              'x-rapidapi-host': 'target1.p.rapidapi.com',
              'x-rapidapi-key': process.env.rapidapi_key
            }
          };
        
        axios.request(options)
        .then(function (response) {
            console.log('server v3 request response:',response.data.data);

            const itemObject = response.data.data;
            // this will crash on some items like 'gravy' when missing object key
            // format data for store and db
            const foundItem  = {
                keyword_search: searchTerm,
                product_description: itemObject.product.item.product_description.title,
                store_id: itemObject.product.fulfillment.store_options[0].location_id,
                aisle_id: itemObject.product.store_coordinates[0].aisle,
                TCIN: itemObject.product.tcin,
                x: itemObject.product.store_coordinates[0].x,
                y: itemObject.product.store_coordinates[0].y,
                department_id: itemObject.product.store_coordinates[0].block,
                
                };

              // console.log('found item:', foundItem);
              // calculate X Y coordinates from 0,0 to establish initial distance value
              // value from distance is spread back into foundItem in res.send
               const distance =  calcDistance(foundItem.x,foundItem.y)
              //  console.log('calcDistance', distance);            


                const queryText = `
                INSERT INTO "items" (
                  "keyword_search", 
                  "product_description", 
                  "store_id", "aisle_id", 
                  "TCIN", 
                  "x", 
                  "y", 
                  "department_id", 
                  "distance",
                  "list_id")
                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
                `;

                const values = [
                    foundItem.keyword_search,
                    foundItem.product_description,
                    foundItem.store_id,
                    foundItem.aisle_id,
                    foundItem.TCIN,
                    foundItem.x,
                    foundItem.y,
                    foundItem.department_id,
                    distance,
                    currentIndex
                ];

    pool.query(queryText, values)
        .then(response => {
          res.send({...foundItem, distance:distance});

        }).catch(function (error) {
            console.error(error);
        })});


    }).catch(function (error) {
        console.error(error);
    });

});

// Handles AXIOS request for all items on list
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
    SELECT * FROM "items"
    ORDER BY "items"."hidden" ASC,
    "items"."id" DESC
    ;`;

    pool.query(queryText)
    .then((response) => {
      res.send(response.rows)
    }).catch((err) => {
      console.log(`ERROR with GET list`, err);
      res.sendStatus(500);
    })

})

// Handles AXIOS request for all items on list matching list_id
router.get('/:currentIndex', rejectUnauthenticated, (req, res) => {

  const currentIndex = req.params.currentIndex

  const queryText = `
  SELECT * FROM "items"
  WHERE "list_id" = $1
  ORDER BY "items"."hidden" ASC,
  "items"."id" DESC
  ;`;

  pool.query(queryText, [currentIndex])
  .then((response) => {
    res.send(response.rows)
  }).catch((err) => {
    console.log(`ERROR with GET list`, err);
    res.sendStatus(500);
  })

})

// Handles AXIOS request for delete item
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  let itemId = req.params.id;
  let userId = req.user.id;

  const queryText = 
  `DELETE FROM "items"
  WHERE "id" = $1
  `
  ;

  const values = [itemId];

  pool.query(queryText, values)
  .then((result) => {
    console.log('Delete Success');
    res.sendStatus(200);
  }).catch((err) => {
    console.log('item delete error', err);
    res.sendStatus(500);    
  })

})

// Handles AXIOS request to hide/archive list items
router.put('/hide/:id', rejectUnauthenticated, (req, res) => {

  let itemId = req.params.id;

  const queryText = `
  UPDATE "items" SET 
  "hidden" = NOT "hidden"
  WHERE "id" = $1;
  `;

  const values = [itemId]

  pool.query(queryText, values)
  .then((result) => {
    console.log('TOGGLE_HIDE success');
    res.sendStatus(200);    
  }).catch((err) => {
    console.log('TOGGLE_HIDE error', err);
    res.sendStatus(500);    
  })
})

// Handles AXIOS request to update all items on list with new x y coordinates
router.put('/update', rejectUnauthenticated, (req,res) => {

  const list = req.body.list;


  console.log('in update PUT', list);

  for (item of list) {
    x = item.x;
    y = item.y;
  }

    const queryText = `
    UPDATE "items" SET
    SET "x" = $1, "y" = $2
    WHERE "id" = $3;
    `;

  const values = [list.x, list.y, id]

  

  pool.query(queryText, values)
  .then((result) => {

    const queryText = `
    UPDATE "items" SET
    SET "x" = $1, "y" = $2
    WHERE "id" = $3;
    `;

    
    pool.query(queryText, values);
    console.log('Update x y values success');
    res.sendStatus(200);    
  }).catch((err) => {
    console.log('Update x y values error', err);
    res.sendStatus(500);    
  })

})

// Handles AXIOS request to update the last list item with a list id
// REFACTOR THIS CODE TO BE USED TO UPDATE AN ITEM TO ANOTHER LIST
router.put('/updateIndex/:id', rejectUnauthenticated, (req,res) => {

  const index = req.body.index;
  const item = req.params.id;

  console.log('in updateIndex PUT index, item', req.body, item);

    const queryText = `
    UPDATE "items"
    SET "list_id" = $1
    WHERE "id" = $2;
    `;

  const values = [index, item]

  pool.query(queryText, values)
  .then((result) => {
    console.log('Update list_id success');
    res.sendStatus(200);    
  }).catch((err) => {
    console.log('Update list_id error', err);
    res.sendStatus(500);    
  })

})

// Handles AXIOS request for sort by item location from 0,0 origin reference
// RETURNS ITEMS MATCHING CURRENT INDEX LIST ID
// Refactor to calc distance on hide on client
router.get('/shop/:currentIndex', rejectUnauthenticated, (req,res) => {

  // let shopToggle = req.params.shop
  // console.log('shop toggle is', shopToggle);
  // use item id as new 0,0

    let currentIndex = req.params.currentIndex

    // RETURN LIST SORTED BY DISTANCE MATCHING LIST ID
    const queryText = `
    SELECT *
    FROM "items"
    WHERE "list_id" = $1
    ORDER BY "items"."hidden" ASC,
    "items"."distance" ASC
    ;`

  pool.query(queryText, [currentIndex])
  .then((response) => {
    console.log('TOGGLE_SHOP success');
    res.send(response.rows);  
  }).catch((err) => {
    console.log('TOGGLE_SHOP error', err);
    res.sendStatus(500);    
  })
})

module.exports = router;


