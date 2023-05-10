import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const babelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxbabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const assetLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource',
    generator: {
      fileName: 'static/[hash][ext][query]',
    },
  };
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
  const cssLoader = buildCssLoader(options.isDev);
  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/
  // }

  return [assetLoader, svgLoader, babelLoader, tsxbabelLoader, cssLoader];
}
