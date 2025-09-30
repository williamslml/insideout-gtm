const lastEventTimes = {};

function preventDuplicate(eventName, intervalMs = 500) {
  const now = Date.now();
  if (lastEventTimes[eventName] && (now - lastEventTimes[eventName]) < intervalMs) {
    console.warn(`Evento ${eventName} duplicado evitado`);
    return false;
  }
  lastEventTimes[eventName] = now;
  return true;
}

function oncePerSession(eventName) {
  if (sessionStorage.getItem(eventName)) {
    console.warn(`Evento ${eventName} ya enviado esta sesión`);
    return false;
  }
  sessionStorage.setItem(eventName, 'true');
  return true;
}

// Hacer globales
window.preventDuplicate = preventDuplicate;
window.oncePerSession = oncePerSession;
