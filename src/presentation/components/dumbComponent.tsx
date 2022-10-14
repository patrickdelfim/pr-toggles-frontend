import React, { useContext } from 'react'
import { ProjectContext } from '../context'
const Dumb: React.FC = () => {
  const project = useContext(ProjectContext)
  return (<div>Dumb element {project?.nome}</div>)
}
export default Dumb
