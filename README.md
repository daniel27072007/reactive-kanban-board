# Reactive Kanban Board (Drag & Drop Interface)
**A high-performance, real-time interactive task management board.**

A modern, highly reactive project management interface built with **React 19**, **Vite v8**, **TypeScript**, and **Tailwind CSS v4**. It simulates premium task workflows like Trello, leveraging advanced drag-and-drop engines, modular item modifiers, and client-side data persistence.

---

## The Problem
Building highly interactive board layouts with continuous element mutations introduces critical performance bottlenecks and synchronization issues:
* **UI Thread Lagging:** Dragging and dropping elements frequently triggers continuous, deep tree re-renders across columns, leading to frame drops and sluggish tracking.
* **Complex Element Mutations:** Performing runtime modifications (creating, editing, and deleting items) inside multi-layered nested state trees can easily result in state mutability bugs or data fragmentation.
* **State Volatility:** Standard in-memory state variables flush immediately upon browser reloads (F5), destroying the user's active workflow setup.
* **Component Input Pollution:** Tracking temporary edits directly inside the main data models forces unnecessary repaint signals across the entire canvas whenever a single letter is typed.

---

## The Solution
This application delivers an optimized, lightweight Kanban architecture. It isolates low-level events (like drag intercepts or isolated character typing), handles deep structural data updates using safe JavaScript immutability principles, and bridges data models directly into browser storage subsystems.

### What this tool automatically handles for you:
* **Optimized Board Sorting Engine (`@hello-pangea/dnd`):** Seamlessly tracks spatial coordinates during movement, updating array configurations only when a valid drop completes to prevent UI stutter.
* **Lazy State Initialization Hook:** Reads internal storage allocations safely during the component's initial mount phase, preventing costly disk input/output operations during subsequently triggered views.
* **Isolated Editing Sandbox Store:** Maps open items to a localized temporary state variable (`editingCard`), shields the global columns from constant re-renders while a user edits details inside a modal.
* **Automated Data Persistence Layer (`useEffect`):** Monitors the core dataset structure to compile and overwrite changed states straight to the browser disk (`localStorage`) without requiring manual save buttons.
* **Propagation Interception Model (`e.stopPropagation()`):** Seals mouse click event lifecycles inside localized interactive elements (like dropdown buttons), preventing drag anchors from hijacking normal form focus.

---

## Interface Specifications & Technical Walkthrough
This section outlines how user input is processed, formatted, and verified through individual workflow sections.

### 1. Board Structural Data Schema
The board relies on a strict index-mapped record topology defined by specialized columns, where cards are stored sequentially inside specific state domains.

#### State Composition Framework (types.ts)
* **Card Domain Model:** Enforces a rigid typing structure for structural tasks, requiring a unique string `id`, a string `title`, a string `description`, a string `tags`, and a prioritized classification constraint.
* **Column Domain Model:** Packs a unique structural index string, a descriptive title string, and a flexible array container containing individual card elements.

```json
{
  "todo": {
    "id": "todo",
    "title": "To Do 📋",
    "cards": [
      {
        "id": "task-1",
        "title": "Learn TypeScript",
        "description": "Understand interfaces, types, and how it protects the code.",
        "tags": "Study, Web",
        "priority": "high"
      }
    ]
  },
  "in-progress": {
    "id": "in-progress",
    "title": "In Progress ⏳",
    "cards": []
  },
  "done": {
    "id": "done",
    "title": "Done ✅",
    "cards": []
  }
}
```

### 2. State Mutation Logic
Core functional state manipulation handlers ensuring clean database transformations without structural state corruption.

```typescript
// Splicing array references to swap element positions across columns safely
const [movedCard] = originColumn.cards.splice(source.index, 1);
newColumn.cards.splice(destination.index, 0, movedCard);
setKanban(updatedKanban);
```

---

## Project Architecture
```text
reactive-kanban/
├── src/                     # Core system design workspace
│   ├── App.tsx              # Central UI controller, drag pipelines & views
│   ├── index.css            # Tailwind CSS v4 setup framework definitions
│   ├── main.tsx             # React Virtual DOM application mount entrypoint
│   ├── mockData.ts          # Default data architecture for fallback states
│   └── types.ts             # TypeScript boundary models and interface blueprints
├── eslint.config.js         # Structural code style validation parameters
├── index.html               # Public fallback application document template
├── package.json             # System node dependency collections and versions
├── tsconfig.app.json        # Frontend compiler specifications and strict targets
├── tsconfig.json            # Central TypeScript reference configuration file
├── tsconfig.node.json       # Build environment system compiler rules
└── vite.config.ts           # Vite server optimization properties and plugins
```

---

## Installation & Local Deployment Guide
To run this application locally, ensure you have Node.js installed on your computer, then download the files and run the setup commands in your terminal emulator.

### 1. Install Node Dependencies
Open your command terminal inside the inner directory where package.json is located and execute:
```bash
npm install
```

### 2. Launch Local Development Server
Boot up the fast local compilation environment to view the responsive template layout:
```bash
npm run dev
```

### 3. Compile Production Distribution Bundles
```bash
npm run build
```

---

## Ecosystem Breakdown

| System Element | Core Tool | Architectural Edge |
| :--- | :--- | :--- |
| **Compilation Architecture** | Vite v8 Engine | Instant Hot Module Replacement (HMR) under short execution thresholds. |
| **Styling Module** | Tailwind CSS v4 | Native build processing speeds with zero bloated config footprints. |
| **Type Integrity Layer** | TypeScript v6 | Enforces strong compile-time checks across data models and events. |
| **Drag & Drop Engine** | @hello-pangea/dnd | Smooth animations and structural item handling for multi-column layouts. |

---

## Final Comparison Matrix: Architecture vs Tradition

| Feature Attribute | Traditional React Approach | Reactive Kanban Layout |
| :--- | :--- | :--- |
| **Component Refresh Cost** | Re-renders every single card whenever a user types an item update. | Sandbox states protect the grid from continuous re-render execution loops. |
| **Persistence Workflow** | Lost completely upon unexpected reload unless manual saves are triggered. | Background synchronization continuously checkpoints state arrays to local storage. |
| **Action Event Separation** | Clicking sub-elements triggers column drag handlers automatically. | Implements precise event boundaries to block bubble actions up the DOM tree. |
| **Data Boot Sequence** | Re-fetches raw disk sectors on every paint loop, lagging user interactions. | Leverages lazy execution closures to touch disk memory only on page startup. |