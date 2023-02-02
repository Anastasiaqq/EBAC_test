<template>
  <div class="account">
   <Avatar />
   <Personal />
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Personal from '@/components/Personal.vue';
export default {
  name: "Account",
  props: {
  },
  components:{
    Avatar,
    Personal
  }
};
</script>
