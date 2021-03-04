import { useRouter } from "next/router"

import styles from "../styles/components/MenuLeft.module.css"

export function MenuLeft() {
  const router = useRouter()

  function logout() {
    router.replace("/signup")
  }

  return (
    <div className={styles.menuLeftContainer}>
      <img className={styles.logo} src="/logo-min.svg" alt="Logo Move.it" />

      <div className={styles.menuOptions}>
        <div className={`${styles.menuOption} ${styles.menuOptionActive}`}>
          <img src="/icons/home.svg" alt="Home" />
        </div>
        <div className={styles.menuOption}>
          <img src="/icons/award.svg" alt="Rank" />
        </div>
      </div>

      <img
        onClick={logout}
        className={styles.logout}
        src="/icons/logout.svg"
        alt="Sair"
      />
    </div>
  )
}
