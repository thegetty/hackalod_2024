/**
 * Gets the config data object from the server (for Client)
 *
 * @param {string} configId (the id of the config.json)
 *
 * @return {object} the config object or undefined)
 */
export function getConfig(configId) {
  let configElement = document.getElementById(configId);

  if (configElement == undefined) {
    return;
  }

  let txt = configElement.innerText;
  if (txt == undefined) {
    return;
  }

  try {
    return JSON.parse(txt);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return;
}

/**
 * Gets the variable from the config obj object from the server (for Client)
 *
 * @param {string} key (the variable to lookuo)
 * @param {string} configId (the id of the config.json)
 * @param {string|number|boolean} defaultValue (the default value to use when the config variable is not found)
 *
 * @return {string} the value from config or the default value
 */
export function getConfigValue(key, configId = "appConfig", defaultValue) {
  let config = getConfig(configId);

  if (config != undefined && config[key] != undefined) {
    return config[key];
  }
  return defaultValue;
}
