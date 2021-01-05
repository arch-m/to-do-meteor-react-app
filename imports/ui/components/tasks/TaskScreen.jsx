import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/tasks';
import { useForm } from '../../hooks/useForm';
 

export const TaskScreen = () => {
  const user = useTracker(() => Meteor.user());
  const tasks = useTracker(() => TasksCollection.find({ userId: user._id }, { sort: { createdAt: -1 } }).fetch());
  
  const [formValues, handleInputChange, reset] = useForm({
    description: ''
  });
  const [edit, setEdit] = useState('');
  
  const { description } = formValues;

  const logout = () => Meteor.logout();
  const deleteTask = ({ _id }) => TasksCollection.remove(_id);
  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  const updateTask = ( _id, text ) => {
    TasksCollection.update(_id, {
      $set: {
        text: text
      }
    })
  };

  const editTask = ({ text, _id }) => {
    handleInputChange({ 
      target: {
        name: "description",
        value: text
      }
    });
    setEdit(_id);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!description) {
      setEdit('');
      return;
    }

    if(edit) {
      updateTask(edit, description);
    }
    else {
      TasksCollection.insert({
        text: description.trim(),
        userId: user._id,
        createdAt: new Date()
      });
    }

    setEdit('');
    reset();
  }

  return (
    <>
      <div className="container__todolist">
        <form onSubmit={ handleSubmit }>
          <input 
            type="text"
            name="description"
            className="form-control"
            placeholder="Task..."
            autoComplete="off"
            value={ description }
            onChange={ handleInputChange }
          />
          <button
            type="submit"
            className="btn btn-add"
          >
            { edit ? "Update": "Add" }
          </button>
        </form>
    
        <ul className="animate__animated animate__fadeIn">
          { 
            tasks.map(task => 
              <Task 
                key={ task._id } 
                task={ task } 
                onCheckboxClick={ toggleChecked }
                onDeleteClick={ deleteTask }
                onEditClick={ editTask }
              />
            ) 
          }
        </ul>
      </div>

      <button className="btn" onClick={ logout }>
        Logout
      </button>
    </> 
  );
}