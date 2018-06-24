const assert = require('assert');

let Schema = null;

function init() {
  const userSchema = new Schema({
    id: String,
    email: String,
    name: String
  });

  return userSchema;
}

module.exports = (schema) => {
  assert.ok(schema);
  Schema = schema;
  return init();
};