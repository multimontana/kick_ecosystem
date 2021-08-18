<template>
    <div class="kick-form__input-wrapper">
        <input
                :value="$props.name == 'price'? ($store.getters.getCurrentPrice == 0  ? '' : $store.getters.getCurrentPrice) : $props.name == 'amount' ? ($store.getters.getCurrentAmount == 0  ? '' : $store.getters.getCurrentAmount): $props.name == 'total' ? ($store.getters.getCurrentTotal == 0  ? '' : $store.getters.getCurrentTotal): ''"
                :placeholder="$props.placeholder"
                class="kick-form__input" type="text"
                autocomplete="off"
                :name="$props.name"
                :id="$props.name"
                maxlength="15"
                @keydown="changeInputValue($event)"
        >
        <div class="kick-form__input-btn-wrapper">
            <button
                    @click="increase($event)"
                    class="kick-form__input-btn"
            >
                <div class="kick-form__arrow-svg-wrapper">
                    <svg class="kick-form__arrow-svg" enable-background="new 0 0 240.835 240.835" version="1.1"
                         viewBox="0 0 240.84 240.84" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                        <path d="m129.01 57.819c-4.68-4.68-12.499-4.68-17.191 0l-108.26 107.98c-4.74 4.74-4.74 12.427 0 17.155 4.74 4.74 12.439 4.74 17.179 0l99.683-99.406 99.671 99.418c4.752 4.74 12.439 4.74 17.191 0 4.74-4.74 4.74-12.427 0-17.155l-108.27-108z"/>
                    </svg>
                </div>
            </button>
            <button
                    @click="decrease($event)"
                    class="kick-form__input-btn"
            >
                <div class="kick-form__arrow-svg-wrapper">
                    <svg class="kick-form__arrow-svg" enable-background="new 0 0 240.835 240.835" version="1.1"
                         viewBox="0 0 240.84 240.84" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                        <path d="m129.01 57.819c-4.68-4.68-12.499-4.68-17.191 0l-108.26 107.98c-4.74 4.74-4.74 12.427 0 17.155 4.74 4.74 12.439 4.74 17.179 0l99.683-99.406 99.671 99.418c4.752 4.74 12.439 4.74 17.191 0 4.74-4.74 4.74-12.427 0-17.155l-108.27-108z"/>
                    </svg>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'KickInput',
        props: {
            type: String,
            placeholder: String,
            name: String,
            value: String
        },
        data() {
            return {

            }
        },
        methods: {
            isInt(n) {
                return Number(n) === n && n % 1 === 0;
            },
            isFloat(n) {
                return Number(n) === n && n % 1 !== 0;
            },
            charactersAfterComma(x) {
                return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0))
            },
            increase(e) {

                e.preventDefault()
                switch (this.name) {
                    case 'price':
                        this.$store.dispatch('priceIncrease', {
                            type: 'by one',
                            val: document.querySelector('#price').value
                        })

                        this.$store.dispatch('calculateTotal')
                        break
                    case 'amount':
                        this.$store.dispatch('amountIncrease', {
                            type: 'by one',
                            val: document.querySelector('#amount').value
                        })

                        this.$store.dispatch('calculateTotal')
                        break
                    case 'total':
                        this.$store.dispatch('totalIncrease', {
                            type: 'by one',
                            val: document.querySelector('#total').value
                        })

                        // this.$store.dispatch('calculateTotal')
                        break
                }

            },
            decrease(e) {
                e.preventDefault()
                switch (this.name) {
                    case 'price':
                        this.$store.dispatch('priceDecrease', {
                            type: 'by one',
                            val: document.querySelector('#price').value
                        })

                        this.$store.dispatch('calculateTotal')
                        break
                    case 'amount':
                        this.$store.dispatch('amountDecrease', {
                            type: 'by one',
                            val: document.querySelector('#amount').value
                        })

                        this.$store.dispatch('calculateTotal')
                        break
                    case 'total':
                        this.$store.dispatch('totalDecrease', {
                            type: 'by one',
                            val: document.querySelector('#total').value
                        })

                        // this.$store.dispatch('calculateTotal')
                        break

                }
            },
            changeInputValue(e) {
                setTimeout(() => {
                    if (!(/^[-.]?\d+(?:[.]\d*?)?$/).test(e.target.value)) {
                        e.target.value = e.target.value.replace(/[^0-9,.]/g, '')
                        if (e.target.value.includes(',')) {
                            e.target.value = e.target.value.replaceAll(',', '.')
                        }
                        if (e.target.value.split('.').length > 2) {
                            e.target.value = e.target.value.replace(/.([^.]*)$/, '')
                        }
                    }
                }, 100)


                //Increase And Decrease By Keyboard Numbers
                if (this.isInt(+e.target.value) || this.isFloat(+e.target.value)) {
                    setTimeout(() => {
                        if (this.charactersAfterComma(e.target.value) >= 9) {
                            e.target.value = e.target.value.substring(0, e.target.value.indexOf('.'))+ '.' + e.target.value.substring(e.target.value.indexOf('.') + 1, e.target.value.length-1)
                        }

                        if (this.name == 'price') {
                            this.$store.dispatch('priceIncrease', {
                                type: 'by value',
                                val: e.target.value
                            })

                            this.$store.dispatch('calculateTotal')
                        } else if (this.name == 'amount') {
                            this.$store.dispatch('amountIncrease', {
                                type: 'by value',
                                val: e.target.value
                            })

                            this.$store.dispatch('calculateTotal')
                        } else if (this.name == 'total') {
                            this.$store.dispatch('totalIncrease', {
                                type: 'by value',
                                val: e.target.value
                            })

                            // this.$store.dispatch('calculateTotal')
                        }
                    }, 100)


                }

                //Increase And Decrease By Keyboard Arrows
                if (this.name == 'price') {
                    if (e.key == 'ArrowUp') {
                        this.$store.dispatch('priceIncrease', {
                            type: 'by one',
                            val: e.target.value
                        })
                        this.$store.dispatch('calculateTotal')
                    } else if (e.key == 'ArrowDown') {
                        this.$store.dispatch('priceDecrease', {
                            type: 'by one',
                            val: e.target.value
                        })
                        this.$store.dispatch('calculateTotal')
                    } else if (e.key == 'Backspace' && !e.target.value.slice(1)) {
                        setTimeout(() => {
                            this.$store.dispatch('priceDecrease', {
                                type: 'by value',
                                val: e.target.value
                            })
                            this.$store.dispatch('calculateTotal')
                        }, 100)
                    }
                } else if (this.name == 'amount') {
                    if (e.key == 'ArrowUp') {
                        this.$store.dispatch('amountIncrease', {
                            type: 'by one',
                            val: e.target.value
                        })
                        this.$store.dispatch('calculateTotal')
                    } else if (e.key == 'ArrowDown') {
                        this.$store.dispatch('amountDecrease', {
                            type: 'by one',
                            val: e.target.value
                        })
                        this.$store.dispatch('calculateTotal')
                    } else if (e.key == 'Backspace' && !e.target.value.slice(1)) {
                        setTimeout(() => {
                            this.$store.dispatch('amountDecrease', {
                                type: 'by value',
                                val: e.target.value
                            })
                            this.$store.dispatch('calculateTotal')
                        }, 100)
                    }
                } else if (this.name == 'total') {
                    if (e.key == 'ArrowUp') {
                        this.$store.dispatch('totalIncrease', {
                            type: 'by one',
                            val: e.target.value
                        })
                        // this.$store.dispatch('calculateTotal')
                    } else if (e.key == 'ArrowDown') {
                        this.$store.dispatch('totalDecrease', {
                            type: 'by one',
                            val: e.target.value
                        })
                        // this.$store.dispatch('calculateTotal')
                    } else if (e.key == 'Backspace' && !e.target.value.slice(1)) {
                        setTimeout(() => {
                            this.$store.dispatch('totalDecrease', {
                                type: 'by value',
                                val: e.target.value
                            })
                            // this.$store.dispatch('calculateTotal')
                        }, 100)
                    }
                }


            },
        }
    }
</script>

<style lang="scss">
    @import 'KickInput';
</style>
