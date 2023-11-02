// Put your application javascript here
// Sort products inside collection

if (document.getElementById('sort_by')) {
  document.querySelector('#sort_by').addEventListener('change', (e) => {
    const url = new URL(window.location.href);

    url.searchParams.set('sort_by', e.currentTarget.value);
    window.location = url.href;
  });
}

if (document.getElementById('AddressCountryNew')) {
  document.getElementById('AddressCountryNew').addEventListener('change', function(e) {
    const provinces = this.options[this.selectedIndex].getAttribute('data-provinces');
    const provinceSelector = document.getElementById('AddressProvinceNew');
    const provinceArray = JSON.parse(provinces);
    let provinceOptions = '';

    !provinceArray.length
      ? provinceSelector.setAttribute('disabled', 'disabled')
      : provinceSelector.removeAttribute('disabled');

    provinceArray.forEach(p => {
      provinceOptions += `<option value="${p[0]}">${p[0]}</option>`;
    });

    provinceSelector.innerHTML = provinceOptions;
  });
}
