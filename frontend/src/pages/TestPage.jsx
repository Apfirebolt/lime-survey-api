import { Transition } from '@headlessui/react'
import { useState } from 'react'

function MyComponent() {
  const [isShowing, setIsShowing] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)

  return (
    <>
      <button onClick={() => setSlideNumber((slideNumber) => slideNumber = 1)}>
        Slide 1
      </button>

      <button onClick={() => setSlideNumber((slideNumber) => slideNumber = 0)}>
        Slide 0
      </button>
      <Transition
        show={slideNumber === 1}
        enter="transition-all duration-75"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-5"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 translate-y-5"
        leaveTo="opacity-0 translate-y-0"
      >
        <p className='bg-red-200'>
          James sold something.
        </p>
      </Transition>

      <Transition
        show={slideNumber === 0}
        enter="transition-all duration-75"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-5"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 translate-y-5"
        leaveTo="opacity-0 translate-y-0"
      >
        <p className='bg-red-200'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos minima veritatis rem iure cum in id quod fugit excepturi.
        </p>
      </Transition>
    </>
  )
}

export default MyComponent