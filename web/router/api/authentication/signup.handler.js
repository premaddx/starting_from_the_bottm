const request = require('request');
const Joi = require('joi');
const { getErrorMessages } = rootRequire('utils');

function requestFacebook(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (response && body) {
        return resolve(response);
      }
      return reject(new Error('Failed to fetch data from facebook'));
    });
  });
}

async function logic(req) {
  try {
    const signUpSchema = {
      //
    };
    const { error } = Joi.validate(req.body, signUpSchema, { abortEarly: false });
    if (error) throw Boom.badRequest(getErrorMessages(error));

    const response = await requestFacebook({
      url: `https://graph.facebook.com/me?access_token=${req.body.token}`,
    });
    if (response.statusCode === 200 && req.body.id === (JSON.parse(response.body)).id) {
      /** CHECK if user is present in DB
       * If present then req.login else
       * create a new entry and then req.login
       *
       */
    } else {
      return res.status(500).json({
        success: false,
        data: {
          message: 'Not Verified from facebook',
        },
      });
    }
  } catch (err) {
    throw err;
  }
}


function handler(req, res, next) {
  // pass req object for implementing business logic
  logic(req).then((data) => {
    res.json({
      success: true,
      data,
    });
  }).catch(err => next(err));
}

module.exports = handler;