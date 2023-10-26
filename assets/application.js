// Put your application javascript here
// Sort products inside collection

if (document.getElementById('sort_by')) {
  document.querySelector('#sort_by').addEventListener('change', (e) => {
    const url = new URL(window.location.href);

    url.searchParams.set('sort_by', e.currentTarget.value);
    window.location = url.href;
  });
}
