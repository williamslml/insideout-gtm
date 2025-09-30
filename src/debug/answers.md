## 7️⃣ `src/debug/answers.md`

```markdown
## Problemas detectados

1. **Formato de precio incorrecto**
   - `price: "59,90"` usa coma en vez de punto decimal.
   - GA4 espera número decimal (`59.90`), por lo que los ingresos podrían registrarse mal.

2. **Evento bloqueado por consentimiento**
   - `analytics_storage='denied'` impide que GA4 reciba el evento `add_to_cart`.
   - Aunque Custom HTML se dispara, GA4 no registra el evento.

3. **Custom HTML no disparado en begin_checkout**
   - Esto indica que el trigger para `begin_checkout` no está configurado correctamente en GTM.
   - Riesgo de pérdida de datos importantes de conversión.

## Recomendaciones

- **Corregir dataLayer**:  
  - Asegurar que `price` y `value` sean numéricos usando `parseFloat`.  
- **Configurar triggers y tags en GTM**:  
  - Trigger Custom Event para `begin_checkout` en el Custom HTML Tag.  
  - Revisar triggers GA4 para consentimientos y fallback si se niega analytics_storage.  
- **Riesgos de datos incompletos o mal formateados**:  
  - Ingresos mal registrados.  
  - Eventos críticos perdidos, afectando reportes de conversiones y ROI.
