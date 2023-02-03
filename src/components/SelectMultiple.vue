<template>
    <div class="container">
        <div class="account__personal_input select" name="cWidth" id="cWidth" @click="containerClickHandler">{{ text }}</div>
        <div class="dropdown" v-if="dropdownOpen">
            <div v-for="option in localOptions" :key="option.id" class="option" @click="selectHandler(option.id)">
                <label class="label" :for="option.id">{{ option.v }}</label>
                <input class="checkbox" v-model="option.checked" type="checkbox" name="" :id="option.id">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SelectMultiple',
    props: {
        selected: [],
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
        },
        selectHandler(id) {
            this.localOptions[id].checked = !this.localOptions[id].checked;
            this.$emit('change', this.localOptions[id]);
        }
    },
    computed: {
        text() {
            let txt = '';
            this.selected.forEach(s => txt += s + '  ');
            return txt;
        }
    }
}
</script>