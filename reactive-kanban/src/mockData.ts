// src/mockData.ts
import type { StateKanban } from './types.ts';

export const data: StateKanban = { 
  'todo': { 
    id: 'todo', 
    title: 'To Do 📋', 
    cards: [ 
      { 
        id: 'task-1', 
        title: 'Learn TypeScript', 
        description: 'Understand interfaces, types, and how it protects the code.', 
        tags: 'Study, Web', 
        priority: 'high' 
      }, 
      { 
        id: 'task-2', 
        title: 'Configure Tailwind v4', 
        description: 'Clean up default Vite files and import the CSS.', 
        tags: 'Config', 
        priority: 'medium' 
      } 
    ] 
  }, 
  'in-progress': { 
    id: 'in-progress', 
    title: 'In Progress ⏳', 
    cards: [ 
      { 
        id: 'task-3', 
        title: 'Draw the Kanban UI', 
        description: 'Create columns and cards using Tailwind.', 
        tags: 'Interface', 
        priority: 'high' 
      } 
    ] 
  }, 
  'done': { 
    id: 'done', 
    title: 'Done ✅', 
    cards: [] 
  } 
};