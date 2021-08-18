<template>
    <div class="kick-form">
        <KickBalance/>
        <form
                @submit="sendForm($event)"
                class="kick-form__form"
        >
            <KickInput
                    v-for="input in inputTypes"
                    :key="input.type"
                    :type="input.type"
                    :name="input.name"
                    :placeholder="input.placeholder"
                    :value="input.value"
            />

            <div class="kick-form__button-wrapper">
                <KickButton
                        v-for="btn in btnTypes"
                        :key="btn.type"
                        :name="btn.name"
                        :type="btn.type"
                />
            </div>

        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import KickInput from '../../sections/Kick input/KickInput'
    import KickBalance from "../../sections/Kick balance/KickBalance";
    import KickButton from "../../sections/Kick button/KickButton";

    export default {
        name: 'KickForm',
        components: {
            KickInput,
            KickBalance,
            KickButton
        },
        data() {
            return {
                requestURL: 'http://api.coinlayer.com/api/counvert?access_key=',
                id: 78,
                access_key: '1U5kvhDD9yCLHgIMMjoR4H',

                inputTypes: [
                    {type: 'ETH', name: 'price', placeholder: 'Price', value: ''},
                    {type: 'KICK', name: 'amount', placeholder: 'Amount', value: ''},
                    {type: 'ETH', name: 'total', placeholder: 'Total ~', value: ''},
                ],

                btnTypes: [
                    {type: 'buy', name: 'BUY'},
                    {type: 'sell', name: 'SELL'},
                ]
            }
        },
        methods: {
            sendForm(e) {
                e.preventDefault()

                //Fake API
                axios.get('https://fcsapi.com/api-v3/crypto/latest?id='+this.id+'&access_key='+this.access_key)
                .then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "KickForm";
</style>
