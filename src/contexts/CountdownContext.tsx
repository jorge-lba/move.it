import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { ChallengesContext } from "./ChallengesContext"

interface CountdownContextData {
  time: number
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)
  const initialTime = 0.1

  const minutesToSeconds = (minutes) => minutes * 60

  const [time, setTime] = useState(minutesToSeconds(initialTime))
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(minutesToSeconds(initialTime))
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      startNewChallenge()
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        time,
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
