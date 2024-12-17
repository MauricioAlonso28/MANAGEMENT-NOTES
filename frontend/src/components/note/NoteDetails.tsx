import { Note } from '../../types/Note'
import styles from './noteDetails.module.css'
import upArrow from '../../assets/up-arrow.svg'
import { useEffect, useState } from 'react'
import options from '../../assets/three-dots-vertical.svg'
import { format } from 'date-fns'
import Options from './Options'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { getNoteById, updateCategoriesFromNote } from '../../thunks/noteThunks'

type Props = {
  note: Note
  setNoteId: Function
  noteId: number
}

const NoteDetails = (props: Props) => {
  const [noteDetailsDiv, setNoteDetailsDiv] = useState(false)
  const [optOpened, setOptOpened] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  
  const changeDate = (date: string) => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, "yyyy-MM-dd HH:mm:ss")

    return formattedDate
  }

  const openDetails = () => {
    setNoteDetailsDiv(!noteDetailsDiv)
    props.setNoteId(props.note.id)
  }

  const updateCategory = (category: string) => {
    dispatch(updateCategoriesFromNote({
      id: props.note.id,
      category: category
    }))
  }

  const openOptions = () => {
    setOptOpened(!optOpened)
    props.setNoteId(props.note.id)
    dispatch(getNoteById(props.note.id))
  }

  useEffect(() => {
    if (props.note.id != props.noteId) { 
      setNoteDetailsDiv(false)
      setOptOpened(false)
    }
  }, [props.noteId])
  

  return (
    <div className={styles.container_details}>
      <div
        className={
          noteDetailsDiv && props.noteId === props.note.id
            ? styles.container_header_details_off
            : styles.container_header_details_on
        }
      >
        <h3 className={styles.title}>
          {props.note.title}
        </h3>
        <div className={styles.container_buttons}>
          <button
            className={styles.btn_img}
            onClick={() => openDetails()}
          >
            <img
              className={
                noteDetailsDiv && props.noteId === props.note.id
                  ? styles.img_down_arrow
                  : styles.img_up_arrow
              }
              src={upArrow}
              alt='Up Arrow'
            />
          </button>
          <button
            className={styles.btn_img}
            onClick={() => openOptions()}
          >
            <img src={options} alt="Options"/>
          </button>
          <div
            className={ 
              props.note.archived 
                ? styles.archived
                : styles.not_archived
            }
            data-tooltip={
              props.note.archived
                ? "Archived"
                : "Active"
            }
          >
          </div>
          {
            optOpened && props.noteId === props.note.id &&(
              <Options/>
            )
          }
        </div>
      </div>
      {
        noteDetailsDiv && props.noteId === props.note.id &&(
          <div className={styles.container_body_details}>
            <div
              className={
                props.note.categories.length > 0
                  ? styles.container_categories
                  : ""
              }
            >
              {
                props.note.categories.length > 0 && props.note.categories.map(cat => {
                  return (
                    <div
                      key={cat.id}
                      className={styles.category_details}
                    >
                      <p className={styles.category_name}>
                        #{cat.name}
                      </p>
                      <button
                        onClick={() => updateCategory(cat.name)}
                        className={styles.btn_delete_note}
                      >
                        x
                      </button>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles.container_details_body}>
              <div className={styles.container_content}>
                <p className={styles.content}>
                  {props.note.content}
                </p>
              </div>
              <p className={styles.date}>
                Posted on {changeDate(props.note.createdAt)}
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default NoteDetails