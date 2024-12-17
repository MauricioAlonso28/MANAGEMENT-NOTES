import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../search/SearchBar'
import styles from './navigator.module.css'

type Props = {
  onPress: Function
}

const Navigator = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className={styles.container_navigator}>
      <SearchBar />
      <div className={styles.container_btns}>
        <button
          onClick={() => {
            navigate('/')
            props.onPress(false)
          }}
          className={styles.btn_to_nav}
        >
          See active notes
        </button>
        {
          location.pathname === '/' && (
            <button
              onClick={() => {
                props.onPress(true)
              }}
              className={styles.btn_to_nav}
            >
              See archive notes
            </button>
          )
        }
        {
          location.pathname != '/form' && (
            <button
              onClick={() => navigate('/form')}
              className={styles.btn_to_nav}
            >
              Add a note
            </button>
          )
        }
      </div>
    </nav>
  )
}

export default Navigator