# InvoiceNinja Test Framework 🧪

Este repositorio contiene una suite completa de tests para InvoiceNinja usando **Playwright** con reportes **Allure**. Incluye 128 test cases automatizados que cubren las funcionalidades principales de gestión de clientes, productos y login.

## 📊 Estadísticas del Proyecto

- **🎯 Total Tests**: 128 test cases activos
- **📂 Módulos**: Clients (89), Products (37), Login (2)  
- **🏷️ Tags**: @smoke, @regression, @sanity, @negative
- **🌐 Browsers**: Chromium, Firefox, WebKit (Firefox, WebKit estan deshabilitados de momento, pero se tiene la configuracion terminada)
- **📈 Coverage**: Funcionalidades principales de InvoiceNinja

## 🚀 Quick Start

### 1. Clonar el Repositorio

```bash
# HTTPS
git clone https://github.com/EDelgadillo26/InvoiceNinja-DICSC-V3.git

# SSH
git clone git@github.com:EDelgadillo26/InvoiceNinja-DICSC-V3.git

cd InvoiceNinja-DICSC-V3
```

### 2. Instalación

```powershell
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install --with-deps

# (Opcional) Instalar Allure CLI para reportes locales
npm install -g allure-commandline
```

### 3. Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Configuración de entorno
BASE_URL=https://your-invoiceninja-instance.com
TEST_USER_EMAIL=admin@example.com
TEST_USER_PASSWORD=your-password
```

### 4. Ejecutar Tests

```powershell
# Ejecutar toda la suite
npm test

# Ejecutar con interfaz gráfica
npm run test:headed

# Ejecutar y generar reporte Allure
npm run test:allure
```

## 🏗️ Arquitectura del Proyecto

```
📦 InvoiceNinjaV2/
├── 📁 tests/                  # Test cases organizados por módulos
│   ├── 📁 clients/            # Tests de gestión de clientes
│   │   ├── clients.spec.ts    # Tests principales de clientes
│   │   ├── createClients.spec.ts  # Tests de creación
│   │   └── editClients.spec.ts    # Tests de edición
│   ├── 📁 products/           # Tests de gestión de productos
│   │   ├── products.spec.ts   # Tests principales de productos
│   │   └── createProducts.spec.ts # Tests de creación
│   └── 📁 login/              # Tests de autenticación
│       └── login.spec.ts      # Tests de login
├── 📁 pages/                  # Page Object Model (POM)
│   ├── basePage.ts            # Clase base común
│   ├── clientsPage.ts         # Página de clientes
│   ├── productsPage.ts        # Página de productos
│   └── loginPage.ts           # Página de login
├── 📁 utils/                  # Utilidades y helpers
│   ├── dataGenerator.ts       # Generador de datos de prueba
│   ├── envUtils.ts           # Manejo de variables de entorno
│   └── browserContextConstructor.ts # Constructor de contexto
├── 📁 data/                   # Datos de prueba
│   └── users.json            # Usuarios de prueba
├── 📁 allure-results/         # Resultados de Allure (generados)
├── 📁 allure-report/          # Reporte HTML de Allure (generado)
├── 📁 test-results/           # Resultados de Playwright
├── playwright.config.ts       # Configuración de Playwright
├── package.json              # Scripts y dependencias
└── README.md                 # Este archivo
```

### 🎭 Page Object Model (POM)

El proyecto utiliza el patrón **Page Object Model** para mantener el código organizado y reutilizable:

- **BasePage**: Funcionalidades comunes a todas las páginas
- **Páginas específicas**: Encapsulan elementos y acciones de cada módulo
- **Métodos descriptivos**: `clickNewClientButton()`, `fillNameField()`, etc.

### 🎲 Generación de Datos

Utiliza **Faker.js** para generar datos de prueba únicos:

```typescript
// Ejemplo de uso
const clientData = DataGenerator.generateClientData();
// Genera: nombre, email, teléfono, dirección, etc.
```

## 🎯 Comandos de Ejecución

### Tests por Tags

```powershell
# Tests de smoke (críticos)
npm run test_Smoke

