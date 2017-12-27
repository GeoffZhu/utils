import babel from 'rollup-plugin-babel';

const config = {
  input: './index.es.js',
  output: {
    file: './index.js',
    format: 'umd',
    name: 'utils'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

export default config