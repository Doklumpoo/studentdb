<template>
  <div>
    <v-btn color="info" class="mr-4" @click="loginGoogle"> Google </v-btn>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  methods: {
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          // The signed-in user info.
          const user = result.user
          // ...
          console.log('token : ' + token)
          // print or นำมาใช้งาน
          console.log('user : ' + user)
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential
          // ...
          console.log('errorCode= ' + errorCode)
          console.log('errorMessage= ' + errorMessage)
          console.log('email= ' + email)
          console.log('credential' + credential)
        })
    },
  },
}
</script>

<style></style>
