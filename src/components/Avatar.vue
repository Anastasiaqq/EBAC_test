<template>
    <div class="account__avatar">
        <img class="account__avatar_image" :src="img" alt="">
        <div class="account__buttons">
            <button class="account__avatar_button account__avatar_change_button" id="change">change avatar</button>
            <button class="account__avatar_button account__avatar_delete_button" id="delete">delete avatar</button>
        </div>
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