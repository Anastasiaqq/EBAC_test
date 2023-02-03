<template>
  <div class="account">
   <Avatar />
   <div class="options">
    <div class="buttons">
      <button class="account__tablets" :class="showPersonal? 'open' : ''" @click="openPersonal">Personal</button> 
      <button class="account__tablets" :class="showPassword? 'open' : ''" @click="openPasswords">Passwords</button>
    </div>
    <Personal v-show="showPersonal"/>
    <Passwords v-show="showPassword" />
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Personal from '@/components/Personal.vue';
import Passwords from './Passwords.vue';
export default {
  name: "Account",
  data() {
    return{
      showPersonal: true,
      showPassword: false
    }
  },
  methods: {
    openPersonal() {
      this.showPersonal = true;
      this.showPassword = false;
    },
    openPasswords() {
      this.showPersonal = false;
      this.showPassword = true;
    }
  },
  components:{
    Avatar,
    Personal,
    Passwords
  }
};
</script>
