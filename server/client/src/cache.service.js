import NodeCache from 'node-cache'

/*

/* Cache /
import CacheService from '../../cache.service'
const cache = new CacheService(3600000)

*/

class CacheService {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false })
  }

  get(key, storeValue) {
    const value = this.cache.get(key)
    return value ? Promise.resolve(value) : this.cache.set(key, storeValue)
  }

  del(keys) {
    this.cache.del(keys)
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return
    }

    const keys = this.cache.keys()
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key)
      }
    }
  }

  flush() {
    this.cache.flushAll()
  }
}


export default CacheService