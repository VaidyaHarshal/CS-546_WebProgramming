const express = require('express');
const router = express.Router();
const data = require('../data');
const charData = data.characters;

router.get('/', async (req, res) => {
    res.render('characters/index', {title: "Character Finder"});
});

router.post('/search', async(req, res) => {
    let allCharData = req.body;
    let errors = [];

    if(!allCharData.searchTerm || typeof allCharData.searchTerm !== 'string' || !allCharData.searchTerm.trim().replace(/\s/g, "").length) {
        errors.push('Please enter valid string for your search');
    }

    if(errors.length > 0) {
        res.status(400).render('characters/index', {
            errors: errors,
            hasErrors: true,
            character: allCharData
        }); 
        return;
    }
    let listChars
    try {
          listChars = await charData.getCharacter(allCharData.searchTerm);
          res.render('characters/search', {searchTerm: allCharData.searchTerm, characters: listChars, title: "Characters Found"});
    }
    catch(e) {
        res.status(404).render('characters/search', {searchTerm: allCharData.searchTerm, characters: listChars, hasErrors: true, error: e, title: "Error"});
    }
});

router.get('/characters/:id', async(req, res) => {
    try {
    const hero = await charData.getById(req.params.id);
    res.render('characters/single', {characters: hero.data.results, title: hero.data.results[0].name})
    } catch(e) {
        res.status(404).json({error: e});
    }
})

module.exports = router;