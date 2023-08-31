const router = require('express').Router();
const RoleQueries = require('../queries/role.query.js');

router.route('', '/').get(async(req, res) => {
    try{
        res.json(await RoleQueries.getAllRoles());
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

module.exports = router;