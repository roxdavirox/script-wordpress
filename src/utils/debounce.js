export function debounce(fn, waitFor) {
  let timeout;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, waitFor);
  }
}