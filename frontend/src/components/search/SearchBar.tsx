import { useState } from 'react'
import styles from './searchBar.module.css'
import magnifyingGlass from '../../assets/loupe.png'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { getCategory, getNotesByCategory } from '../../thunks/noteThunks'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [category, setCategory] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const searchCategory = () => {
    dispatch(getNotesByCategory(category))
    dispatch(getCategory(category))
    setCategory("")
    navigate('/allNotes')
  }

  return (
    <div className={styles.container_input}>
      <input
        type='search'
        value={category}
        onChange={onHandleChange}
        className={styles.search_input}
        placeholder="Search by category"
      />
      <button
        className={styles.btn_searchbar}
        onClick={() => searchCategory()}
      >
        <img
          className={styles.img_searchbar}
          src={magnifyingGlass}
          alt='searchbar'
        />
      </button>
    </div>
  )
}

export default SearchBar