import { header } from '../portfolio'
import Navbar from './Navbar'

const Header = () => {
  const { homepage, title } = header

  return (
    <header className='sticky top-0 z-40 border-b border-line bg-[var(--header-blur)] backdrop-blur-xl'>
      <div className='shell flex items-center justify-between h-16 sm:h-20'>
        {homepage ? (
          <a
            href={homepage}
            className='text-lg sm:text-xl font-700 tracking-tight text-fg-strong transition-colors hover:text-primary'
          >
            {title}
          </a>
        ) : (
          <span className='text-lg sm:text-xl font-700 tracking-tight text-fg-strong'>
            {title}
          </span>
        )}

        <Navbar />
      </div>
    </header>
  )
}

export default Header