# Tests de regresión
npm run test:regression

# Tests de login
npm run test_Login

# Combinación de tags (productos Y sanity)
npx playwright test --grep "@products.*@sanity|@sanity.*@products"

# Tests negativos
npx playwright test --grep "@negative"
```

### Tests por Módulos

```powershell
# Solo tests de clientes
npx playwright test tests/clients/

# Solo tests de productos
npx playwright test tests/products/

# Test específico por ID
npx playwright test --grep "IN-16"

# Test específico por nombre
npx playwright test --grep "Crear Cliente con los campos minimos requeridos"
```

### Modo Debug y Desarrollo

```powershell
# Modo debug (paso a paso)
npm run test:debug

# Ejecutar con navegador visible
npm run test:headed

# Ejecutar un solo test
npm run test:single

# Generar traces para análisis
npx playwright test --trace on
```

## 📊 Reportes Allure

### Generar Reportes Localmente

```powershell
# Ejecutar tests y abrir reporte automáticamente
npm run test:allure

# Solo generar reporte (desde resultados existentes)
npm run allure:generate

# Solo abrir reporte generado
npm run allure:open
```

### Reportes con Timestamp

```powershell
# Preservar reportes anteriores
$timestamp = Get-Date -Format "yyyy-MM-dd-HHmmss"
allure generate allure-results --clean -o "allure-report-$timestamp"
```

### Características del Reporte Allure

- 📈 **Estadísticas detalladas**: Passed, Failed, Skipped
- 🕒 **Timeline**: Duración de tests y trends
- 📸 **Screenshots**: Capturas automáticas en fallos
- 📹 **Videos**: Grabación de tests fallidos
- 🔍 **Traces**: Análisis detallado de ejecución
- 📋 **Test Steps**: Pasos detallados de cada test
- 🏷️ **Tags y Categorías**: Filtrado por módulos

## 🏷️ Sistema de Tags

| Tag | Descripción | Cantidad |
|-----|-------------|----------|
| `@smoke` | Tests críticos básicos | 16 |
| `@regression` | Suite completa de regresión | 91 |
| `@sanity` | Tests de verificación rápida | 13 |
| `@negative` | Tests de casos negativos | 52 |
| `@clients` | Tests del módulo clientes | 81 |
| `@products` | Tests del módulo productos | 37 |
| `@login` | Tests de autenticación | 2 |

## 📝 Scripts NPM Disponibles

```json
{
  "test": "npx playwright test",                    // Suite completa
  "test:single": "npx playwright test --grep 'IN-16'", // Test específico
  "test:regression": "npx playwright test --grep @regression", // Regresión
  "test:headed": "npx playwright test --headed",   // Con navegador visible
  "test:debug": "npx playwright test --debug",     // Modo debug
  "test_Smoke": "npx playwright test --grep @smoke", // Tests smoke
  "test_Login": "npx playwright test --grep @login", // Tests login
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report",
  "test:allure": "npm run test && npm run allure:generate && npm run allure:open"
}
```

## 🔧 Configuración

### Playwright Config

```typescript
// playwright.config.ts - Configuraciones principales
{
  timeout: 60000,           // 60s por test
  fullyParallel: true,      // Ejecución paralela
  retries: 2,               // Reintentos en CI
  workers: 1,               // Workers simultáneos
  headless: true,           // Modo headless en CI
  screenshot: 'only-on-failure', // Screenshots en fallos
  video: 'retain-on-failure',    // Videos en fallos
  trace: 'on-first-retry'        // Traces en reintentos
}
```

### Variables de Entorno

```env
# .env file
BASE_URL=https://your-app.com
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
CI=false                    # true en CI/CD
HEADLESS=true              # false para ver navegador
```

## 🚀 CI/CD (GitHub Actions)

Ver [`CI-CD-SETUP.md`](CI-CD-SETUP.md) para configuración completa de pipeline.

### Características del Pipeline:

- ✅ **Instalación automática** de dependencias
- 🧪 **Ejecución de tests** en múltiples navegadores
- 📊 **Generación de reportes** Allure
- 📁 **Artefactos** para debugging
- 🔄 **Matrix strategy** para diferentes configuraciones
- 📧 **Notificaciones** en fallos (opcional)

## 🎯 Test Cases Coverage

### Módulo Clientes (81 tests)
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Validaciones de campos (longitud, formato, requeridos)
- ✅ Búsquedas y filtros
- ✅ Acciones masivas (Bulk operations)
- ✅ Ordenamiento de columnas

### Módulo Productos (37 tests)  
- ✅ Gestión completa de productos
- ✅ Validaciones de campos numéricos y texto
- ✅ Archivado y restauración
- ✅ Acciones CRUD

### Módulo Login (2 tests)
- ✅ Login exitoso
- ✅ Login con credenciales incorrectas

## 🛠️ Mejores Prácticas

### Para Desarrolladores

```typescript
// ✅ Usar datos únicos para evitar conflictos
const clientName = `TestClient_${Date.now()}`;

