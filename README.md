# InsideOut Store - Prueba Técnica GTM

## Descripción
Proyecto de prueba técnica para InsideOut Store.  


## Requisitos
- Navegador chrome u otro.
- Opcional: Node.js + JSON Server para simular endpoint (`add_to_cart`)

## Cómo ejecutar index
1. Abrir `index.html` en el navegador.
2. Interactuar con los elementos:
   - **Crear cuenta** → solo se registra una vez por sesión.
   - **Añadir al carrito** → previene doble clic y envía evento.
   - **Ir a pagar** → suma los precios y envía `begin_checkout`.
3. Para pruebas de envío de eventos (`add_to_cart`) con endpoint local:
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

## Cómo ejecutar test
1. Abrir `tests/tests.html` en un navegador moderno.
2. Hacer clic en los botones para probar cada función:
   - Test getQueryParam → valida la lectura de parámetros de URL.
   - Test preventDuplicate → verifica prevención de doble clic en eventos.
   - Test oncePerSession → asegura que eventos como `sign_up_click` solo se registren una vez por sesión.
   - Test sendAddToCart → simula el envío del evento `add_to_cart` al endpoint (local o remoto).
3. Si deseas probar envío a endpoint local:
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

## Supuestos y decisiones

-Se utilizó JavaScript puro sin frameworks para compatibilidad con cualquier navegador y entorno GTM.

-Prevenir múltiples clics en add_to_cart en menos de 500ms con preventDuplicate.

-Eventos sign_up_click se registran solo una vez por sesión con oncePerSession usando sessionStorage.

-Los precios y valores se parsean a float para cumplir con GA4.

-add_to_cart se envía a un endpoint simulado con timeout, retries y control de idempotencia.

-Tests incluidos en tests/tests.html para validar funciones críticas sin depender de servidor.


## Notas de depuración

-Revisar src/debug/answers.md para problemas detectados y soluciones sugeridas:

   -Formato incorrecto de precio.
   
   -Eventos bloqueados por consentimiento.
   
   -Triggers Custom HTML no disparados en algunos casos.
   
-Logs de consola ayudan a verificar el flujo de eventos y la prevención de duplicados.
