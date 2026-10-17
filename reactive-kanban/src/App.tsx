import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { data } from './mockData.ts'
import type { StateKanban, Priority } from "./types.ts"
import type { DropResult } from "@hello-pangea/dnd"

function App() {
  //kanban drag and drop logic
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

  // "CRUD" of the cards
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newTags, setNewTags] = useState('')
  const [newPriority, setNewPriority] = useState<Priority>('medium')

  const addTask = (e: React.SubmitEvent) => {
    e.preventDefault()
    if(!newTitle.trim()){
      return
    }
    const newCard = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      tags: newTags.trim() ? newTags : 'Other',
      priority: newPriority
    }
    const newKanban = { ...kanban }
    newKanban['todo'].cards.unshift(newCard)
    setKanban(newKanban)
    setNewTitle("")
    setNewDescription("")
    setNewTags("")
    setNewPriority("medium")
  }

  return (
    <DragDropContext onDragEnd={whenDragging}>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
        <form onSubmit={addTask} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          
          {/* Input do Título */}
          <div className="md:col-span-1 w-full">
            <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Title</label>
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ex: Study about APIs" 
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
          
          {/* Input da Descrição */}
          <div className="md:col-span-1 w-full">
            <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Descripition</label>
            <input 
              type="text" 
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What needs to be done..." 
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          {/* Input das Tags */}
          <div className="md:col-span-1 w-full">
            <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Tags</label>
            <input 
              type="text" 
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="Ex: Web, Study, Urgent, Config" 
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          {/* Select da Prioridade */}
          <div className="md:col-span-1 w-full">
            <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Priority</label>
            <select 
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors cursor-pointer h-[38px]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Botão de Enviar */}
          <button 
            type="submit" 
            className="bg-white text-neutral-950 font-bold px-6 py-2 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer w-full h-[38px] text-sm md:col-span-1"
          >
            + Create
          </button>
        </form>
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
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-base text-white leading-tight">
                                {card.title}
                              </h3>
                              
                              {/* Badge dinâmica baseada na prioridade do card */}
                              <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded shrink-0 ${
                                card.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                card.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {card.priority}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                              {card.description}
                            </p>

                            {/* Mágica das Tags: Quebra a string por vírgula e faz um loop criando as hashtags */}
                            <div className="flex flex-wrap gap-1">
                              {card.tags.split(',').map((tag, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-neutral-700/50 text-[10px] text-neutral-300 px-2 py-0.5 rounded"
                                >
                                  #{tag.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {/* O espaço fantasma que segura o tamanho do layout */}
                    {provided.placeholder}

                    {/* Aviso visual caso esteja vazio */}
                    {column.cards.length === 0 && (
                      <div className="my-auto text-center text-xs text-neutral-600 border border-dashed border-neutral-800/60 rounded-lg p-4 pointer-events-none">
                        Drop something here...
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
