import styles from './noteDetails.module.css'
import { Note } from '../../types/Note'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { deleteNote, updateNote } from '../../thunks/noteThunks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Options = () => {
  const { noteDetails } = useSelector((state: RootState) => state.noteState as { noteDetails: Note })
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [overlay, setOverlay] = useState(false)

  const changeStatus = () => {
    if (noteDetails.hasOwnProperty("archived")) {
      const updatedNote = {
        ...noteDetails,
        archived: noteDetails.archived ? false : true 
      }

      dispatch(updateNote({
        id: noteDetails.id,
        note: updatedNote
      }))
    }
  }

  const handleDeleteNote = () => {
    dispatch(deleteNote(noteDetails.id))
  }
  
  return (
    <>
      <div className={styles.container_options}>
        <button
          onClick={() => navigate(`/edit/${noteDetails.id}`)}
          className={styles.btn_option}
        >
          <p className={styles.text_option}>Edit</p>
        </button>
        <button
          onClick={() => changeStatus()}
          className={styles.btn_option}
        >
          {
            noteDetails.archived 
              ? (<p className={styles.text_option}>Unarchive</p>)
              : (<p className={styles.text_option}>Archive</p>)
          }
        </button>
        <button
          onClick={() => setOverlay(true)}
          className={styles.btn_option}
        >
          <p className={styles.text_option}>Delete</p>
        </button>
      </div>
      {
        overlay && (
          <div className={styles.overlay}>
            <div className={styles.overlay_content}>
              <h3 className={styles.confirm_delete}>Are you sure of delete this note?</h3>
              <div className={styles.container_btns}>
                <button
                  onClick={() => handleDeleteNote()}
                  className={styles.btn_yes_label}
                >
                  Yes
                </button>
                <button
                  onClick={() => setOverlay(false)}
                  className={styles.btn_no_label}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Options