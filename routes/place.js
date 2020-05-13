const express = require('express');
const Place = require('../models/place');

const placeRouter = new express.Router();

placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Place.create({
    name,
    type,
    location: { coordinates: [latitude, longitude] }
  })
    .then(() => {
      res.redirect('/place/list');
    })
    .catch((err) => {
      next(err);
    });
});

placeRouter.get('/list', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('place/list', { places });
    })
    .catch((err) => {
      next(err);
    });
});

placeRouter.get('/single/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;

  Place.findById({ _id: placeId })
    .then((place) => {
      res.render('place/single', { place });
    })
    .catch((err) => {
      next(err);
    });
});

placeRouter.get('/update/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;

  Place.findById({ _id: placeId })
    .then((place) => {
      res.render('place/update', { place });
    })
    .catch((err) => {
      next(err);
    });
});

placeRouter.post('/update/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;

  const name = req.body.name;
  const type = req.body.type;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Place.findByIdAndUpdate(
    { _id: placeId },
    {
      name,
      type,
      location: {
        coordinates: [latitude, longitude]
      }
    }
  )
    .then((place) => {
      res.render('place/single', { place });
    })
    .catch((err) => {
      next(err);
    });
});

placeRouter.post('/delete/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;

  Place.findByIdAndRemove({ _id: placeId })
    .then((doc) => {
      console.log('Deleted document:', doc);
      res.redirect('/place/list');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = placeRouter;
