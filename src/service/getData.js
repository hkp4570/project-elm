import fetch from '../utils/fetch';

export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
})