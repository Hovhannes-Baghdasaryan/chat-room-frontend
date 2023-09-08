import { useWindowSize } from '@react-hook/window-size'

const useResponsive = () => {
  const [width] = useWindowSize()

  const isMobile = width < 700

  return { isMobile }
}

export default useResponsive
