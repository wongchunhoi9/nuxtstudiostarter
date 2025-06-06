/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors:{
        'rice': '##DFDED9',
        'relayorange':'#ffd415',
        'relayorangelight':'#ffd41511',
        'greenled':'#5bffa755'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '9/16': '9 / 16',
      },
      animation: {
        'bounce-slow': 'bounce 5s infinite',
      }
    },
  },
  plugins: [],
}

