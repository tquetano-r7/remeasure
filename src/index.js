// utils
import {
  getValidKeys,
  isArray,
  isObject,
  isString
} from './utils';

// constants
import {
  ALL_KEYS,
  ALL_POSITION_KEYS,
  ALL_SIZE_KEYS
} from './constants';

// HOC
import getHigherOrderComponent from './getHigherOrderComponent';

const POSITION_PROP_DEFAULT = 'position';
const SIZE_PROP_DEFAULT = 'size';

/**
 * create higher-order component that injects size and position properties
 * into OriginalComponent as an object under the prop name size and position
 *
 * @param {Component|array<string>} keys
 * @param {object} options
 * @returns {RemeasureComponent}
 */
const measure = (keys, options) => {
  if (isString(keys)) {
    let position = POSITION_PROP_DEFAULT,
        size = SIZE_PROP_DEFAULT;

    if (isObject(options)) {
      ({
        positionProp: position = POSITION_PROP_DEFAULT,
        sizeProp: size = SIZE_PROP_DEFAULT
      } = options);
    }

    switch (keys) {
      case position:
        keys = ALL_POSITION_KEYS;
        break;

      case size:
        keys = ALL_SIZE_KEYS;
        break;

      default:
        keys = [keys];
        break;
    }
  }

  if (isArray(keys)) {
    const validKeys = getValidKeys(keys, ALL_KEYS);

    return (OriginalComponent) => {
      return getHigherOrderComponent(OriginalComponent, validKeys, options);
    };
  }

  if (isObject(keys)) {
    return (OriginalComponent) => {
      return getHigherOrderComponent(OriginalComponent, ALL_KEYS, keys);
    };
  }

  return getHigherOrderComponent(keys, ALL_KEYS);
};

export default measure;
