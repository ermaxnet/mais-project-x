const   path = require("path"),
     webpack = require("webpack");

module.exports = env => {
    const mode = env.WEBPACK_PROD_MODE
        ? "production"
        : "development";

    return {
        mode,
        entry: [
            path.resolve(__dirname, "wwwroot/scripts/source/index.js")
        ],
        output: {
            pathinfo: true,
            path: path.join(__dirname, "wwwroot/scripts/bundles"),
            filename: "bundle.js",
            chunkFilename: "[name].chunk.js",
            publicPath: "/"
        },
        resolve: {
            descriptionFiles: [ "package.json" ],
            modules: [ "node_modules" ],
            alias: {
                "react-native": "react-native-web"
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: { loader: "babel-loader" }
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /(node_modules)/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    }
                }
            }
        }
    };
};