import React, { FC } from 'react'
import ProjectCard from './ProjectCard'

type Props = {
    list: Project[]
}

const ProjectCardList: FC<Props> = ({list}) => {
  return (
    <div className='card-group'>
        {list.map(item => <ProjectCard project={item} />)}
    </div>
  )
}

export default ProjectCardList