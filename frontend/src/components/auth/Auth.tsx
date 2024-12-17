import styles from './auth.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { signIn, signUp } from '../../thunks/userThunks'

type Props = {
  onPress: Function,
  registerSide: boolean
}

const Auth = (props: Props) => {
  const [newUser, setNewUser] = useState<{
    email: string
    password: string
  }>({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: ""
  })

  const validate = (name: string, value: string) => {
    let errorMessage = ""
    
    switch (name) {
      case "email":
        if (!value.trim()) errorMessage = "Title is required"
        break
      case "password":
        if (!value.trim()) errorMessage = "Content is required"
        break
      default:
        break
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }))
  }

  const dispatch = useDispatch<AppDispatch>()

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    
    
    setNewUser({
      ...newUser,
      [name]: value
    })
    
    validate(name, value)
  }
  
  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (props.registerSide) {
      dispatch(signUp(newUser))
    } else if (!props.registerSide) {
      dispatch(signIn(newUser))
    }
    setTimeout(() => {
      window.location.reload()
    }, 200)
  } 

  return (
    <form
      className={styles.form_container}
      onSubmit={onHandleSubmit}
    >
      <div className={styles.container_btn_header}>
        <div className={styles.input_container}>
          <input
            type="email"
            name='email'
            placeholder='Email'
            className={styles.input_auth}
            value={newUser.email}
            onChange={onHandleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.input_container}>
          <input
            type="password"
            name='password'
            placeholder='password'
            className={styles.input_auth}
            value={newUser.password}
            onChange={onHandleChange}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
      </div>
      {
        props.registerSide ? (
          <div className={styles.container_btn_body}>    
            <button
              className={styles.link_login}
              type='submit'
              disabled={
                !newUser.email || !newUser.password
              }
            >
              Create Account
            </button>
            <hr />
            <button
              type='button'
              className={styles.link_register}
              onClick={() => props.onPress(false)}
            >
              Have an account? Sing In
            </button>
          </div>
        ) : (
            <div className={styles.container_btn_body}>    
              <button
                type='submit'
                className={styles.link_login}
                disabled={
                  !newUser.email || !newUser.password
                }
              >
                Sign In
              </button>
              <hr />
              <button
                className={styles.link_register}
                type='button'
                onClick={() => props.onPress(true)}
              >
                Create Account
              </button>
            </div>
        )
      }
    </form>
  )
}

export default Auth