<template>
    <div div="account__personal">
        <form action="/">
            <div class="account__field-group">
                <label class="account__label" for="name">Your name<strong>*</strong></label>
                <ValidationProvider class="validation-prov" name="fio" rules="required">
                <div slot-scope="{ errors }">
                    <input class="account__personal_input" id="name" type="text" v-model="fio" placeholder="Name Surname" autofocus>
                    <p>{{ errors[0] }}</p>
                </div>
            </ValidationProvider>
            </div>
            
            <div class="account__field-group">
                <label class="account__label" for="birthdate">Birth date</label>
                <input id="birthdate" class="account__personal_input" type="text" data-format="**-**-****" data-mask="MM-DD-YYYY" v-model="date" name="" >
            </div>
            
            <div class="account__field-group">
                <label class="account__label" for="email">Email<strong>*</strong></label>
                <ValidationProvider class="validation-prov" name="email" rules="required|email">
                <div slot-scope="{ errors }">
                    <input id="email" class="account__personal_input" v-model="email" placeholder="example@mail.com">
                    <p>{{ errors[0] }}</p>
                </div>
            </ValidationProvider>
            </div>
            
            <div class="account__field-group">
                <label class="account__label" for="mycity">City</label>
                <ValidationProvider class="validation-prov" name="city" :rules="{ regex: /^[A-Za-z]$/ }">
                <div slot-scope="{ errors }">
                    <input id="mycity" class="account__personal_input" v-model="city" type="text" placeholder="Washington DC">
                    <p>{{ errors[0] }}</p>
                </div>
            </ValidationProvider>
            </div>
            
            <div class="account__field-group">
                <label class="account__label" for="myphone">Phone</label>
                <ValidationProvider class="validation-prov" name="phone" :rules="{ regex: /^\+/ }">
                <div slot-scope="{ errors }">
                    <select @change="e => selectCountryHandler(e)">
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.v }}</option>
                    </select>
                    <input id="myphone" class="account__personal_input account__select" v-model="phone" :data-format="masks[selectedCountry].format" :data-mask="masks[selectedCountry].mask" type="text">
                    <p>{{ errors[0] }}</p>
                </div>
            </ValidationProvider>
            </div>
            
            <div class="account__field-group">
                <label class="account__label" for="languages">Languages</label>
                <SelectMultiple id="languages" :options="langs" :selected="selectedLangs" @change="v => selectedLanguageHandler(v)"/>
            </div>
            
        </form>
    </div>
</template>
<script>
import { extend } from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';
import SelectMultiple from '@/components/SelectMultiple.vue'

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});
extend('regex', {
    ...regex,
    message: 'invalid format'
})


export default {
    name: 'Personal',
    data() {
        return {
            email: '',
            fio: '',
            date: '',
            city: '',
            phone: '',
            langs: [{id:0, v:'Russian', checked: false}, {id:1, v:'English', checked: false}, {id:2, v: 'Spanish', checked:false}, {id:3, v:'Portugese', checked:false}],
            selectedLangs: [],
            countries: [{id:0, v:'Russia', code: '+7'}, {id:1, v:'Argentina', code: '+54'}],
            selectedCountry: 0,
            masks: [{id: 0, format: '(***)***-****',mask: '(###)###-####' }, {id: 1, format: '(***)****-****',mask: '(###)####-####' }]
        }
    },
    mounted() {
        function doFormat(x, pattern, mask) {
        var strippedValue = x.replace(/[^0-9]/g, "");
        var chars = strippedValue.split('');
        var count = 0;

        var formatted = '';
        for (var i=0; i<pattern.length; i++) {
            const c = pattern[i];
            if (chars[count]) {
            if (/\*/.test(c)) {
                formatted += chars[count];
                count++;
            } else {
                formatted += c;
            }
            } else if (mask) {
            if (mask.split('')[i])
                formatted += mask.split('')[i];
            }
        }
        return formatted;
        }

        document.querySelectorAll('[data-mask]').forEach(function(e) {
        function format(elem) {
            const val = doFormat(elem.value, elem.getAttribute('data-format'));
            elem.value = doFormat(elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-mask'));
            
            if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', val.length);
            range.select();
            } else if (elem.selectionStart) {
            elem.setSelectionRange(val.length, val.length);
            }
        }
        e.addEventListener('keyup', function() {
            format(e);
        });
        format(e)
        });
    },
    methods: {
        selectedLanguageHandler(lang) {
            this.langs.filter(l => {
                if(l.id === lang.id) {
                    l.checked = lang.checked;
                    if(lang.checked) {this.selectedLangs.push(lang.v)}
                    else {this.selectedLangs = this.selectedLangs.filter(s => s !== lang.v)}
                }
            })

        },
        selectCountryHandler(e) {
            this.selectedCountry = e.target.value;
        }
    },
    computed: {
        fullPhone() {
            return this.countries[this.selectedCountry].code + ' ' + this.phone;
        }
    },
    components: {
        SelectMultiple
    }
}
</script>