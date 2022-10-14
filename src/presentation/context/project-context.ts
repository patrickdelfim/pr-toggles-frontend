import { ProjectModel } from '@/domain/models'
import { createContext } from 'react'

export const ProjectContext = createContext<ProjectModel>(null)