// ✅ Implementar esperas explícitas
await page.waitForSelector('[data-testid="client-list"]');

// ✅ Usar selectores estables
await page.click('[data-testid="save-button"]'); // ✅ Mejor
await page.click('button:has-text("Save")');     // ❌ Frágil

// ✅ Cleanup después de tests
await test.afterEach(async () => {
  await cleanupTestData();
});
```

### Para Tests Estables

- 🎯 **Datos únicos**: Usar timestamps o UUIDs
- ⏱️ **Esperas explícitas**: `waitForSelector()` vs `sleep()`
- 🔍 **Selectores estables**: `data-testid` preferido
- 🧹 **Cleanup**: Limpiar datos después de tests
- 📸 **Screenshots**: Capturar evidencia en fallos

## 🐛 Debugging

### Análisis de Fallos

```powershell
# Ejecutar con traces detallados
npx playwright test --trace on

# Abrir trace viewer
npx playwright show-trace trace.zip

# Ejecutar en modo debug interactivo
npx playwright test --debug --grep "test-name"

# Generar reporte HTML de Playwright
npx playwright show-report
```

### Logs y Evidencias

- 📊 **Allure Reports**: Análisis detallado de resultados
- 📸 **Screenshots**: Automáticos en fallos
- 📹 **Videos**: Grabación de tests fallidos  
- 🔍 **Traces**: Step-by-step debugging
- 📝 **Console logs**: Capturados automáticamente

## 📚 Recursos y Documentación

- 📖 [Playwright Documentation](https://playwright.dev/docs/intro)
- 📊 [Allure Framework](https://docs.qameta.io/allure/)
- 🎭 [Page Object Model Guide](https://playwright.dev/docs/test-pom)
- 🏷️ [Test Organization](https://playwright.dev/docs/test-annotations)
- 🔧 [Configuration Options](https://playwright.dev/docs/test-configuration)

## 🤝 Contribución

### Para agregar nuevos tests:

1. **Crear branch**: `git checkout -b feature/new-test-cases`
2. **Seguir estructura**: Usar POM y convenciones existentes
3. **Agregar tags**: Clasificar con tags apropiados
4. **Documentar**: Actualizar README si es necesario
5. **Pull Request**: Incluir descripción y evidencias

### Convenciones:

```typescript
// Formato de ID de tests
test('IN-XXX: Módulo > Funcionalidad > Descripción específica', {
  tag: ['@smoke', '@module']
}, async () => {
  // Test implementation
});
```

## 📞 Soporte y Contacto

- 👨‍💻 **Autor**: Pablo Delgadillo  
- 📧 **Email**: [edelgadillo2002@gmail.com](mailto:edelgadillo2002@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/EDelgadillo26/InvoiceNinja-DICSC-V3/issues)
- 📋 **Project Board**: [GitHub Projects](https://github.com/EDelgadillo26/InvoiceNinja-DICSC-V3/projects)

---

### 📈 Test Execution Stats

```
🎯 Total Tests: 128
✅ Passed: 73
❌ Failed: 55
```

*Para estadísticas actualizadas, ver el último reporte de Allure o GitHub Actions.*
