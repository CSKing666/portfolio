import { contact } from '../portfolio'

const Contact = () => {
  if (!contact.email) return null

  return (
    <section id='contact' className='section'>
      <div className='mx-auto max-w-2xl rounded-3xl bg-surface border border-line shadow-card px-6 py-12 sm:px-12 text-center'>
        <span className='section-kicker'>Contact</span>
        <h2 className='section-title'>Let us work together</h2>

        <p className='mt-4 text-fg-muted'>
          Open to Java full stack roles and interesting side projects.
        </p>

        <a href={`mailto:${contact.email}`} className='btn-primary mt-8'>
          <span className='i-lucide-mail' aria-hidden='true' />
          Email me
        </a>

        <p className='mt-4 text-sm text-fg-muted break-words'>{contact.email}</p>
      </div>
    </section>
  )
}

export default Contact
