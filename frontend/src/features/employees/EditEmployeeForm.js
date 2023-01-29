import { useState, useEffect } from 'react'
import { useUpdateEmployeeMutation, useDeleteEmployeeMutation } from './EmployeesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'

const EditEmployeeForm = ({ employee, users }) => {
  const { isManager, isAdmin } = useAuth()

  const [updateEmployee, { isLoading, isSuccess, isError, error }] = useUpdateEmployeeMutation()

  const [deleteEmployee, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteEmployeeMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(employee.title)
  const [text, setText] = useState(employee.text)
  const [completed, setCompleted] = useState(employee.completed)
  const [userId, setUserId] = useState(employee.user)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/employees')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)
  const onCompletedChanged = (e) => setCompleted((prev) => !prev)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveEmployeeClicked = async (e) => {
    if (canSave) {
      await updateEmployee({ id: employee.id, user: userId, title, text, completed })
    }
  }

  const onDeleteEmployeeClicked = async () => {
    await deleteEmployee({ id: employee.id })
  }

  const created = new Date(employee.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  const updated = new Date(employee.updatedAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validTitleClass = !title ? 'form__input--incomplete' : ''
  const validTextClass = !text ? 'form__input--incomplete' : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  let deleteButton = null
  if (isManager || isAdmin) {
    deleteButton = (
      <button className='icon-button' title='Delete' onClick={onDeleteEmployeeClicked}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    )
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='form__title-row'>
          <h2>Edit Employee #{employee.ticket}</h2>
          <div className='form__action-buttons'>
            <button className='icon-button' title='Save' onClick={onSaveEmployeeClicked} disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label className='form__label' htmlFor='employee-title'>
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id='employee-title'
          name='title'
          type='text'
          autoComplete='off'
          value={title}
          onChange={onTitleChanged}
        />

        <label className='form__label' htmlFor='employee-text'>
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id='employee-text'
          name='text'
          value={text}
          onChange={onTextChanged}
        />
        <div className='form__row'>
          <div className='form__divider'>
            <label className='form__label form__checkbox-container' htmlFor='employee-completed'>
              WORK COMPLETE:
              <input
                className='form__checkbox'
                id='employee-completed'
                name='completed'
                type='checkbox'
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label className='form__label form__checkbox-container' htmlFor='employee-username'>
              ASSIGNED TO:
            </label>
            <select id='employee-username' name='username' className='form__select' value={userId} onChange={onUserIdChanged}>
              {options}
            </select>
          </div>
          <div className='form__divider'>
            <p className='form__created'>
              Created:
              <br />
              {created}
            </p>
            <p className='form__updated'>
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  )

  return content
}

export default EditEmployeeForm
