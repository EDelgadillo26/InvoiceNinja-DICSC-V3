# CI/CD Setup para InvoiceNinja E2E Tests

## 📋 Configuración Actual

### GitHub Actions Workflow
- **Archivo**: `.github/workflows/playwright.yml`
- **Trigger**: Merge/Push a rama `develop`
- **Ejecución inicial**: Solo 1 test case (IN-16)
- **Browser**: Solo Chromium para optimizar tiempo

## 🚀 Comandos Disponibles

### Localmente
```bash
# Ejecutar solo el test básico (IN-16)
npm run test:single

# Ejecutar tests de boundary (IN-25, IN-27, IN-28, etc.)
npm run test:boundary

# Ejecutar tests del campo Number (IN-48, IN-49, IN-50, IN-51)
npm run test:number-field

# Todos los tests
npm test
```

### En CI/CD
```bash
# Test único (default en CI)
npx playwright test --grep "IN-16.*Crear Cliente con los campos minimos requeridos" --project=chromium

# Todos los tests (manual trigger)
npx playwright test --project=chromium
```

## 🔧 Configuraciones

### Playwright Config Ajustes
- **Headless**: Automático (CI=true → headless, local=false → con UI)
- **Screenshots**: Solo en fallos
- **Videos**: Solo en CI cuando hay fallos
- **Timeout**: 60 segundos por test
- **Retries**: 2 intentos en CI, 0 en local

### GitHub Actions Features
- ✅ **Auto-trigger**: En push/PR a `develop`
- ✅ **Manual trigger**: Con opción de scope (single/all)
- ✅ **Artifacts**: Reportes y screenshots
- ✅ **Timeout**: 30 minutos máximo
- ✅ **Matrix strategy**: Solo Chromium inicialmente

## 📊 Test Cases Configurados

### Test Único (Fase 1)
- **IN-16**: Crear Cliente con campos mínimos requeridos
- **Propósito**: Validar que CI/CD funciona correctamente

### Tests Boundary (Fase 2 - Futuro)
- **IN-25**: Name con 1 carácter
- **IN-27**: Name con 255 caracteres  
- **IN-28**: Name con 256 caracteres (negativo)

### Tests Campo Number (Recién Creados)
- **IN-48**: Number con 1 carácter
- **IN-49**: Number con 255 caracteres
- **IN-50**: Number con 256 caracteres (negativo)
- **IN-51**: Number con caracteres especiales (negativo)

## 🔄 Plan de Migración

### Fase 1: Validación ✅
- [x] Configurar workflow para rama `develop`
- [x] Ejecutar solo IN-16 para probar infraestructura
- [x] Validar que screenshots y reportes se generen

### Fase 2: Expansión (Próxima)
- [ ] Una vez validado, cambiar a ejecutar todos los TC
- [ ] Agregar más browsers (Firefox, Safari)
- [ ] Configurar notificaciones de fallos

## 🛠️ Troubleshooting

### Si falla el workflow:
1. Verificar que la rama sea `develop`
2. Revisar logs en Actions tab del repo
3. Descargar artifacts para ver screenshots de fallos

### Para debugging local:
```bash
npm run test:debug
```

## 📝 Próximos Pasos

1. **Hacer merge a develop** para activar el workflow
2. **Validar ejecución** del test IN-16
3. **Si funciona correctamente**, cambiar configuración para ejecutar todos los TC
4. **Monitorear** estabilidad y tiempos de ejecución