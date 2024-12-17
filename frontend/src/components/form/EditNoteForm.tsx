import { useDispatch, useSelector } from 'react-redux'
import styles from './form.module.css'
import { AppDispatch, RootState } from '../../store/store'
import { Note } from '../../types/Note'
import EditForm from './EditForm'
import { useEffect } from 'react'
import { getAllCategories } from '../../thunks/categoryThunks'
import { getNoteById } from '../../thunks/noteThunks'
import { useParams } from 'react-router-dom'

const EditNoteForm = () => {
  const { noteDetails } = useSelector((state: RootState) => state.noteState as { noteDetails: Note })
  const dispatch = useDispatch<AppDispatch>()
  const {id} = useParams()
  
  useEffect(() => { 
    dispatch(getAllCategories())
    dispatch(getNoteById(Number(id)))
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <h2 className={styles.title}>Edit the note # {noteDetails.id}</h2>
        <div className={styles.container_form}>
          {
            !noteDetails.id
              ? <p>Loading...</p>
              : (
                <EditForm
                  noteDetails={noteDetails}
                />
              )
          }
        </div>
      </div>
    </div>  
  )
}

export default EditNoteForm