<template>
  <div>
    <v-form ref="form">
      ชื่อ รหัส วันเกิด ที่อยู่ หมายเลข รูปภาพ ปุ่ม
      <v-text-field
        v-model="name"
        :counter="50"
        :rules="nameRules"
        label="ชื่อ-สกุล"
        class="ma-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="stuID"
        label="รหัส"
        class="ma-3"
        required
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="date"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>
      <v-text-field
        v-model="ad"
        label="ที่อยู่"
        class="ma-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="numphone"
        label="หมายเลขโทรศัพท์"
        class="ma-3"
        required
      ></v-text-field>
      <v-file-input
        v-model="fileimage"
        show-size=""
        label="File input"
      ></v-file-input>
      <div class="row md-5">
        <v-btn color="#F4D03F" class="mr-4" @click="yes"> submit </v-btn>
        <v-btn color="#F4D03F" class="mr-4" @click="no"> cancel </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import 'firebase/app'
import 'firebase/storage'
export default {
  data() {
    return {
      name: '',
      stuID: '',
      date: '',
      ad: '',
      numphone: '',
      fileimage: null,
    }
  },
  methods: {
    data() {
      const file = this.fileImage
      const storageRef = firebase.storage().ref()
      const metadata = {
        contentType: 'image/jpeg',
      }
      // Upload file and metadata to the object 'images/ชื่อรูปภาพที่ผู้ใช้เลือกมา'
      const uploadTask = storageRef
        .child('images/' + file.name)
        .put(file, metadata)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          switch(error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL)
          })
        }
      )
    },
    // methods
    listFile() {
      const storageRef = firebase.storage().ref()
      // Create a reference under which you want to list
      const listRef = storageRef.child('images/')
      // Find all the prefixes and items.
      listRef
        .listAll()
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
          })
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            itemRef.getDownloadURL().then((url) => {
              console.log('url = ' + url)
            })
          })
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error)
        })
    },
  },
  yes() {
    this.$refs.form.yes()
  },
  no() {
    this.$refs.form.no()
  },
}
</script>
<style></style>
