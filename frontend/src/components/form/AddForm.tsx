import { useDispatch } from 'react-redux'
import styles from './form.module.css'
import React, { useEffect, useState } from 'react'
import { AppDispatch } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { postNote } from '../../thunks/noteThunks'

const AddForm = () => {
  const [newNote, setNewNote] = useState<{
    title: string,
    content: string,
    archived: boolean,
    categories: any[],
  }>({
    title: "",
    content: "",
    archived: false,
    categories: [],  
  })
  const [errors, setErrors] = useState<{
    title?: string,
    category?: string;
    content?: string
  }>({});
  const [category, setCategory] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    validateField('title', newNote.title);
    validateField('content', newNote.content);
  }, []); 

  const validateField = (name: string, value: string) => {
    let errorMessage = ""
    switch (name) {
      case "title":
        if (!value.trim()) errorMessage = "Title is required"
        break
      case "content":
        if (!value.trim()) errorMessage = "Content is required"
        break
      case "category":
        if (/\s/.test(value)) errorMessage = "Category cannot contain spaces"
        break
      default:
        break
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target

    setNewNote({
      ...newNote,
      [name]: value,
    })
    validateField(name, value)
  }

  const addCategory = () => {
    if (!category.trim()) {
      setErrors({ category: "Category cannot be empty or spaces only" });
      return;
    }
    setNewNote({
      ...newNote,
      categories: [...newNote.categories, category]
    })
    setCategory("")
    setErrors({ ...errors, category: undefined });
  }
  
  const deleteCategory = (categ: string) => {
    const categoriesFiltered = newNote.categories.filter((cat) => cat !== categ)

    setNewNote({
      ...newNote,
      categories: categoriesFiltered,
    })
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
    validateField("category", e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.title || !newNote.content) return
    dispatch(postNote(newNote))
    navigate('/')
  }
 
  return (
    <form
      className={styles.container_details}
      onSubmit={handleSubmit}
    >
      <div className={styles.container_header_details}>
        <input
          type='text'
          name='title'
          placeholder="Type the title's note"
          className={styles.title_note}
          value={newNote.title}
          onChange={handleChange}
        />
        {errors.title && <p className={styles.error_label}>{errors.title}</p>}
      </div>
      <div className={styles.container_body_details}>
        <div className={styles.container_categories}>
          <div className={styles.container_category}>
            <input
              type='text'
              name='category'
              placeholder='Add a category'
              value={category}
              onChange={handleChangeCategory}
              className={styles.input_category}
            />
            <button
              type='button'
              className={styles.btn_add_category}
              onClick={() => addCategory()}
            >
              +
            </button>
            {errors.category && <p className={styles.error_label}>{errors.category}</p>}
          </div>
          {
            newNote.categories.length > 0 && newNote.categories.map((cat) => {
              return (
                <div
                  key={Math.random()}
                  className={styles.category_details}
                >
                  <p className={styles.category_name}>
                    #{cat}
                  </p>
                  <button
                    type='button'
                    onClick={() => deleteCategory(cat)}
                    className={styles.btn_delete_note}
                  >
                    x
                  </button>
                </div>
              )
            })
          }
        </div>
        <div className={styles.container_content}>
          <textarea
            name="content"
            className={styles.input_content}
            value={newNote.content}
            onChange={handleChange}
            placeholder="Type your note"
          />
          {errors.content && <p className={styles.error_label}>{errors.content}</p>}
        </div>
      </div>
      <button
        type='submit'
        className={styles.btn_submit}
        disabled={
          errors.title ||
          errors.category ||
          errors.content ? true : false
        }
      >
        Save
      </button>
    </form>
  )
}

export default AddForm