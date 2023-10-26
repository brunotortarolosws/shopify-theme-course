// Put your application javascript here
// Sort products inside collection
document.querySelector('#sort_by').addEventListener('change', (e) => {
  const url = new URL(window.location.href);

  url.searchParams.set('sort_by', e.currentTarget.value);
  window.location = url.href;
})
