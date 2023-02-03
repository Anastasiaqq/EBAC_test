<template>
    <div class="account__password">
        <form action="">
            <div class="account__field-group">
                <label for="" class="account__label">Old password<strong>*</strong></label>
                <ValidationProvider>
                    <div slot-scope="{ errors }">
                        <input class="account__personal_input" v-model="pw1" type="password">
                        <p>{{ errors[0] }}</p>
                    </div>
                </ValidationProvider>
            </div>
            
            <ValidationObserver>
                <div class="account__field-group">
                    <label for="" class="account__label">New password<strong>*</strong></label>
                    <ValidationProvider rules="required|confirmed:confirmation" v-slot="{ errors }">
                        <input class="account__personal_input" v-model="pw2" type="password">
                        <p>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
            
                <div class="account__field-group">
                    <label for="" class="account__label">Confirm new password<strong>*</strong></label>
                    <ValidationProvider vid="confirmation" rules="required" v-slot="{ errors }" >
                        <input class="account__personal_input" v-model="pw3" type="password">
                        <p>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>
            </ValidationObserver>
        </form>
    </div>
</template>
<script>
import { extend, ValidationObserver } from 'vee-validate';
import { required,confirmed } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required'
});
extend('confirmed', {
  ...confirmed,
  message: `The passwords don't match`
});
// extend('password', {
//   params: ['target'],
//   validate(value, { target }) {
//     return value === target;
//   },
//   message: 'Password confirmation does not match'
// });
export default {
    name: "Passwords",
    data() {
        return {
            pw1: "",
            pw2: "",
            pw3: "",
        };
    },
    components: { ValidationObserver }
}

</script>