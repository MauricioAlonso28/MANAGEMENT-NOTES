import EditNoteForm from '../../components/form/EditNoteForm'
import Navigator from '../../components/navigation/Navigator'
import styles from './addNote.module.css'

const EditNote = () => {
  return (
    <div className={styles.main_container}>
      <Navigator
        onPress={() => {}}
      />
      <EditNoteForm/>
    </div>
  )
}

export default EditNote