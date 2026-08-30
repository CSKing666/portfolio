import PropTypes from 'prop-types'

const asset = (file) => `${import.meta.env.BASE_URL}${file}`

const ProjectCard = ({ project }) => {
  const { name, description, stack, image, sourceCode, livePreview } = project

  return (
    <article className='card group'>
      <div className='aspect-video grid place-items-center overflow-hidden bg-surface-2 border-b border-line'>
        {image ? (
          // object-contain, not cover: project images range from wide logos to
          // full screenshots, and cropping either one loses the subject.
          <img
            src={image.startsWith('http') ? image : asset(`images/${image}`)}
            alt=''
            loading='lazy'
            className='w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105'
          />
        ) : (
          <span
            className='text-4xl font-700 text-primary opacity-60'
            aria-hidden='true'
          >
            {name.charAt(0)}
          </span>
        )}
      </div>

      <div className='flex flex-col flex-1 p-6'>
        <h3 className='text-lg font-600 tracking-tight text-fg-strong'>{name}</h3>

        {description && (
          <p className='mt-2 flex-1 text-sm leading-relaxed text-fg-muted'>
            {description}
          </p>
        )}

        {stack?.length > 0 && (
          <ul className='mt-4 flex flex-wrap gap-2'>
            {stack.map((item) => (
              <li key={item} className='chip'>
                {item}
              </li>
            ))}
          </ul>
        )}

        {(sourceCode || livePreview) && (
          <div className='mt-5 pt-4 border-t border-line flex items-center gap-1'>
            {sourceCode && (
              <a
                href={sourceCode}
                target='_blank'
                rel='noreferrer'
                className='icon-btn'
                aria-label={`${name} source code`}
              >
                <span className='i-simple-icons-github' aria-hidden='true' />
              </a>
            )}

            {livePreview && (
              <a
                href={livePreview}
                target='_blank'
                rel='noreferrer'
                className='icon-btn'
                aria-label={`${name} live preview`}
              >
                <span className='i-lucide-external-link' aria-hidden='true' />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stack: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    sourceCode: PropTypes.string,
    livePreview: PropTypes.string,
  }).isRequired,
}

export default ProjectCard
