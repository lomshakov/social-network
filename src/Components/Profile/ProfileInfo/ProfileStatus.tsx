import React, {useState, useEffect, ChangeEvent} from 'react'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ status, updateStatus }) => {

    let [editMode, setEditMode] = useState(false)
    let [currentStatus, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(currentStatus)
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
}

export default ProfileStatus