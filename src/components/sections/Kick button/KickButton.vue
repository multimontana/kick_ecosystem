<template>
    <button
            class="kick-form__button"
            type="submit"
            :class="($props.type === 'buy') ? 'kick-form__button-buy': 'kick-form__button-sell'"
    >
        {{$props.name}}
    </button>
</template>

<script>
    export default {
        name: 'KickButton',
        props: {
            type: String,
            name: String
        }
    }
</script>

<style lang="scss">
    @import "KickButton";
</style>
