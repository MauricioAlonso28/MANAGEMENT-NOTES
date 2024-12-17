import { useState } from 'react'
import styles from './mainPage.module.css'
import Navigator from '../../components/navigation/Navigator'
import Notes from '../../components/notes/Notes'
import NotesArchived from '../../components/notes/NotesArchived'

const MainPage = () => {
  const [isArchivedPage, setIsArchivedPage] = useState(false)

  return (
    <div className={styles.main_container}>
      <Navigator
        onPress={setIsArchivedPage}
      />
      {
        !isArchivedPage ? (
          <Notes/>
        ) : (
          <NotesArchived/>
        )
      }
    </div>
  )
}

export default MainPage