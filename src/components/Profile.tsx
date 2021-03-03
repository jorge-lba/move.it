import { useContext } from "react"

import { ChallengesContext } from "../contexts/ChallengesContext"
import { SignupContext } from "../contexts/SignupContext"

import styles from "../styles/components/Profile.module.css"

export function Profile() {
  const { level } = useContext(ChallengesContext)
  const { nickname, name, urlAvatar } = useContext(SignupContext)

  return (
    <div className={styles.profileContainer}>
      <img src={urlAvatar} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}
