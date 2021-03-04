import Head from "next/head"

import { CompletedChallenges } from "../components/CompletedChallenges"
import { Countdown } from "../components/Countdown"
import { ChallengeBox } from "../components/ChallengeBox"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"

import styles from "../styles/pages/Home.module.css"
import { CountdownProvider } from "../contexts/CountdownContext"
import { ChallengesProvider } from "../contexts/ChallengesContext"
import { GetServerSideProps } from "next"
import { SignupProvider } from "../contexts/SignupContext"
import { MenuLeft } from "../components/MenuLeft"
import { useEffect } from "react"

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
  name: string
  nickname: string
  urlAvatar: string
}

export default function Home(props: HomeProps) {
  useEffect(() => console.log("home ------ ", props.urlAvatar), [])

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <SignupProvider>
          <MenuLeft />
        </SignupProvider>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <SignupProvider
                name={props.name}
                nickname={props.nickname}
                urlAvatar={props.urlAvatar}
              >
                <Profile />
              </SignupProvider>
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    name,
    nickname,
    urlAvatar,
  } = ctx.req.cookies

  if (!nickname) {
    ctx.res.setHeader("location", `/signup`)
    ctx.res.statusCode = 302
    ctx.res.end()
  }

  console.log("props ----- ", urlAvatar)

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      name: name,
      nickname: nickname,
      urlAvatar: urlAvatar,
    },
  }
}
