const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const pool = require('../modules/pool');



// POST NEW LIST
router.post('/',  (req,res) => {
    console.log('in index POST route',req.body, req.user.id)

    const newList = req.body.newList
    const values = [newList, req.user.id]

    const queryText = `
                INSERT INTO "lists" 
                  ("list_name", "user_id")
                VALUES ($1,$2);
                `;

    pool.query(queryText, values)
    .then((result) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('ERROR with index POST', error);
        res.sendStatus(500)
    })

})


// GET List Names
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
    SELECT * FROM "lists" 
    ORDER BY id ASC
    ;`
    ;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('ERROR with index GET', error);
            res.sendStatus(500);
        });
});

// DELETE List Name
router.delete('/:id', rejectUnauthenticated, (req,res) => {

    const listId = req.params.id

    const queryText = `
    DELETE FROM "lists"
    WHERE "id" = $1
    ;`
    ;

    pool.query(queryText, [listId])
    .then((response) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('ERROR with index DELETE', error);
        res.sendStatus(500)
    })

})

module.exports = router;



