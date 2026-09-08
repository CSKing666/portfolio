import { projects } from '../portfolio'
import ProjectCard from './ProjectCard'

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id='projects' className='section'>
      <span className='section-kicker'>Work</span>
      <h2 className='section-title'>Projects</h2>

      {/* Two columns until xl, then all four in a row — a 3-column step would
          leave a single stranded card on 1024-1279px screens. */}
      <div className='mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
