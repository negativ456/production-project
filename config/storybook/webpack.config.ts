import webpack from 'webpack'
import { BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
export default ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '../../src')
  }
  if (config.resolve && config.module && config.module.rules) {
    config.resolve.modules?.push(paths.src)
    config.module?.rules?.push(buildCssLoader(true))
    config.resolve.extensions?.push('.ts', '.tsx')
    config.module.rules = config.module.rules.map((rule: webpack.RuleSetRule) => {
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i }
      }
      return rule
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
  }

  return config
}
