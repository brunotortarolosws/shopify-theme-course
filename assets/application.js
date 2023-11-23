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


if (document.getElementById('forgotPassword')) {
  document.getElementById('forgotPassword').addEventListener('click', () => {
    const element = document.querySelector('#passwordResetForm');

    if (element.classList.contains('d-none')) {
      element.classList.remove('d-none');
    }
  });
}


const localeItems = document.querySelectorAll('#localeItem');
if (localeItems.length) {
  localeItems.forEach(l => {
    l.addEventListener('click', () => {
      document.getElementById('localeCode').value = l.getAttribute("lang");
      document.getElementById('localization_form_tag').submit();
    })
  });
}


const productInfoAnchors = document.querySelectorAll('#productInfoAnchor');
const productModal = new bootstrap.Modal(document.getElementById('productInfoModal'), {});
if (productInfoAnchors.length) {
  productInfoAnchors.forEach(i => {
    i.addEventListener('click', () => {
      const url = `/products/${i.getAttribute('product-handle')}.js`
      fetch(url)
        .then(res => res.json())
        .then(data => {

          document.getElementById('productInfoImg').src = data.images[0];
          document.getElementById('productInfoTitle').innerText = data.title;
          document.getElementById('productInfoPrice').innerText = i.getAttribute('product-price');
          document.getElementById('productInfoDescription').innerText = data.description;

          productModal.show();
        });
    });
  });
}
