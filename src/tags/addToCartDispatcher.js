const sentEvents = {};

function sendAddToCart(payload) {
  const eventId = payload.item_id + '-' + Date.now();
  if (sentEvents[eventId]) {
    console.log("Evento ya enviado:", eventId);
    return;
  }
  sentEvents[eventId] = true;

  const data = {
    event_name: "add_to_cart",
    client_ts: new Date().toISOString(),
    items: [{
      item_id: payload.item_id,
      item_name: payload.item_name,
      price: payload.price
    }]
  };

  let retries = 0;
  const maxRetries = 2;
  let backoff = 500;

  function attemptSend() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeout);
      if (!response.ok) throw new Error("HTTP error " + response.status);
      console.log("Evento add_to_cart enviado correctamente:", payload);
    })
    .catch(err => {
      clearTimeout(timeout);
      if (retries < maxRetries) {
        retries++;
        backoff *= 2;
        console.warn(`Retry ${retries} en ${backoff}ms por error:`, err);
        setTimeout(attemptSend, backoff);
      } else {
        console.error("Error enviando add_to_cart tras retries:", err);
      }
    });
  }

  attemptSend();
}

// Hacer global
window.sendAddToCart = sendAddToCart;
