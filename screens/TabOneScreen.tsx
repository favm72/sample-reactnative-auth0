import { Button, StyleSheet } from "react-native"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"
import { RootTabScreenProps } from "../types"
import Auth0 from "react-native-auth0"
import { useState } from "react"

const auth0 = new Auth0({
  domain: "favm72.us.auth0.com",
  clientId: "fEUr58TKhkwh6DirOe7Rgj3Fn7ZbDRgT",
})

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [token, setToken] = useState<string>("")
  const handleCreate = async () => {
    try {
      const res = await auth0.auth.createUser({
        email: "favm72@gmail.com",
        password: "Aabc1234",
        connection: "Username-Password-Authentication",
        metadata: {},
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    //.authorize({ scope: "openid profile email" })
  }

  const handleLogin = async () => {
    try {
      const res = await auth0.webAuth.authorize({
        scope: "openid profile email",
      })
      alert("Login Success")
      setToken(res.accessToken)
    } catch (error) {
      console.log(error)
      alert("Login Failed")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Button title="Register" onPress={handleCreate}></Button>
      <Button title="Login" onPress={handleLogin}></Button>
      <Text style={styles.title}>{token}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
