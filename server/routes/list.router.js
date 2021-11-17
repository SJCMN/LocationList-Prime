const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios')


// Handles AXIOS request for to v2 product API information using keyword search if user is authenticated
router.get('/keyword/:searchTerm', rejectUnauthenticated, (req, res) => {
  

    let searchTerm = req.params.searchTerm
    console.log('in searchTerm GET', searchTerm)

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

            // format data for store and db
            const foundItem  = {
                keyword_search: searchTerm,
                product_description: itemObject.product.item.product_description.title,
                store_id: itemObject.product.fulfillment.store_options[0].location_id,
                aisle_id: itemObject.product.store_coordinates[0].aisle,
                TCIN: itemObject.product.tcin,
                x: itemObject.product.store_coordinates[0].x,
                y: itemObject.product.store_coordinates[0].y,
                department_id: itemObject.product.store_coordinates[0].block
                };

            console.log('found item:', foundItem);
            

                const queryText = `
                INSERT INTO "items" ("keyword_search", "product_description", "store_id", "aisle_id", "TCIN", "x", "y", "department_id")
                VALUES($1,$2,$3,$4,$5,$6,$7,$8);
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
                ];

    pool.query(queryText, values)
        .then(response => {
          res.send(foundItem);

        }).catch(function (error) {
            console.error(error);
        })});


    }).catch(function (error) {
        console.error(error);
    });

});


module.exports = router;


