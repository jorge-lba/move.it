import { useContext } from "react"
import { useRouter } from "next/router"
import axios from "axios"

import { SignupContext } from "../contexts/SignupContext"

import styles from "../styles/pages/Signup.module.css"

export function FormSignup() {
  const router = useRouter()

  const { nickname, handleNickname, handleName, handleUrlAvatar } = useContext(
    SignupContext,
  )

  async function handleSignup(event) {
    event.preventDefault()
    const user = await axios.get(`https://api.github.com/users/${nickname}`)

    handleName(user.data.name)
    handleUrlAvatar(String(user.data.avatar_url))

    router.push("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoLarge}>
        <img src="/logo-large.svg" alt="Logo Image" />
      </div>
      <div className={styles.content}>
        <img src="/logo-text.svg" alt="Logo-tipo" />
        <div className={styles.initialSignup}>
          <h1>Bem-vindo</h1>
          <div className={styles.githubSignup}>
            <img src="/github.svg" alt="Github" />
            <span>Faça login com seu nick Github para começar</span>
          </div>
          <form
            action="signup"
            className={styles.formSignup}
            onSubmit={handleSignup}
          >
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Digite seu username"
              onChange={(event) => handleNickname(event.target.value)}
            />
            <button type="submit">
              <img src="/icons/right-arrow.svg" alt="Entrar" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
