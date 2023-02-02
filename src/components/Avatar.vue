<template>
    <div class="account__avatar">
        <img class="account__avatar_image" :src="img" alt="">
        <button class="account__avatar_change_button">change avatar</button>
        <button class="account__avatar_delete_button">delete avatar</button>
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    data() {
        return {
            img: require('../assets/images/avatar.jpg')
        }
    }
}
</script>