import {createStore} from 'vuex'

function charactersAfterComma(x) {
    return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0))
}

// function toFixed(x) {
//     if (Math.abs(x) < 1.0) {
//         let el = parseInt(x.toString().split('e-')[1]);
//         if (el) {
//             x *= Math.pow(10, el - 1);
//             x = '0.' + (new Array(el)).join('0') + x.toString().substring(2);
//         }
//     } else {
//         let el = parseInt(x.toString().split('+')[1]);
//         if (el > 20) {
//             el -= 20;
//             x /= Math.pow(10, el);
//             x += (new Array(el + 1)).join('0');
//         }
//     }
//     return x;
// }
function convertExponentialToDecimal(exponentialNumber) {
    // sanity check - is it exponential number
    const str = exponentialNumber.toString();
    if (str.indexOf('e') !== -1) {
        const exponent = parseInt(str.split('-')[1], 10);
        // Unfortunately I can not return 1e-8 as 0.00000001, because even if I call parseFloat() on it,
        // it will still return the exponential representation
        // So I have to use .toFixed()
        const result = exponentialNumber.toFixed(exponent);
        return result;
    } else {
        return exponentialNumber;
    }
}

export default createStore({
    state: {
        price: 0,
        amount: 0,
        total: 0,
    },
    getters: {
        getCurrentPrice: state => (state.price).toFixed(charactersAfterComma(convertExponentialToDecimal(state.price))),
        getCurrentAmount: state => (state.amount).toFixed(charactersAfterComma(convertExponentialToDecimal(state.amount))),
        getCurrentTotal: state => (state.total).toFixed(charactersAfterComma(convertExponentialToDecimal(state.total))),
    },
    mutations: {
        priceIncrease(state, payload) {
            switch (payload.type) {
                case 'by one':
                    if (state.price == 0) {
                        state.price = state.price + (0.00000001);
                    } else if (state.price > 0) {
                        let toIncrease = '1';

                        for (let i = 0; i < charactersAfterComma(payload.val); i++) {
                            toIncrease += '0'
                        }
                        state.price = Math.round(+(state.price + (1 / +(toIncrease))) * +(toIncrease)) / +(toIncrease)
                    }
                    break
                case 'by value':
                    if (+payload.val) {
                        state.price = +payload.val
                    }
                    break
            }
        },
        priceDecrease(state, payload) {
            switch (payload.type) {
                case 'by one':
                    if (+(payload.val) > 0) {
                        if (charactersAfterComma((payload.val)) > 0) {
                            let toIncrease = '1';
                            for (let i = 0; i < charactersAfterComma(payload.val); i++) {
                                toIncrease += '0'
                            }
                            if ((state.price).toString()[(state.price).toString().length - 1] == 1) {
                                state.price = Math.round(+(state.price - (1 / +(toIncrease + '0'))) * +(toIncrease + '0')) / +(toIncrease + '0')
                            } else {
                                state.price = Math.round(+(state.price - (1 / +(toIncrease))) * +(toIncrease)) / +(toIncrease)
                            }
                        } else {
                            state.price--
                        }
                    }

                    break
                case 'by value':
                    // console.log('by value', parseInt(payload.val))
                    if (state.price > 0) {
                        if (state.price) {
                            state.price = 0
                        } else {
                            state.price = +(payload.val)
                        }
                    }

                    break
            }
        },
        amountIncrease(state, payload) {
            switch (payload.type) {
                case 'by one':
                    if (state.amount == 0) {
                        state.amount = state.amount + (0.00000001);
                    } else if (state.amount > 0) {
                        let toIncrease = '1';

                        for (let i = 0; i < charactersAfterComma(payload.val); i++) {
                            toIncrease += '0'
                        }
                        state.amount = Math.round(+(state.amount + (1 / +(toIncrease))) * +(toIncrease)) / +(toIncrease)
                    }
                    break
                case 'by value':
                    if (+payload.val) {
                        state.amount = +payload.val
                    }
                    break
            }
        },
        amountDecrease(state, payload) {
            switch (payload.type) {
                case 'by one':
                    if (+(payload.val) > 0) {
                        if (charactersAfterComma((payload.val)) > 0) {
                            let toIncrease = '1';
                            for (let i = 0; i < charactersAfterComma(payload.val); i++) {
                                toIncrease += '0'
                            }
                            if ((state.amount).toString()[(state.amount).toString().length - 1] == 1) {
                                state.amount = Math.round(+(state.amount - (1 / +(toIncrease + '0'))) * +(toIncrease + '0')) / +(toIncrease + '0')
                            } else {
                                state.amount = Math.round(+(state.amount - (1 / +(toIncrease))) * +(toIncrease)) / +(toIncrease)
                            }
                        } else {
                            state.amount--
                        }
                    }

                    break
                case 'by value':
                    // console.log('by value', parseInt(payload.val))
                    if (state.amount > 0) {
                        if (state.amount) {
                            state.amount = 0
                        } else {
                            state.amount = +(payload.val)
                        }
                    }

                    break
            }
        },
        totalIncrease(state, payload) {
            function charactersAfterComma(x) {
                return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0))
            }

            switch (payload.type) {
                case 'by one':
                    console.log(payload)
                    if (charactersAfterComma(+payload.val) > 0) {
                        console.log(1)
                        let toIncrease = '1';
                        for (let i = 0; i < charactersAfterComma(+payload.val); i++) {
                            toIncrease += '0'
                        }
                        state.total = Math.round(+(state.total + (1 / parseInt(toIncrease))) * parseInt(toIncrease)) / parseInt(toIncrease)
                    } else {
                        state.total++
                    }

                    break
                case 'by value':
                    if (+payload.val) {
                        state.total = +payload.val
                    }

                    break
            }

            if (state.price == 0 && state.amount > 0) {

                state.price = state.total / state.amount
                console.log(state.total / state.amount)
            } else if (state.amount == 0 && state.price > 0) {
                state.amount = state.total / state.price
            }
        },
        totalDecrease(state, payload) {
            function charactersAfterComma(x) {
                return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0))
            }

            switch (payload.type) {
                case 'by one':

                    if (+(payload.val) > 0) {
                        if (charactersAfterComma(+(payload.val)) > 0) {
                            let toIncrease = '1';
                            for (let i = 0; i < charactersAfterComma(+(payload.val)); i++) {
                                toIncrease += '0'
                            }
                            state.total = Math.round(+(state.total - (1 / parseInt(toIncrease))) * parseInt(toIncrease)) / parseInt(toIncrease)
                        } else {
                            state.total--
                        }
                    }

                    break
                case 'by value':
                    console.log('by value', parseInt(payload.val))
                    if (state.total > 0) {
                        if (state.total) {
                            state.total = 0
                        } else {
                            state.total = parseInt(payload.val)
                        }
                    }
                    break
            }
            if (state.price == 0 && state.amount > 0) {
                state.price = state.total / state.amount
            } else if (state.amount == 0 && state.price > 0) {
                state.amount = state.total / state.price
            }
        },
        calculateTotal(state) {
            if (state.price > 0 || state.amount > 0) {
                state.total = state.price * state.amount

            }

        }
    },
    actions: {
        priceIncrease({commit}, payload) {
            commit('priceIncrease', payload)
        },
        priceDecrease({commit}, payload) {
            commit('priceDecrease', payload)
        },
        amountIncrease({commit}, payload) {
            commit('amountIncrease', payload)
        },
        amountDecrease({commit}, payload) {
            commit('amountDecrease', payload)
        },
        totalIncrease({commit}, payload) {
            commit('totalIncrease', payload)
        },
        totalDecrease({commit}, payload) {
            commit('totalDecrease', payload)
        },
        calculateTotal({commit}) {
            commit('calculateTotal')
        },
    },
    modules: {}
})
