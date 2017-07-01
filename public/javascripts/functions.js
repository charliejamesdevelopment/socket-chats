function getUrl() {
  if (typeof location.origin === 'undefined') {
    location.origin = location.protocol + '//' + location.host;
  }

  return location.origin;
}

function isInt(int) {
  try {
    parseInt(int)
  } catch(e) {
    return false;
  }
  return true
}
