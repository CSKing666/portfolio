import { about } from '../portfolio'

const asset = (file) => `${import.meta.env.BASE_URL}${file}`

const About = () => {
  const { name, role, description, resume, social, picture } = about

  return (
    <section className='pt-12 sm:pt-16 lg:pt-24'>
      <div className='flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between lg:gap-16'>
        <div className='flex-1 text-center lg:text-left'>
          {role && <span className='section-kicker lg:text-left'>{role}</span>}

          {name && (
            <h1 className='text-[clamp(2rem,7vw,3.5rem)] font-700 leading-[1.1] tracking-tight text-fg-strong'>
              Hi, I am <span className='text-primary'>{name}</span>.
            </h1>
          )}

          {description && (
            <p className='mt-5 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-fg-muted leading-relaxed'>
              {description}
            </p>
          )}

          <div className='mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3'>
            {resume && (
              <a
                href={asset(resume)}
                target='_blank'
                rel='noreferrer'
                className='btn-primary'
              >
                <span className='i-lucide-file-text' aria-hidden='true' />
                Resume
              </a>
            )}

            {social?.github && (
              <a
                href={social.github}
                target='_blank'
                rel='noreferrer'
                className='icon-btn'
                aria-label='GitHub profile'
              >
                <span className='i-simple-icons-github' aria-hidden='true' />
              </a>
            )}

            {social?.linkedin && (
              <a
                href={social.linkedin}
                target='_blank'
                rel='noreferrer'
                className='icon-btn'
                aria-label='LinkedIn profile'
              >
                <span className='i-simple-icons-linkedin' aria-hidden='true' />
              </a>
            )}
          </div>
        </div>

        {picture && (
          <div className='relative shrink-0'>
            <div
              className='absolute -inset-4 rounded-full bg-primary-soft blur-2xl'
              aria-hidden='true'
            />
            <img
              src={picture.startsWith('http') ? picture : asset(`images/${picture}`)}
              alt={name}
              width='256'
              height='256'
              className='relative w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-surface shadow-lift'
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default About
