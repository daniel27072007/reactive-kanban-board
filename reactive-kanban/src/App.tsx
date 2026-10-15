import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { data } from './mockData.ts'
import type { StateKanban } from "./types.ts"
import type { DropResult } from "@hello-pangea/dnd"

function App() {
  const [kanban, setKanban] = useState<StateKanban>(data)
  const arrayColumn = Object.values(kanban)

  const whenDragging = (result: DropResult) => {
    console.log("Somebody drag a card", result)
  }

  return (
    <DragDropContext onDragEnd={whenDragging}>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
          {arrayColumn.map((column) => (
            // 1. O BALDE (ZONA ONDE SOLTA): Criamos um Droppable para cada column do array
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-xl min-h-[300px]">
                  <h2 className="font-bold text-lg text-neutral-200 mb-4 pb-2 border-b border-neutral-800">
                    {column.title}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {column.cards.map((card, index) => (
                      // 2. Criamos um Draggable para cada card do colunm
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-neutral-800 p-4 rounded-lg border border-neutral-700/50 shadow-sm cursor-grab text-white"
                          >
                            <h3 className="font-semibold text-base">{card.title}</h3>
                            <p className="text-xs text-neutral-400 mt-1">{card.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App
