import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'Android > 4.1',
        'iOS > 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
      ],
    }),
  ],
}
