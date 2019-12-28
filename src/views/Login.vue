<template>
  <div class="login">
    <h1>Login</h1>
    <google-login-button :params="params" :onSuccess="onSuccess" :onFailure="onFailure">
      Login to sync
    </google-login-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import GoogleLogin from 'vue-google-login';

  export default Vue.extend({
    name: 'home',
    data: () => ({
      params: {
        client_id: '114658064169-brod20aj04tqmtpnknfv1u6vn1umr7tk.apps.googleusercontent.com'
      }
    }),
    components: {
      'google-login-button': GoogleLogin
    },
    methods: {
      onSuccess(googleUser: any) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      },
      onFailure(data: any) {
        console.error('Sign in failed', data)
      }
    }
  });
</script>