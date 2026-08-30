import { projects } from '../portfolio'
import ProjectCard from './ProjectCard'

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id='projects' className='section'>
      <span className='section-kicker'>Work</span>
      <h2 className='section-title'>Projects</h2>

      <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
