import React, { useState, useContext, useEffect } from 'react'
import { NotesContext } from 'Contexts'
import { noteType } from 'types'

import style from './note.module.css'
import { useDebouncedValue } from 'hooks'

type noteProps = {
  id: number
}

type changeHandlerType = (event: React.ChangeEvent<HTMLTextAreaElement>) => void
type submitHandlerType = (event: React.FormEvent) => void

export default function Note({ id }: noteProps) {
  const { notes, addNote, deleteNote } = useContext(NotesContext)
  const match = notes.find((note: noteType) => note.id === id)
  const [note, setNote] = useState(match?.text || '')

  const onChange: changeHandlerType = (event) => {
    setNote(event.target.value)
  }

  const debouncedValue = useDebouncedValue(note, 1_000)

  useEffect(() => {
    addNote({ id, text: debouncedValue } as noteType)
  }, [debouncedValue, id])

  return (
    <section>
      <header>
        <h2>Notes</h2>
      </header>
      <div>
        <textarea
          className={style.textArea}
          value={note}
          onChange={onChange}
          name=""
          id=""
          cols={30}
          rows={10}
        ></textarea>
      </div>
    </section>
  )
}
