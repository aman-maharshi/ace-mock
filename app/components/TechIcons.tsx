import { getTechLogos } from "@/lib/utils"
import clsx from "clsx"
import Image from "next/image"

const TechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)

  return (
    <div className="flex flex-row gap-2">
      {techIcons.slice(0, 3).map((icon, index) => {
        const { tech, url } = icon

        return (
          <div
            key={index}
            className="relative group/tech bg-gray-200 dark:bg-gray-700 rounded-full p-2 flex-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="absolute bottom-full mb-1 hidden group-hover/tech:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md z-10">
              {tech}
            </span>
            <Image src={url} alt={tech} width={100} height={100} className="size-5" />
          </div>
        )
      })}
    </div>
  )
}

export default TechIcons
