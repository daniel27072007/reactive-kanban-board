import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { data } from './mockData.ts'
import type { StateKanban } from "./types.ts"
import type { DropResult } from "@hello-pangea/dnd"

function App() {
  const [kanban, setKanban] = useState<StateKanban>(data)
  const arrayColumn = Object.values(kanban)

  const whenDragging = (result: DropResult) => {
    const { source, destination } = result
    //didnt drop at any column
    if(!destination){
      return
    }
    //same column, same place
    if(source.droppableId === destination.droppableId && source.index === destination.index){
      return
    }

    const updatedKanban = { ...kanban }
    const originColumn = updatedKanban[source.droppableId]
    const newColumn = updatedKanban[destination.droppableId]
    const [movedCard] = originColumn.cards.splice(source.index, 1)
    
    //same column, different place
    if(source.droppableId === destination.droppableId){
      originColumn.cards.splice(destination.index, 0 , movedCard)
    }
    //diferent column
    else{
      newColumn.cards.splice(destination.index, 0 , movedCard)
    }

    setKanban(updatedKanban)
  }

  return (
    <DragDropContext onDragEnd={whenDragging}>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
          {arrayColumn.map((column) => (
            
            // 1. A DIV DA column (Fica por fora, segura tudo e não se mexe)
            <div 
              key={column.id} 
              className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-xl flex flex-col min-h-[500px]"
            >
              {/* 2. O TÍTULO DA column: Fica aqui em cima, totalmente isolado do Drag & Drop */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
                <h2 className="font-bold text-lg text-neutral-200">
                  {column.title}
                </h2>
                <span className="bg-neutral-800 text-xs px-2.5 py-1 rounded-full font-semibold text-neutral-400">
                  {column.cards.length}
                </span>
              </div>

              {/* 3. O BALDE INTELIGENTE: O Droppable começa APENAS AQUI, abaixo do título */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  
                  // 4. A ÁREA REAL DE CARDS: Esta div vai esticar e receber os cartões
                  <div 
                    ref={provided.innerRef}          
                    {...provided.droppableProps}     
                    className={`flex-1 flex flex-col min-h-[400px] rounded-lg transition-colors p-0.5 ${
                      snapshot.isDraggingOver ? 'bg-neutral-800/20' : ''
                    }`}
                  >
                    {/* Loop renderizando os Cards reais */}
                    {column.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-neutral-800 p-4 rounded-lg border border-neutral-700/50 shadow-sm cursor-grab text-white select-none active:cursor-grabbing w-full box-border mb-3"
                          >
                            <h3 className="font-semibold text-base">{card.title}</h3>
                            <p className="text-xs text-neutral-400 mt-1">{card.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {/* O espaço fantasma que segura o tamanho do layout */}
                    {provided.placeholder}

                    {/* Aviso visual caso esteja vazio */}
                    {column.cards.length === 0 && (
                      <div className="my-auto text-center text-xs text-neutral-600 border border-dashed border-neutral-800/60 rounded-lg p-4 pointer-events-none">
                        Arraste algo para cá
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App
