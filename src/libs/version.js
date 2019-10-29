import storage from '@/utils/storage';

const APP_VERSION = '2019101201';
const newLength = APP_VERSION.length;

const OLD_VERSION = String(storage.get('APP_VERSION') || 0);
const oldLength = OLD_VERSION.length;

const versionLength = (newLength - oldLength > 0) ? oldLength : newLength;

if (APP_VERSION.slice(0, versionLength) > OLD_VERSION.slice(0, versionLength)) {
  storage.clear();
  storage.set('APP_VERSION', APP_VERSION);
}