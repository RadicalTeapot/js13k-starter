const path = require('path');
/** Webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputFolderName = "public";

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/app.ts',
        /** Add `.ts` as a resolvable extension.
         * This will make import Name from "./Name"; work in typescript files
         */
        resolve: { extensions: [".ts", ".js"] },
        devtool: isDevelopment && "cheap-module-eval-source-map",
        devServer: {
            contentBase: path.resolve(__dirname, outputFolderName),
            index: 'index.html',    // Serve <outputFolderName>/index.html
            open: false,            // Open a web browser on server start
            host: 'localhost',      // Set host to localhost
            port: 8080,             // Run on port 8080
        },
        module: {
            rules: [
                /** Rules for ts files */
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, outputFolderName),
            filename: 'main.js'
        },
        plugins: [
            /** Empty the output folder folder */
            new CleanWebpackPlugin(),
            /** General index.html with script tags automatically from template */
            new HtmlWebpackPlugin({
                title: 'Typescript - Kontra test',
                template: path.resolve(__dirname, 'src', 'index.html'),
                minify: !isDevelopment && {
                    collapseWhitespace: true
                  },
            })
        ],
        /** Tree shaking */
        optimization: {
            usedExports: true
        }
    }
}
