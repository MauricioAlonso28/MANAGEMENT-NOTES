import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect, useState } from "react"
import styles from './notes.module.css'
import NoteDetails from "../note/NoteDetails"
import { getNotesByCategory } from "../../thunks/noteThunks"

const AllNotes = () => {
  const { allNotes, category, noteDetails } = useSelector((state: RootState) => state.noteState)
  const dispatch = useDispatch<AppDispatch>()

  const [noteId, setNoteId] = useState(0)

  useEffect(() => {
    if (category.length > 0) {
      dispatch(getNotesByCategory(category))
    }
  }, [dispatch, noteDetails])

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        {
          allNotes.length > 0 ? (
            <>
              <div className={styles.title_container}>
                <h2 className={styles.title}>These are your notes</h2>
                <b className={styles.title}>(#{category})</b>
              </div>
              <div className={styles.container_notes}>
                {
                  allNotes.map((note) => { 
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
            <div className={styles.title_container}>
              <h2 className={styles.title}>You don't have any notes with this category</h2>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default AllNotes