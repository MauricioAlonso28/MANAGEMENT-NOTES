import Navigator from '../../components/navigation/Navigator'
import AllNotes from '../../components/notes/AllNotes'
import styles from './mainPage.module.css'

const AllNotesPage = () => {
  return (
    <div className={styles.main_container}>
      <Navigator
        onPress={() => {}}
      />
      <AllNotes/>
    </div>
  )
}

export default AllNotesPage