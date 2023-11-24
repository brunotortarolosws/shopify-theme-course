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

if (document.getElementById('productInfoModal')) {
  const productModal = new bootstrap.Modal(document.getElementById('productInfoModal'), {});

  if (productInfoAnchors.length) {
    productInfoAnchors.forEach(i => {
      i.addEventListener('click', () => {
        const url = `/products/${i.getAttribute('product-handle')}.js`
        fetch(url)
          .then(res => res.json())
          .then(data => {
            const variants = data.variants;
            const variantSelect = document.getElementById('variantSelect');
            variantSelect.innerHTML = '';

            variants.forEach(v => {
              variantSelect.options[variantSelect.options.length] = new Option(v.option1, JSON.stringify(v));
            });

            document.getElementById('productInfoImg').src = data.images[0];
            document.getElementById('productInfoTitle').innerText = data.title;
            document.getElementById('productInfoPrice').innerText = i.getAttribute('product-price');
            document.getElementById('productInfoDescription').innerText = data.description;

            productModal.show();
          });
      });
    });
  }
}

const updateCartTotal = () => {
  fetch('/cart.js').then(res => res.json())
   .then(data => {
    const cartCounter = document.getElementById('cartTotalItems');
    if (cartCounter) {
      cartCounter.innerText = data.item_count;
    }
   })
   .catch(err => console.error(err));
}

if (document.getElementById('addToCartForm')) {
  const modalAddToCartForm = document.getElementById('addToCartForm');

  modalAddToCartForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { id, available } = JSON.parse(document.getElementById('variantSelect').value);
    const variantQty = document.getElementById('variantQty').value;

    if (available) {
      const formData = {
        items: [
          {
            id: id,
            quantity: variantQty,
          }
        ]
      };

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(res => {
          res.json();
          updateCartTotal();
        })
        .catch( err => console.error(err));
    }
  });
}

document.addEventListener('DOMContentLoaded', () => updateCartTotal());


const predictiveSearchInput = document.getElementById('searchInputField');
const offcanvasSearch = document.getElementById('offcanvasSearchResult');
const bsOffcanvas = new bootstrap.Offcanvas(offcanvasSearch);
let timer;

if (predictiveSearchInput) {
  predictiveSearchInput.addEventListener('input', () => {
    clearTimeout(timer);

    if (predictiveSearchInput.value)
    timer = setTimeout(() => {
      fetchPredictiveSearch();
    }, 3000);
  });
}

const fetchPredictiveSearch = () => {
  fetch(`/search/suggest.json?q=${predictiveSearchInput.value}&resources[type]=product`)
    .then(res => res.json())
    .then(({ resources }) => {
      const { products } = resources.results;
      let contents = document.getElementById('searchResultsBody');
      contents.innerHTML = '';

      products.forEach(p => {
        contents.innerHTML += `
          <div class="card" style="width: 19rem;">
            <img src="${p.image}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${p.title}</h5>
              <p class="card-text">$${p.price}</p>
            </div>
          </div>
        `
      });

      bsOffcanvas.show();
    })
    .catch(err => console.error(err));
}
