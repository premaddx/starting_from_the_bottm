const Joi = require('joi');
const config = require('nconf');

const DB = config.get('DB');
const DB_URI = config.get('DB_URI');

const dbConfigSchema = Joi.object({
    DB: Joi.string().valid(['nice_for_what']).required(),
    DB_URI: Joi.string().required(),
  }).unknown()
  .required();

const { error, value: envVars } = Joi.validate({
  DB,
  DB_URI,
}, dbConfigSchema);

if (error) throw new Error(`Config validation error: ${error.message}`);

const dbConfig = {
  db: DB,
  dbURI: DB_URI,
  connectionString: `mongodb://${DB_URI}/${DB}`,
};



module.exports = dbConfig;