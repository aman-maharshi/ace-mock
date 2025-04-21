import { getTechLogos } from '@/lib/utils'
import clsx from 'clsx'
import Image from 'next/image'

const TechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)

  return (
    <div className='flex flex-row'>
      {techIcons.slice(0, 3).map((icon, index) => {
        const { tech, url } = icon

        return (
          <div key={index} className={clsx(
            'relative group bg-gray-600 rounded-full p-2 flex-center',
            index > 0 &&"-ml-3"
          )}>
            <span className='tech-tooltip'>{tech}</span>
            <Image src={url} alt={tech} width={100} height={100} className='size-5' />
          </div>
        )
      })}
    </div>
  )
}

export default TechIcons