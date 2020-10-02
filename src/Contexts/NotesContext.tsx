import React, { createContext } from 'react'
import { useLocalStorage } from 'hooks'
import { ContextProviderProps, noteType } from 'types'

type noteContextType = {
  notes: noteType[]
  deleteNote: (id: number) => void
  addNote: (note: noteType) => void
}

const defaultContext: noteContextType = {
  notes: [],
  deleteNote: (id) => {},
  addNote: (note) => {},
}

const NotesContext = createContext(defaultContext)
const { Provider } = NotesContext

export function NotesProvider({ children }: ContextProviderProps) {
  const [notes, setNotes]: any = useLocalStorage<noteType[]>('notes', [])

  const deleteNote = (id: number) => {
    setNotes((notes: noteType[]) => {
      notes.filter((note: noteType) => note.id !== id)
    })
  }
  const addNote = (note: noteType) => {
    const filteredNotes = notes.filter(
      (current: noteType) => current.id !== note.id
    )
    setNotes([...filteredNotes, note])
  }
  return (
    <Provider
      value={{
        notes,
        addNote,
        deleteNote,
      }}
    >
      {children}
    </Provider>
  )
}

export default NotesContext
