function getQueryParam(url, name) {
  try {
    const queryString = url.split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    return params.has(name) ? decodeURIComponent(params.get(name)) : null;
  } catch {
    return null;
  }
}

// Hacer global
window.getQueryParam = getQueryParam;
