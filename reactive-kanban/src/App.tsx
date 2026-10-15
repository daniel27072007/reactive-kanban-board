import { useState } from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
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
        
        {/* Grid para alinhar as 3 columns lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
          
          {arrayColumn.map((column) => (
            
            // 1. O BALDE (ZONA ONDE SOLTA): Criamos um Droppable para cada column do array
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                
                // 2. A NOSSA DIV REAL DA column: Ela precisa receber as conexões da biblioteca
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-xl min-h-[300px]">
                  {/* Título da column */}
                  <h2 className="font-bold text-lg text-neutral-200 mb-4 pb-2 border-b border-neutral-800">
                    {column.title}
                  </h2>

                  <p className="text-xs text-neutral-500 italic">
                    Zona pronta para receber cards...
                  </p>

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
