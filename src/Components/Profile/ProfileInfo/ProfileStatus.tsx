import React, {useState, useEffect, ChangeEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getStatusSelector} from '../../../Redux/profile-selectors'
import {updateStatus} from '../../../Redux/profile-reducer'

export const ProfileStatus: React.FC = React.memo(() => {

    const status = useSelector(getStatusSelector)
    let [editMode, setEditMode] = useState(false)
    let [currentStatus, setStatus] = useState(status)
    const dispatch = useDispatch()

    useEffect(() => {
        setStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(currentStatus))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode
                    ? <span onDoubleClick={activateEditMode}>{status}</span>
                    : <input onBlur={deactivateEditMode}
                             onChange={onStatusChange}
                             autoFocus={true}
                             value={currentStatus} />
            }
        </div>
    )
})