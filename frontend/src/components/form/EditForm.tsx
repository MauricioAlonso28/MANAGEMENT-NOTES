import { useEffect, useState } from 'react'
import { Note } from '../../types/Note'
import styles from './form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { updateNote } from '../../thunks/noteThunks'
import { format } from 'date-fns'

type Props = {
  noteDetails: Note
}

let countId = 1

const EditForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [editedNote, setEditedNote] = useState<any>(props.noteDetails)
  const [errors, setErrors] = useState<{
    title?: string,
    category?: string;
    content?: string
  }>({});
  const [category, setCategory] = useState<string>("")

  const { categories } = useSelector((state: RootState) => state.categoryState)
  const navigate = useNavigate()

  useEffect(() => {
    validateField('title', editedNote.title);
    validateField('content', editedNote.content);
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

    setEditedNote({
      ...editedNote,
      [name]: value,
    })
    validateField(name, value)
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
    validateField("category", e.target.value)
  }

  const addCategory = () => {
    if (!category.trim()) {
      setErrors({ category: "Category cannot be empty or spaces only" });
      return;
    }

    const newCat = {
      id: categories.length === 0 ? countId : categories.length + countId,
      name: category.trim(),
    }

    countId++
    

    setEditedNote({
      ...editedNote,
      categories: [
        ...editedNote.categories,
        newCat,
      ],
    })
    setCategory("")
    setErrors({ ...errors, category: undefined });
  }

  const deleteCategory = (category: number) => {
    const categoriesFiltered = editedNote.categories.filter((cat: any) => cat.id !== category)
    
    countId--

    setEditedNote({
      ...editedNote,
      categories: categoriesFiltered,
    })
  }

  const changeDate = (date: string) => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, "yyyy-MM-dd HH:mm:ss")

    return formattedDate
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editedNote.title || !editedNote.content) return
   
    dispatch(updateNote({
      id: props.noteDetails.id,
      note: editedNote
    }))
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
          value={editedNote.title}
          onChange={handleChange}
        />
        <div
          className={ 
            editedNote.archived 
              ? styles.archived
              : styles.not_archived
          }
          data-tooltip={
            editedNote.archived
              ? "Archived"
              : "Active"
          }
        ></div>
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
            editedNote.categories && editedNote.categories.length > 0 && editedNote.categories.map((cat: any) => {
              return (
                <div
                  key={Math.random()}
                  className={styles.category_details}
                >
                  <p className={styles.category_name}>
                    #{cat.name}
                  </p>
                  <button
                    type='button'
                    onClick={() => deleteCategory(cat.id)}
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
            value={editedNote.content}
            onChange={handleChange}
            placeholder="Type your note"
          />
          <p className={styles.date}>
            Posted on {changeDate(editedNote.createdAt)}
          </p>
          {errors.content && <p className={styles.error_label}>{errors.content}</p>}
        </div>
      </div>
      <div className={styles.container_btn_submits}>
        <button
          type='submit'
          className={styles.btn_submit_done}
          disabled={
            errors.title ||
            errors.category ||
            errors.content ? true : false
          }
        >
          Save
        </button>
        <button
          type='button'
          onClick={() => navigate("/")}
          className={styles.btn_submit_cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditForm