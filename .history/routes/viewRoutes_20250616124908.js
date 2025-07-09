const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'the forest hiker',
    user: 'hopedeva'
  });
});
router.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All tours'
  });
});
router.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'forest hiker tour'
  });
});

module.exports = router;
