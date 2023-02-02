<template>
    <div class="container">
        <img class="settings__img cWidth" src="img/triangle.svg" alt="\/">
        <div class="settings__input-element select" name="cWidth" id="cWidth" @click="containerClickHandler">{{ text }}</div>
        <div class="dropdown" v-if="dropdownOpen">
            <div v-for="option in localOptions" :key="option.id" class="option">
                <input v-model="option.checked" type="checkbox" name="" id="">
                <p>{{ option.v }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SelectMultiple',
    props: {
        text: {
            type: String,
            default: 'Select something'
        },
        options: {
            default: [{id:0, v:'0', checked: false}, {id:1, v:'1', checked: false}]
        }
    },
    data() {
        return {
            localOptions: this.options,
            dropdownOpen: false
        }
    },
    methods: {
        containerClickHandler() {
            this.dropdownOpen = !this.dropdownOpen
        }
    }
}
</script>