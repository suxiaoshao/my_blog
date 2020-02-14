<template>
  <div id="read"></div>
</template>
<script>
export default {
  name: "read",
  methods: {
    post_info() {
      this.axios
        .post("http://192.168.0.103:5000/api/novel/content", {
          tag: "novel-bl",
          data: {
            aid: 88375,
            cid: 11688186
          }
        })
        .then(response => {
          if (response.data.status === 1) {
            console.log(
              this.secret(response.data.data, response.data.key, true)
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    secret(a, b, c) {
      b = this.CryptoJS.MD5(b).toString();
      var d = this.CryptoJS.enc.Utf8.parse(b.substring(0, 16));
      var e = this.CryptoJS.enc.Utf8.parse(b.substring(16));
      if (c) {
        return this.CryptoJS.AES.decrypt(a, e, {
          iv: d,
          padding: this.CryptoJS.pad.Pkcs7
        }).toString(this.CryptoJS.enc.Utf8);
      }
      return this.CryptoJS.AES.encrypt(a, e, {
        iv: d,
        mode: this.CryptoJS.mode.CBC,
        padding: this.CryptoJS.pad.Pkcs7
      }).toString();
    }
  }
};
</script>
<style scoped>
</style>