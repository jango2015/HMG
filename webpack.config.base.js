var path = require('path'),
    fs = require('fs'),
    webpack = require('webpack');

var dir = {
    js_src: path.join(__dirname, '/src/js'),
    js_dist: path.join(__dirname, '/dist/js')
};

module.exports = {
    // 入口文件映射表
    entry: getEntryFiles(),

    //  入口文件输出配置
    output: {
        path: dir.js_dist, // 打包文件存放的绝对路径
        publicPath: 'http://localhost:3000/dist/js/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        loaders: [
            // {test: /\.js$/, loader: 'babel', include: /src/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style!css!autoprefixer!sass'},
            {test: /\.tpl$/, loader: 'html'},
            {test: /\.(png|gif|jpg)$/, loader: 'url?limit=10240'},
            {test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url?limit=50000&name=[path][name].[ext]'}
        ]
    },

    // 插件
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
        //允许错误不打断程序
        // new webpack.NoErrorsPlugin(),
        // 提取公共模块
        // new webpack.optimize.CommonsChunkPlugin()
    ],
    resolve: {
        root: path.join(__dirname),
        // require时可省略的后缀，如require('module')，不需要module.js
        extensions: ['', '.js'],
        // 别名
        alias: {
            components: 'src/js/components',
            extend: 'src/js/extend',
            modules: 'src/js/modules',
            images: 'src/images',
            sass: 'src/sass'
        },
        externals: {
            // $: 'jquery'
            $: 'Zepto'
        },
        devtool: 'source-map'
    }
};

/**
 * 获取入口文件
 * @return {object} [返回以页面为单位的每个页面入口文件js]
 */
function getEntryFiles(){
    var files = {};
    var items = fs.readdirSync(dir.js_src);

    if(items){
        items.forEach(function(item){
            if(item.match(/\.js$/)){
                files[item.replace('.js', '')] = path.join(dir.js_src, item);
            }
        });
    }

    // console.log(files)

    return files;
}