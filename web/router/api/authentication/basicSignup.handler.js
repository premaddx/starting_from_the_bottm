const Joi = require('joi');
const Boom = require('boom');
const { userDAO } = rootRequire('dao');
const { getErrorMessages } = rootRequire('utils');

async function logic(req) {
  try {
    const basicSignUpSchema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
    const { error } = Joi.validate(req.body, basicSignUpSchema, { abortEarly: false });
    if (error) throw Boom.badRequest(getErrorMessages(error));

    const _userDAO = new userDAO();
    const baseQuery = { email: req.body.email };
    const client = await _userDAO.findOne({ baseQuery });

    if (!client) {
      const response = await _userDAO.save({
        email: req.body.email,
        password: req.body.password,
      });
      logger.info(response);
    }
    req.login({ email: req.body.email }, (err) => {
      if (err) {
        throw err;
      }
    });
    return {
      message: `Welcome ${req.body.email}`,
    };
  } catch (err) {
    throw err;
  }
}

function handler(req, res, next) {
  logic(req).then((data) => {
    res.json({
      success: true,
      data,
    });
  }).catch(err => next(err));
}

module.exports = handler;