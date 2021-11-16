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
        'x-rapidapi-key': 'd8d72cc1cfmshc33d0ca215eb848p1748ccjsn8dec1b1237ed'
        }
    };
    
    axios.request(options)
    .then(function (response) {
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });

});


// Handles AXIOS request for to v3 product API using TCIN from first request above 
router.get('/TCIN/:TCIN', rejectUnauthenticated, (req, res) => {
  

    let TCIN = req.params.TCIN
    console.log('in searchTerm GET', TCIN)

    const options = {
        method: 'GET',
        url: 'https://target1.p.rapidapi.com/products/v3/get-details',
        params: {tcin: `${TCIN}`, store_id: '931'},
        headers: {
          'x-rapidapi-host': 'target1.p.rapidapi.com',
          'x-rapidapi-key': 'd8d72cc1cfmshc33d0ca215eb848p1748ccjsn8dec1b1237ed'
        }
      };
    
    axios.request(options)
    .then(function (response) {
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });

});







module.exports = router;


