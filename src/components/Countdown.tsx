import { useContext, useEffect, useState } from "react"
import { CountdownContext } from "../contexts/CountdownContext"
import styles from "../styles/components/Countdown.module.css"

export function Countdown() {
  const {
    time,
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")
  const [timePercentage, setTimePercentage] = useState("0")
  const [initialTime, setInitialTime] = useState(time)

  useEffect(() => {
    const currentTime = initialTime - time
    const percent = ((currentTime * 100) / initialTime).toFixed(2)
    setTimePercentage(percent)
  }, [time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <img src="icons/check_circle.svg" alt="Check" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive} ${styles.countdownButtonActiveStop}`}
              onClick={resetCountdown}
              style={{
                backgroundImage: `linear-gradient(white, white),
                linear-gradient(90deg, #4cd62b ${timePercentage}% ,#dcdde0 ${timePercentage}% ,#dcdde0 100%)`,
                backgroundClip: "content-box, border-box",
              }}
            >
              Abandonar um ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}
