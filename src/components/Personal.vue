<template>
    <div>
        <ValidationProvider name="fio" rules="required">
            <div slot-scope="{ errors }">
                <input type="text" v-model="fio" placeholder="Name Surname">
                <p>{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
        
            
                <input type="text" data-format="**-**-****" data-mask="MM-DD-YYYY" v-model="date" name="" id="">
      
        <ValidationProvider name="email" rules="required|email">
            <div slot-scope="{ errors }">
                <input v-model="email" placeholder="example@mail.com">
                <p>{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
        <ValidationProvider name="city" :rules="{ regex: /^[A-Za-z]$/ }">
            <div slot-scope="{ errors }">
                <input v-model="city" type="text" placeholder="Washington DC">
                <p>{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
        <ValidationProvider name="phone" :rules="{ regex: /^\+/ }">
            <div slot-scope="{ errors }">
                <input  v-model="phone" data-format="+*(***) ***-****" data-mask="# (###) ###-####" type="text">
                <p>{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
        <SelectMultiple :options="langs" text="languages" />
    </div>
</template>
<script>
import { extend } from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';
import SelectMultiple from '@/components/SelectMultiple.vue'

// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});
// Add the email rule
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
            date: '##.##.####',
            city: '',
            phone: '',
            langs: [{id:0, v:'Russian', checked: false}, {id:1, v:'English', checked: false}, {id:2, v: 'Spanish', checked:false}, {id:3, v:'Portugese', checked:false}]
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
      elem.focus();
      elem.setSelectionRange(val.length, val.length);
    }
  }
  e.addEventListener('keyup', function() {
    format(e);
  });
  format(e)
});
    },
    components: {
        SelectMultiple
    }
}
</script>