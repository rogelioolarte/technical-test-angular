# 🐱 Technical Test Angular (Cat Fact & Image App) (Junior)

**Description**
Angular 19 application that:

* Gets a random phrase from `https://catfact.ninja/fact`
* Gets an image with embedded text from `https://cataas.com/cat/says/{text}`
* Displays both data in the UI conditionally (loading, error, success)
* Manages state with NgRx using signals and reactive bindings
* Includes basic component tests

---

## 📁 Project Structure (basic proposal)

```
src/
├── app/
│ ├── core/ # Services and models
│ ├── store/ # NgRx: actions, reducers, effects, selectors
│ ├── features/
│ │ └── cat/ # 'cat' module (components, containers)
│ ├── shared/ # Reusable components (spinner, card, error-message)
| |__ pages/ # Pages to render
│ └── app.module.ts
├── assets/
├── environments/
└── README.md # This document
```

---

## ⚙️ Requirements and Configuration

* Angular 19
* NgRx 15+ (or latest supported)
* Node.js v16+ & npm or yarn

```bash
git clone <repo>
cd technical-test-angular
npm install
npm start
```

Open your browser to `http://localhost:4200`.

---

## 🧩 Features

1. **Catfact.ninja API Consumption**
`CatService.getFact()` service returns an Observable with the quote of the day.

2. **Cataas.com API Consumption**
`CatService.getCatImage(text: string)` service returns URL:
`https://cataas.com/cat/says/${encodeURIComponent(text)}`

3. **State Management with NgRx**

* **Actions**: `loadFact`, `loadFactSuccess`, `loadFactFailure`
* **Reducer**: handles `{loading, fact, imageUrl, error}` states
* **Effects**: listens to `loadFact`, invokes APIs, triggers success or failure actions
* **Selectors**: extract pieces of state for the component

4. **Signals & Bindings**

* Container component uses `selectSignal` to expose itself as signals or uses only `select` to expose itself as Observables.
* Template uses `@if`, `[src]`, `disabled`, `@defer`, etc. directives.

5. **Conditional Rendering**

* Show spinner while loading
* Show image + phrase upon success
* Show error message if error occurs
* “Refresh” button triggers a new request

6. **Minimal Testing**

* Service: HTTP mock and cover consumption logic
* Effect: Test action triggering and error handling
* Component: Rendering test (loading status, success, error)

---

## ✅ Checklist

* [x] Angular 19 or 20
* [x] NgRx: state, effects, selectors
* [x] Signals in components
* [x] Consumption of both APIs
* [x] Conditional Rendering
* [x] Tests: service, effect, component

---

## ℹ️ Observations

* `cataas.com` generates an image dynamically: no prior download required.
* You can extend the project with more components or tests.
