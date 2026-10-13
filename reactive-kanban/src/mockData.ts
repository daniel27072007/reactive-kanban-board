// src/mockData.ts
import type { StateKanban } from './types.ts';

export const data: StateKanban = {
  'todo': {
    id: 'todo',
    title: 'Todo 📋',
    cards: [
      {
        id: 'task-1',
        title: 'Learn TypeScript',
        description: 'Entender interfaces, tipos e como ele protege o código.',
        tags: 'Estudo, Web',
        priority: 'high'
      },
      {
        id: 'task-2',
        title: 'Config Tailwind v4',
        description: 'Limpar os arquivos padrões do Vite e importar o CSS.',
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
        title: 'Drawn the UI of Kanban',
        description: 'Criar as colunas e os cards usando o Tailwind.',
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