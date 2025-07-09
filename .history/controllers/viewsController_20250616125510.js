exports.showall = (req, res) => {
  res.status(200).render('base', {
    tour: 'the forest hiker',
    user: 'hopedeva'
  });
};
exports.showOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'All tours'
  });
};

exports.showTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'forest hiker tour'
  });
};
