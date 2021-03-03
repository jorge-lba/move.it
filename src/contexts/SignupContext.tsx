import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

interface SignupContextData {
  nickname: string
  name: string
  urlAvatar: string
  handleNickname: (nickname: string) => void
  handleName: (name: string) => void
  handleUrlAvatar: (urlAvatar: string) => void
}

export const SignupContext = createContext({} as SignupContextData)

export function SignupProvider({ children, ...rest }) {
  const [nickname, setNickname] = useState(rest.nickname ?? "")
  const [name, setName] = useState(rest.name ?? "")
  const [urlAvatar, setUrlAvatar] = useState(rest.urlAvatar ?? "")

  useEffect(() => {
    Cookies.set("name", String(name))
    Cookies.set("nickname", String(nickname))
    Cookies.set("urlAvatar", String(urlAvatar))
  }, [name, nickname, urlAvatar])

  function handleNickname(nickname: string) {
    setNickname(nickname)
  }

  function handleName(name: string) {
    setName(name)
  }

  function handleUrlAvatar(urlAvatar: string) {
    setUrlAvatar(urlAvatar)
  }

  return (
    <SignupContext.Provider
      value={{
        nickname,
        name,
        urlAvatar,
        handleNickname,
        handleName,
        handleUrlAvatar,
      }}
    >
      {children}
    </SignupContext.Provider>
  )
}
