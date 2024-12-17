import styles from './login.module.css'
import { useState } from 'react'
import Auth from '../../components/auth/Auth'

const LoginPage = () => {
  const [registerSide, setRegisterSide] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <div className={styles.container_form}>
          <Auth
            onPress={setRegisterSide}
            registerSide={registerSide}
          />
        </div>
      </div>
      <footer className={styles.container_footer}>
        <small>TakeYourNotes © 2024</small>
      </footer>
    </div>
  )
}

export default LoginPage