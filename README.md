---

# 🐱 Cat Fact & Image App

**Descripción**
Aplicación en Angular 19 que:

* Obtiene una frase aleatoria de `https://catfact.ninja/fact`
* Obtiene una imagen con texto incrustado desde `https://cataas.com/cat/says/{text}`
* Muestra ambos datos en la UI de forma condicional (cargando, error, éxito)
* Gestiona estado con NgRx usando signals y vinculaciones reactivas
* Incluye tests básicos para componentes

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios y modelos
│   ├── store/          # NgRx: actions, reducers, effects, selectors
│   ├── features/
│   │   └── cat/        # Módulo 'cat' (componentes, contenedores)
│   ├── shared/         # Componentes reutilizables (spinner, card, error-message)
|   |__ pages/		# Paginas a renderizas
│   └── app.module.ts
├── assets/
├── environments/
└── README.md           # Este documento
```

---

## ⚙️ Requisitos y Configuración

* Angular 19
* NgRx 15+ (o la más reciente compatible)
* Node.js v16+ & npm o yarn

```bash
git clone <repo>
cd cat-app
npm install
npm start
```

Abre el navegador en `http://localhost:4200`.

---

## 🧩 Funcionalidades

1. **Consumo API de catfact.ninja**
   Servicio `CatService.getFact()` devuelve un Observable con la frase del día.

2. **Consumo API de cataas.com**
   Servicio `CatService.getCatImage(text: string)` devuelve URL:
   `https://cataas.com/cat/says/${encodeURIComponent(text)}`

3. **State Management con NgRx**

   * **Actions**: `loadFact`, `loadFactSuccess`, `loadFactFailure`
   * **Reducer**: maneja estados `{ loading, fact, imageUrl, error }`
   * **Effects**: escucha `loadFact`, invoca APIs, dispara acciones de éxito o fallo
   * **Selectors**: extraen piezas del estado para el componente

4. **Signals & bindings**

   * Componente contenedor usa `selectSignal` para exponerse como signals.
   * Template utiliza directivas `*ngIf`, `[src]`, `disabled`, `ngIf; else`, etc.

5. **Renderizado condicional**

   * Mostrar spinner mientras carga
   * Mostrar imagen + frase al éxito
   * Mostrar mensaje de error si ocurre fallo
   * Botón “Refrescar” activa nueva petición

6. **Tests mínimos**

   * Servicio: mock HTTP y cubrir lógica del consumo
   * Efecto: testear disparo de acciones y manejo de errores
   * Componente: test de renderizado (estado cargando, éxito, error)

---


## ✅ Checklist

* [x] Angular 19 o 20
* [x] NgRx: estado, efectos, selectors
* [x] Signals en componentes
* [x] Consumo de ambas APIs
* [x] Renderizado condicional
* [x] Tests: servicio, efecto, componente

---

## ℹ️ Observaciones

* `cataas.com` genera imagen dinámicamente: no requiere descarga previa.
* Puedes extender el proyecto con más componentes o tests.

---

