import Cookies from 'js-cookie'

enum CacheType {
  Local,
  Session,
  Cookie
}

class Cache {
  storage: Storage | Cookies.CookiesStatic

  constructor(type: CacheType) {
    switch (type) {
      case CacheType.Local:
        this.storage = localStorage
        break
      case CacheType.Session:
        this.storage = sessionStorage
        break
      case CacheType.Cookie:
        this.storage = Cookies
        break
    }
  }

  setCache(key: string, value: any) {
    if (value) {
      if (this.storage instanceof Storage) {
        this.storage.setItem(key, JSON.stringify(value))
      } else {
        this.storage.set(key, JSON.stringify(value))
      }
    }
  }

  getCache(key: string) {
    let value: string | null | undefined
    if (this.storage instanceof Storage) {
      value = this.storage.getItem(key)
    } else {
      value = this.storage.get(key)
    }
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    if (this.storage instanceof Storage) {
      this.storage.removeItem(key)
    } else {
      this.storage.remove(key)
    }
  }

  clear() {
    if (this.storage instanceof Storage) {
      this.storage.clear()
    }
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)
const cookieCache = new Cache(CacheType.Cookie)

export { localCache, sessionCache, cookieCache }
