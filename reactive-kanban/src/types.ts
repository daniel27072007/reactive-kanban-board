export type Priority = 'low' | 'medium' | 'high'

export interface Card {
    id: string
    title: string
    description: string
    tags: string
    priority: Priority
}

export interface Column { 
    id: string
    title: string
    cards: Card[]
}

export interface StateKanban {
    [columnId: string]: Column
}