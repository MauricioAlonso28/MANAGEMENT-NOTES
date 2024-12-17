import { useDispatch, useSelector } from 'react-redux'
import styles from './notes.module.css'
import { AppDispatch, RootState } from '../../store/store'
import React, { useEffect, useState } from 'react'
import { getAllNotes } from '../../thunks/noteThunks'
import NoteDetails from '../note/NoteDetails'

const Notes = () => {
  const { notes, noteDetails } = useSelector((state: RootState) => state.noteState)
  const dispatch = useDispatch<AppDispatch>()

  const [noteId, setNoteId] = useState(0)

  useEffect(() => {
    dispatch(getAllNotes())
  }, [dispatch, noteDetails])

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        {
          notes.length > 0 ? (
            <>
              <div className={styles.title_container}>
                <h2 className={styles.title}>These are your notes</h2>
              </div>
              <div className={styles.container_notes}>
                {
                  notes.map((note) => { 
                    return (
                      <NoteDetails
                        key={note.id}
                        note={note}
                        setNoteId={setNoteId}
                        noteId={noteId}
                      />
                    )
                  })
                }
              </div>
            </>
          ) : (
              <h2 className={styles.title}>You don't have any notes here</h2>
          )
        }
      </div>

    </div>
  )
}

export default React.memo(Notes)