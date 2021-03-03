import { SignupProvider } from "../contexts/SignupContext"
import { FormSignup } from "../components/FormSignup"

export default function Signup() {
  return (
    <SignupProvider>
      <FormSignup />
    </SignupProvider>
  )
}
