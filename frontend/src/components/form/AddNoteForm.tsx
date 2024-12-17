import AddForm from './AddForm'
import styles from './form.module.css'

const AddNoteForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <h2 className={styles.title}>Create a new Note</h2>
        <div className={styles.container_form}>
          <AddForm/>
        </div>
      </div>
    </div>  
  )
}

export default AddNoteForm