import AddNoteForm from '../../components/form/AddNoteForm'
import Navigator from '../../components/navigation/Navigator'
import styles from './addNote.module.css'

const AddNote = () => {
  return (
    <div className={styles.main_container}>
      <Navigator
        onPress={() => {}}
      />
      <AddNoteForm/>
    </div>
  )
}

export default AddNote