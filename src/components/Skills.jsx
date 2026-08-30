import { skills } from '../portfolio'

const Skills = () => {
  if (!skills.length) return null

  return (
    <section id='skills' className='section'>
      <span className='section-kicker'>Toolbox</span>
      <h2 className='section-title'>Skills</h2>

      <ul className='mt-10 mx-auto max-w-3xl flex flex-wrap justify-center gap-3'>
        {skills.map((skill) => (
          <li
            key={skill}
            className='rounded-xl bg-surface border border-line shadow-card px-4 py-2 text-sm font-500 text-fg-strong transition-all duration-200 hover:(-translate-y-1 border-primary text-primary)'
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
