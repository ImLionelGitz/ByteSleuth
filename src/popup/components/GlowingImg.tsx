import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

interface GlowingImage {
   src: string
   active: boolean
}

export default function GlowingImage({ src, active }: GlowingImage) {
   const glowLevel = useMotionValue(0)

   const shadow = useTransform(
      glowLevel,
      [0, 14],
      ['drop-shadow(0px 0px 0px #6722a3)', 'drop-shadow(0px 0px 14px #6722a3)']
   )

   const opacity = useTransform(glowLevel, [0, 14], [0.01, 1])

   useEffect(() => {
      let controls

      if (active) {
         controls = animate(glowLevel, 14, {
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'circInOut',
         })
      } else {
         controls = animate(glowLevel, 0, { duration: 0.5 })
      }

      return () => controls?.stop()
   }, [active, glowLevel])

   return (
      <motion.img
         src={src}
         style={{ filter: shadow, opacity: opacity, width: '50%' }}
         alt="BitSleuth"
      />
   )
}
