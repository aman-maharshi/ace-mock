import Image from "next/image"

import { cn, getTechLogos } from "@/lib/utils"

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn("relative group bg-light-100 dark:bg-dark-300 rounded-full mx-1 p-2 flex flex-center")}
        >
          <span className="tech-tooltip text-sm mr-2">{tech}</span>

          <Image src={url} alt={tech} width={100} height={100} className="size-5" />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons
