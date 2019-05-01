const mix = require('laravel-mix');

/*
* Package required for image optimization
*/
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const jpegrecompress = require('imagemin-jpeg-recompress')
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminSvgo = require("imagemin-svgo");
const imageminPngquant = require('imagemin-pngquant');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    plugins: [
        new CopyWebpackPlugin([{
            from: 'resources/images',
            to: 'img', // Laravel mix will place this in 'public/img'
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                    quality: 70,
                    progressive: true
                }),
                jpegrecompress({
                    quality: 'high', target: 83, max: 89,
                    loops: 4, progressive: true, strip: true
                    }),
                imageminGifsicle({ interlaced: true }),
                //imageminJpegtran({ progressive: true }),
                imageminPngquant({quality: [0.3, 0.8]}),
                imageminSvgo({
                    plugins: [{
                    removeViewBox: true,
                    cleanupIDs: true
                    }]
                    }),
            ]
        })
    ]
});

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/adminJs/sb-admin-2.js', 'public/js/customJs/custom.js')
    .js('resources/js/datatables-init.js', 'public/vendor/datatable/js/datatables-init.js')
    .scripts([
        'node_modules/jszip/dist/jszip.js',
        'node_modules/pdfmake/build/pdfmake.js',
        'node_modules/pdfmake/build/vfs_fonts.js',
        'node_modules/datatables.net/js/jquery.dataTables.js',
        'node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js',
        'node_modules/datatables.net-autofill/js/dataTables.autoFill.js',
        'node_modules/datatables.net-autofill-bs4/js/autoFill.bootstrap4.js',
        'node_modules/datatables.net-buttons/js/dataTables.buttons.js',
        'node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.js',
        'node_modules/datatables.net-buttons/js/buttons.colVis.js',
        'node_modules/datatables.net-buttons/js/buttons.flash.js',
        'node_modules/datatables.net-buttons/js/buttons.html5.js',
        'node_modules/datatables.net-buttons/js/buttons.print.js',
        'node_modules/datatables.net-colreorder/js/dataTables.colReorder.js',
        'node_modules/datatables.net-colreorder-bs4/js/colReorder.bootstrap4.js',
        'node_modules/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.js',
        'node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.js',
        'node_modules/datatables.net-keytable-bs4/js/keyTable.bootstrap4.js',
        'node_modules/datatables.net-responsive/js/dataTables.responsive.js',
        'node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.js',
        'node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.js',
        'node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4.js',
        'node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.js',
        'node_modules/datatables.net-rowreorder-bs4/js/rowReorder.bootstrap4.js',
        'node_modules/datatables.net-scroller/js/dataTables.scroller.js',
        'node_modules/datatables.net-scroller-bs4/js/scroller.bootstrap4.js',
        'node_modules/datatables.net-select/js/dataTables.select.js',
        'node_modules/datatables.net-select-bs4/js/select.bootstrap4.js',
    ], 'public/vendor/datatable/js/datatable.js')
    .styles(['node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css'], 'public/vendor/datatable/css/datatable.css')
    .js('node_modules/chart.js/dist/Chart.js', 'public/vendor/charts/js/charts.js')
    .sass('resources/sass/app.scss', 'public/css')
    .options({
        autoprefixer: {
            options: {
                browsers: [
                    'last 3 versions', // http://browserl.ist/?q=last+3+versions
                    'ie >= 10', // http://browserl.ist/?q=ie+%3E%3D+10
                    'edge >= 12', // http://browserl.ist/?q=edge+%3E%3D+12
                    'firefox >= 28', // http://browserl.ist/?q=firefox+%3E%3D+28
                    'chrome >= 21', // http://browserl.ist/?q=chrome+%3E%3D+21
                    'safari >= 6.1', // http://browserl.ist/?q=safari+%3E%3D+6.1
                    'opera >= 12.1', // http://browserl.ist/?q=opera+%3E%3D+12.1
                    'ios >= 7', // http://browserl.ist/?q=ios+%3E%3D+7
                    'android >= 4.4', // http://browserl.ist/?q=android+%3E%3D+4.4
                    'blackberry >= 10', // http://browserl.ist/?q=blackberry+%3E%3D+10
                    'operamobile >= 12.1', // http://browserl.ist/?q=operamobile+%3E%3D+12.1
                    'samsung >= 4', // http://browserl.ist/?q=samsung+%3E%3D+4
                ], cascade: false
            }
        }
   });


