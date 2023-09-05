base_url = "https://api.freecurrencyapi.com/v1/";
api_key = "fca_live_eDTOOyu6V6odHVJEYdpGMw8C4ABnyz1F5O4AIynf";

fetch(`${base_url}currencies`, {
  headers: {
    apikey: api_key,
  },
})
  .then((response) => response.json())
  .then(({ data }) => {
    const keys = Object.keys(data);
    keys.forEach((i) => {
      const option = document.createElement("option");
      select1.append(new Option(i, i));
      select2.append(new Option(i, i));
    });
    select1.value = "USD";
    select2.value = "RUB";
  })
  .then(() => {
    btnConvert.onclick = function () {
      const from = select1.value.trim();
      const to = select2.value.trim();
      const amount = amountInput.value.trim();
      fetch(`${base_url}latest?currencies=${to}&base_currency=${from}`, {
        headers: {
          apikey: api_key,
        },
      })
        .then((response) => response.json())
        .then(({ data }) => {
          console.log(data);
          const res = Object.keys(data);
          console.log(data[res] * amount);
          const h4 = document.createElement("h4");
          h4.append(
            document.createTextNode(
              `Exchange Rates: ${data[res].toFixed(2)} Result: ${(data[res] * amount).toFixed(2)} ${to}`
            )
          );
          if (resultList.firstChild) {
            resultList.replaceChild(h4, resultList.firstChild);
          } else {
            resultList.appendChild(h4);
          }
        })
    };
  })
  .catch(e => {
    console.error('Error:', e);
  });
