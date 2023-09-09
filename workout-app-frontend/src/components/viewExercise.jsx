import React from 'react'
import TableComponentDetails from './TableComponentdetails'
import TableComponentSteps from './TableComponentSteps'
import '../component_style/viewexercise_style.css'

function ViewExercise(props) {
    
  return (
    <div className='exercise-container'>
        <div className='image-description-container'>
            <h1>{props.data.name}</h1>
            <img src='https://fitnessprogramer.com/wp-content/uploads/2023/02/warm-up-exercises.png' alt='Exercise' className='exercise-image'/>
        </div>
        <TableComponentDetails type={props.data.type} difficulty={props.data.difficulty} equipment={props.data.equipment}/>
        <TableComponentSteps tableData={props.data.steps}/>
    </div>
  )
}

export default ViewExercise;