import React from 'react'
import TableComponentDetails from './TableComponentdetails'
import TableComponentSteps from './TableComponentSteps'
import '../component_style/viewexercise_style.css'

function ViewExercise(props) {
    
  return (
    <div className='exercise-container'>
        <div className='image-description-container'>
            <h1 className='exercise-name'>{props.data.name}</h1>
            <img src={`/${props.data.mainImage}`} alt={props.data.name} className='exercise-image1'/>
        </div>
        <div className='table-container'>
          <TableComponentDetails type={props.data.type} difficulty={props.data.difficulty} equipment={props.data.equipment}/>
          <TableComponentSteps tableData={props.data.steps}/>
        </div>
    </div>
  )
}

export default ViewExercise;