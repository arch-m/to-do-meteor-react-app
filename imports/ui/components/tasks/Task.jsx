import React from 'react';
 
export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {
  return (
    <li className="animate__animated animate__pulse animate__faster">
      <button className="btn btn-edit" onClick={ () => onEditClick(task) }>&#9998;</button>
      <span 
        className={`${ task.isChecked && 'complete' }` + ' task'}
        onClick={() => onCheckboxClick(task)}
      >
        {task.text}
      </span>
      <button className="btn btn-delete" onClick={ () => onDeleteClick(task) }>&times;</button>
    </li>
  )
};