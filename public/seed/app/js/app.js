/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.8.3
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function () {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils'
        ]);
})();


(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'
        ]);
})();
(function () {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function () {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function () {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function () {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function () {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function () {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function () {
    'use strict';

    angular
        .module('app.settings', [ 'app.lazyload' ]);
})();
(function () {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function () {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function () {
    'use strict';

    angular
        .module('app.utils', [
            'app.colors'
        ]);
})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider) {

        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;

        // Disables animation on items with class .ng-no-animation
        $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

        // Improve performance disabling debugging features
        // $compileProvider.debugInfoEnabled(false);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
            'desktopLG': 1200,
            'desktop': 992,
            'tablet': 768,
            'mobile': 480
        })
        ;

})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        $rootScope.settings = {};

        $rootScope.msgDurationSecs = 4000; // 3seconds


        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });*/

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // ----------------------------------- 

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function (event, unfoundState/*, fromState, fromParams*/) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function (/*event, toState, toParams, fromState, fromParams*/) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
            });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };

    }

})();


(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES) {

        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

    }
})();
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                '_': ['vendor/lodash/min/lodash.min.js'],
                'moment': ['vendor/moment/min/moment-with-locales.min.js'],
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                    'vendor/simple-line-icons/css/simple-line-icons.css'],
                'flot-chart': ['vendor/Flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'vendor/Flot/jquery.flot.resize.js',
                    'vendor/Flot/jquery.flot.pie.js',
                    'vendor/Flot/jquery.flot.time.js',
                    'vendor/Flot/jquery.flot.categories.js',
                    'vendor/flot-spline/js/jquery.flot.spline.min.js']
           },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'ui.bootstrap-slider', files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                        'vendor/angular-bootstrap-slider/slider.js'], serie: true
                },
                {
                    name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js',
                        'vendor/angularjs-toaster/toaster.css']
                },
                {
                    name: 'localytics.directives', files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                        'vendor/chosen_v1.2.0/chosen.min.css',
                        'vendor/angular-chosen-localytics/dist/angular-chosen.js'],
                    serie: true
                },
                {
                    name: 'ur.file', files: ['vendor/angular-file/angular-file.js']
                }
            ]
        })
        ;

})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 

    function searchOpen() {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss() {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;

    }

    //
    // Contrller definition
    // 

    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController($scope, $element, NavSearch) {
        $element
            .on('click', function (e) { e.stopPropagation(); })
            .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController($scope, $element, NavSearch) {

        var inputSelector = '.navbar-form input[type="text"]';

        $(inputSelector)
            .on('click', function (e) { e.stopPropagation(); })
            .on('keyup', function (e) {
                if (e.keyCode === 27) // ESC
                    NavSearch.dismiss();
            });

        // click anywhere closes the search
        $(document).on('click', NavSearch.dismiss);
        // dismissable options
        $element
            .on('click', function (e) { e.stopPropagation(); })
            .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
            var navbarForm = $(navbarFormSelector);

            navbarForm.toggleClass('open');

            var isOpen = navbarForm.hasClass('open');

            navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
            $(navbarFormSelector)
                .removeClass('open') // Close control
                .find('input[type="text"]').blur() // remove focus
                // .val('') // Empty input
                ;
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function () {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar) {

        // Loading bar transition
        // ----------------------------------- 
        var thBar;
        $rootScope.$on('$stateChangeStart', function () {
            if ($('.wrapper > section').length) // check if bar container exists
                thBar = $timeout(function () {
                    cfpLoadingBar.start();
                }, 0); // sets a latency Threshold
        });
        $rootScope.$on('$stateChangeSuccess', function (event) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });

    }

})();
(function () {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
            'primary': '#5d9cec',
            'success': '#27c24c',
            'info': '#23b7e5',
            'warning': '#ff902b',
            'danger': '#f05050',
            'inverse': '#131e26',
            'green': '#37bc9b',
            'pink': '#f532e5',
            'purple': '#7266ba',
            'dark': '#3a3f51',
            'yellow': '#fad732',
            'gray-darker': '#232735',
            'gray-dark': '#3a3f51',
            'gray': '#dde6e9',
            'gray-light': '#e4eaec',
            'gray-lighter': '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
            return (APP_COLORS[name] || '#fff');
        }
    }

})();

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            // controller access level
            $get: function () {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return 'app/views/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function () {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load(whatToLoad);
                            });
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app/home');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('modernizr', 'icons', 'ui.bootstrap-slider', 'toaster')
            })
            //.state('app.settings', {
            //    resolve: helper.resolveFor('ui.bootstrap-slider')
            //})
            .state('app.game_settings', {
                url: '/gamesettings',
                title: 'Game Settings',
                controller: 'GameSettingsController',
                templateUrl: helper.basepath('app-settings.html'),
                resolve: helper.resolveFor('modernizr', 'icons', 'toaster')
            })
            .state('app.home', {
                url: '/home',
                title: 'Home',
                controller: 'HomeController',
                templateUrl: helper.basepath('home.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            //.state('app.search', {
            //    url: '/search',
            //    title: 'Search',
            //    controller: 'SearchController',
            //    templateUrl: helper.basepath('search/search.html'),
            //    resolve: helper.resolveFor('moment', 'toaster'),
            //    params: {
            //        searchfor: null,
            //        module: null
            //    }
            //})
            .state('app.questions_manage', {
                url: '/questions/manage',
                title: 'Manage Questions',
                templateUrl: helper.basepath('questions/questions.manage.html')
            })
            .state('app.users', {
                url: '/users',
                title: 'All Users',
                controller: 'UserController',
                templateUrl: helper.basepath('users/all-users.html'),
                resolve: helper.resolveFor('toaster')
            })
            .state('app.user_icons', {
                url: '/usericons',
                title: 'All User Icons',
                controller: 'UserIconController',
                templateUrl: helper.basepath('user-icons/all-user-icons.html'),
                resolve: helper.resolveFor('toaster')
            })
            .state('app.items', {
                url: '/items',
                title: 'All Items',
                controller: 'ItemController',
                templateUrl: helper.basepath('market/all-items.html'),
                resolve: helper.resolveFor('localytics.directives', 'toaster', '_')
            })
            .state('app.bundle', {
                url: '/specialbundle',
                title: 'Special Bundle',
                controller: 'SpecialBundleController',
                templateUrl: helper.basepath('market/all-bundles.html'),
                resolve: helper.resolveFor('localytics.directives','toaster')
            })
            .state('app.inapp_products', {
                url: '/coins',
                title: 'All In-app Products',
                controller: 'InAppController',
                templateUrl: helper.basepath('market/all-inapp-products.html'),
                resolve: helper.resolveFor('toaster')
            })
            .state('app.draws', {
                url: '/draws',
                title: 'All Draws',
                controller: 'DrawController',
                templateUrl: helper.basepath('market/all-draws.html'),
                resolve: helper.resolveFor('toaster')
            })
            .state('app.instant_prizes', {
                url: '/instantprizes',
                title: 'All Instant Prizes',
                controller: 'InstantPrizeController',
                templateUrl: helper.basepath('market/all-instant-prizes.html'),
                resolve: helper.resolveFor('toaster')
            })
            .state('app.questions', {
                url: '/questions',
                title: 'All Questions',
                controller: 'QuestionController',
                templateUrl: helper.basepath('questions/all-questions.html'),
                resolve: helper.resolveFor('localytics.directives', 'toaster')
            })
            .state('app.questions_import', {
                url: '/questions-import',
                title: 'Import Questions',
                controller: 'QuestionImportController',
                templateUrl: helper.basepath('questions/questions-import.html'),
                resolve: helper.resolveFor('ur.file', 'toaster')
            })
            .state('app.quests', {
                url: '/quests',
                title: 'All Quests',
                controller: 'QuestController',
                templateUrl: helper.basepath('quests/all-quests.html'),
                resolve: helper.resolveFor('localytics.directives', 'toaster')
            })
            .state('app.announcements', {
                url: '/announcements',
                title: 'All Announcements',
                controller: 'AnnouncementController',
                templateUrl: helper.basepath('announcements/all-announcements.html'),
                resolve: helper.resolveFor('toaster')
                //params: {
                //    obj: null
                //}
            })
            .state('app.reports_users', {
                url: '/reports/users',
                title: 'Report on User Activity',
                controller: 'UsersReportController',
                templateUrl: helper.basepath('reports/user-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_coins', {
                url: '/reports/coins',
                title: 'Report on Coins Equilibrium',
                controller: 'CoinsReportController',
                templateUrl: helper.basepath('reports/coins-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_gems', {
                url: '/reports/gems',
                title: 'Report on Gems Equilibrium',
                controller: 'GemsReportController',
                templateUrl: helper.basepath('reports/gems-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_revenue', {
                url: '/reports/revenue',
                title: 'Report on Revenue Equilibrium',
                controller: 'RevenueReportController',
                templateUrl: helper.basepath('reports/revenue-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_xp', {
                url: '/reports/xp',
                title: 'Report on XP Equilibrium',
                controller: 'XpReportController',
                templateUrl: helper.basepath('reports/xp-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_items', {
                url: '/reports/items',
                title: 'Report on Items Equilibrium',
                controller: 'ItemsReportController',
                templateUrl: helper.basepath('reports/items-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_buffs', {
                url: '/reports/buffs',
                title: 'Report on Buff Equilibrium',
                controller: 'BuffsReportController',
                templateUrl: helper.basepath('reports/buffs-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_desert', {
                url: '/reports/desert',
                title: 'Report on Desert Equilibrium',
                controller: 'DesertReportController',
                templateUrl: helper.basepath('reports/desert-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_arena', {
                url: '/reports/arena',
                title: 'Report on Arena Equilibrium',
                controller: 'ArenaReportController',
                templateUrl: helper.basepath('reports/arena-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
            .state('app.reports_palace', {
                url: '/reports/palace',
                title: 'Report on Palace Equilibrium',
                controller: 'PalaceReportController',
                templateUrl: helper.basepath('reports/palace-report.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'moment', 'toaster')
            })
          // 
            // CUSTOM RESOLVES
            //   Add your own resolves properties
            //   following this object extend
            //   method
            // ----------------------------------- 
            // .state('app.someroute', {
            //   url: '/some_url',
            //   templateUrl: 'path_to_template.html',
            //   controller: 'someController',
            //   resolve: angular.extend(
            //     helper.resolveFor(), {
            //     // YOUR RESOLVES GO HERE
            //     }
            //   )
            // })
            .state('app.login', {
                url: '/login',
                title: 'Login',
                controller: 'LoginFormController',
                templateUrl: helper.basepath('user-management/login.html')
            })
            .state('app.404', {
                url: '/404',
                title: 'Not Found',
                templateUrl: helper.basepath('generic/404.html')
            })
            .state('app.500', {
                url: '/500',
                title: 'Server error',
                templateUrl: helper.basepath('generic/500.html')
            })
            .state('app.maintenance', {
                url: '/maintenance',
                title: 'Maintenance',
                templateUrl: helper.basepath('generic/maintenance.html')
            })
            .state('app.logout', {
                url: '/logout',
                controller: 'LogoutController',
                title: 'Logout'
                //templateUrl: helper.basepath('generic/maintenance.html')
            })
            ;

    } // routesConfig

})();


(function () {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template:
                '<div class="preloader-progress">' +
                '<div class="preloader-progress-bar" ' +
                'ng-style="{width: loadCounter + \'%\'}"></div>' +
                '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

            scope.loadCounter = 0;

            var counter = 0,
                timeout;

            // disables scrollbar
            angular.element('body').css('overflow', 'hidden');
            // ensure class is present for styling
            el.addClass('preloader');

            appReady().then(endCounter);

            timeout = $timeout(startCounter);

            ///////

            function startCounter() {

                var remaining = 100 - counter;
                counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

                scope.loadCounter = parseInt(counter, 10);

                timeout = $timeout(startCounter, 20);
            }

            function endCounter() {

                $timeout.cancel(timeout);

                scope.loadCounter = 100;

                $timeout(function () {
                    // animate preloader hiding
                    $animate.addClass(el, 'preloader-hidden');
                    // retore scrollbar
                    angular.element('body').css('overflow', '');
                }, 300);
            }

            function appReady() {
                var deferred = $q.defer();
                var viewsLoaded = 0;
                // if this doesn't sync with the real app ready
                // a custom event must be used instead
                var off = scope.$on('$viewContentLoaded', function () {
                    viewsLoaded++;
                    // we know there are at least two views to be loaded 
                    // before the app is ready (1-index.html 2-app*.html)
                    if (viewsLoaded === 2) {
                        // with resolve this fires only once
                        $timeout(function () {
                            deferred.resolve();
                        }, 3000);

                        off();
                    }

                });

                return deferred.promise;
            }

        } //link
    }

})();
(function () {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun)
        ;

    settingsRun.$inject = ['$rootScope', '$localStorage', '$location', '$state'];

    function settingsRun($rootScope, $localStorage, $location, $state) {


        // User Settings
        // -----------------------------------
        $rootScope.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'app/img/user/02.jpg'
        };

        // Hides/show user avatar on sidebar from any element
        $rootScope.toggleUserBlock = function () {
            $rootScope.$broadcast('toggleUserBlock');
        };

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'Swipe and Win',
            description: 'Admininstrator Dashboard',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: null,
                asideScrollbar: false,
                isCollapsedText: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp',
            settings: {
                //environment: 'development'
            }
        };

        // Setup the layout mode
        $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');

        // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
        // if( angular.isDefined($localStorage.layout) )
        //   $rootScope.app.layout = $localStorage.layout;
        // else
        //   $localStorage.layout = $rootScope.app.layout;
        //
        // $rootScope.$watch('app.layout', function () {
        //   $localStorage.layout = $rootScope.app.layout;
        // }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
            if (newValue === false)
                $rootScope.$broadcast('closeSidebarMenu');
        });
        $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
            if (newValue === false)
                $rootScope.$broadcast('closeSidebarMenu');
        });

        $rootScope.searchTerm = function (term) {

            const module = $state.current.name;
            $rootScope.$broadcast('search', {
                module: module,
                searchfor: term
            });
            //$rootScope.search = {
            //    searchFor: term,
            //    module: module
            //};

        };

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader, Utils) {

        activate();

        ////////////////

        function activate() {
            var collapseList = [];

            // demo: when switch from collapse to hover, close all items
            var watchOff1 = $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
                if (newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });


            // Load menu from json file
            // -----------------------------------

            SidebarLoader.getMenu(sidebarReady);

            function sidebarReady(items) {
                $scope.menuItems = items.data;
            }

            // Handle sidebar and collapse items
            // ----------------------------------

            $scope.getMenuItemPropClasses = function (item) {
                return (item.heading ? 'nav-heading' : '') +
                    (isActive(item) ? ' active' : '');
            };

            $scope.addCollapse = function ($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };

            $scope.isCollapse = function ($index) {
                return (collapseList[$index]);
            };

            $scope.toggleCollapse = function ($index, isParentItem) {

                // collapsed sidebar doesn't toggle drodopwn
                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

                // make sure the item index exists
                if (angular.isDefined(collapseList[$index])) {
                    if (!$scope.lastEventFromChild) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                }
                else if (isParentItem) {
                    closeAllBut(-1);
                }

                $scope.lastEventFromChild = isChild($index);

                return true;

            };

            // Controller helpers
            // -----------------------------------

            // Check item and children active state
            function isActive(item) {

                if (!item) return;

                if (!item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function (value) {
                        if (isActive(value)) foundActive = true;
                    });
                    return foundActive;
                }
                else
                    return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for (var i in collapseList) {
                    if (index < 0 || index.indexOf(i) < 0)
                        collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function () {
                watchOff1();
            });

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

            var currentState = $rootScope.$state.current.name;
            var $sidebar = element;

            var eventName = Utils.isTouch() ? 'click' : 'mouseenter';
            var subNav = $();

            $sidebar.on(eventName, '.nav > li', function () {

                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {

                    subNav.trigger('mouseleave');
                    subNav = toggleMenuItem($(this), $sidebar);

                    // Used to detect click and touch events outside the sidebar
                    sidebarAddBackdrop();

                }

            });

            var eventOff1 = scope.$on('closeSidebarMenu', function () {
                removeFloatingNav();
            });

            // Normalize state when resize to mobile
            $win.on('resize.sidebar', function () {
                if (!Utils.isMobile())
                    asideToggleOff();
            });

            // Adjustment on route changes
            var eventOff2 = $rootScope.$on('$stateChangeStart', function (event, toState) {
                currentState = toState.name;
                // Hide sidebar automatically on mobile
                asideToggleOff();

                $rootScope.$broadcast('closeSidebarMenu');
            });

            // Autoclose when click outside the sidebar
            if (angular.isDefined(attrs.sidebarAnyclickClose)) {

                var wrapper = $('.wrapper');
                var sbclickEvent = 'click.sidebar';

                var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

            }

            //////

            function watchExternalClicks(newVal) {
                // if sidebar becomes visible
                if (newVal === true) {
                    $timeout(function () { // render after current digest cycle
                        wrapper.on(sbclickEvent, function (e) {
                            // if not child of sidebar
                            if (!$(e.target).parents('.aside').length) {
                                asideToggleOff();
                            }
                        });
                    });
                }
                else {
                    // dettach event
                    wrapper.off(sbclickEvent);
                }
            }

            function asideToggleOff() {
                $rootScope.app.asideToggled = false;
                if (!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
            }

            scope.$on('$destroy', function () {
                // detach scope events
                eventOff1();
                eventOff2();
                watchOff1();
                // detach dom events
                $sidebar.off(eventName);
                $win.off('resize.sidebar');
                wrapper.off(sbclickEvent);
            });

        }

        ///////

        function sidebarAddBackdrop() {
            var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop' });
            $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
                removeFloatingNav();
            });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element) {
            $element
                .siblings('li')
                .removeClass('open')
                .end()
                .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

            removeFloatingNav();

            var ul = $listItem.children('ul');

            if (!ul.length) return $();
            if ($listItem.hasClass('open')) {
                toggleTouchItem($listItem);
                return $();
            }

            var $aside = $('.aside');
            var $asideInner = $('.aside-inner'); // for top offset calculation
            // float aside uses extra padding on aside
            var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
            var subNav = ul.clone().appendTo($aside);

            toggleTouchItem($listItem);

            var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
            var vwHeight = $win.height();

            subNav
                .addClass('nav-floating')
                .css({
                    position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
                    top: itemTop,
                    bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
                });

            subNav.on('mouseleave', function () {
                toggleTouchItem($listItem);
                subNav.remove();
            });

            return subNav;
        }

        function removeFloatingNav() {
            $('.dropdown-backdrop').remove();
            $('.sidebar-subnav.nav-floating').remove();
            $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
            var menuJson = 'server/sidebar-menu.json',
                menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache

            onError = onError || function () { alert('Failure loading menu'); };

            $http
                .get(menuURL)
                .then(onReady, onError);
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope'];
    function UserBlockController($scope) {

        activate();

        ////////////////

        function activate() {

            $scope.userBlockVisible = true;

            var detach = $scope.$on('toggleUserBlock', function (/*event, args*/) {

                $scope.userBlockVisible = !$scope.userBlockVisible;

            });

            $scope.$on('$destroy', detach);
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();
        $translateProvider.usePostCompiling(true);
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function () {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];

    function translateRun($rootScope, $translate) {

        // Internationalization
        // ----------------------

        $rootScope.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en': 'English',
                'es_AR': 'Español'
            },
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                $rootScope.language.selected = $rootScope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId) {
                // Set the new idiom
                $translate.use(localeId);
                // save a reference for the current language
                $rootScope.language.selected = $rootScope.language.available[localeId];
                // finally toggle dropdown
                $rootScope.language.listIsOpen = !$rootScope.language.listIsOpen;
            }
        };

        $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.animateEnabled, scope);
            }, function (newValue) {
                $animate.enabled(!!newValue, element);
            });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
        return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
            element.on('click', function (e) {
                e.preventDefault();

                if (scope.resetKey) {
                    delete $localStorage[scope.resetKey];
                    $state.go($state.current, {}, { reload: true });
                }
                else {
                    $.error('No storage key specified for reset.');
                }
            });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen(Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            // Not supported under IE
            if (Browser.msie) {
                element.addClass('hide');
            }
            else {
                element.on('click', function (e) {
                    e.preventDefault();

                    if (screenfull.enabled) {

                        screenfull.toggle();

                        // Switch icon indicator
                        if (screenfull.isFullscreen)
                            $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                        else
                            $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                    } else {
                        $.error('Fullscreen not enabled');
                    }

                });
            }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function (e) {
                if (element.is('a')) e.preventDefault();
                var uri = attrs.loadCss,
                    link;

                if (uri) {
                    link = createLink(uri);
                    if (!link) {
                        $.error('Error creating stylesheet link element.');
                    }
                }
                else {
                    $.error('No stylesheet location defined.');
                }

            });
        }

        function createLink(uri) {
            var linkId = 'autoloaded-stylesheet',
                oldLink = $('#' + linkId).attr('id', linkId + '-old');

            $('head').append($('<link/>').attr({
                'id': linkId,
                'rel': 'stylesheet',
                'href': uri
            }));

            if (oldLink.length) {
                oldLink.remove();
            }

            return $('#' + linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now(dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var format = attrs.format;

            function updateTime() {
                var dt = dateFilter(new Date(), format);
                element.text(dt);
            }

            updateTime();
            var intervalPromise = $interval(updateTime, 1000);

            scope.$on('$destroy', function () {
                $interval.cancel(intervalPromise);
            });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            element.on('change', function () {
                var $this = $(this),
                    index = $this.index() + 1,
                    checkbox = $this.find('input[type="checkbox"]'),
                    table = $this.parents('table');
                // Make sure to affect only the correct checkbox column
                table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                    .prop('checked', checkbox[0].checked);

            });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
            element.on('click', function () {
                $timeout(function () {
                    // all IE friendly dispatchEvent
                    var evt = document.createEvent('UIEvents');
                    evt.initUIEvent('resize', true, false, $window, 0);
                    $window.dispatchEvent(evt);
                    // modern dispatchEvent way
                    // $window.dispatchEvent(new Event('resize'));
                }, attributes.triggerResize || 300);
            });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win = angular.element($window),
            $body = angular.element('body');

        return {
            // DETECTION
            support: {
                transition: (function () {
                    var transitionEnd = (function () {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
                animation: (function () {

                    var animationEnd = (function () {

                        var element = document.body || document.documentElement,
                            animEndEventNames = {
                                WebkitAnimation: 'webkitAnimationEnd',
                                MozAnimation: 'animationend',
                                OAnimation: 'oAnimationEnd oanimationend',
                                animation: 'animationend'
                            }, name;

                        for (name in animEndEventNames) {
                            if (element.style[name] !== undefined) return animEndEventNames[name];
                        }
                    }());

                    return animationEnd && { end: animationEnd };
                })(),
                requestAnimationFrame: window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    function (callback) { window.setTimeout(callback, 1000 / 60); },
                /*jshint -W069*/
                touch: (
                    ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
                    (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                    (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                    false
                ),
                mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
            },
            // UTILITIES
            isInView: function (element, options) {
                /*jshint -W106*/
                var $element = $(element);

                if (!$element.is(':visible')) {
                    return false;
                }

                var window_left = $win.scrollLeft(),
                    window_top = $win.scrollTop(),
                    offset = $element.offset(),
                    left = offset.left,
                    top = offset.top;

                options = $.extend({ topoffset: 0, leftoffset: 0 }, options);

                if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                    left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                    return true;
                } else {
                    return false;
                }
            },

            langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

            isTouch: function () {
                return $html.hasClass('touch');
            },

            isSidebarCollapsed: function () {
                return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
            },

            isSidebarToggled: function () {
                return $body.hasClass('aside-toggled');
            },

            isMobile: function () {
                return $win.width() < APP_MEDIAQUERY.tablet;
            }

        };
    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------




// Define the extended app module
(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard', [
            'angle',
            'SwipeWinDashboard.settings_service',
            'SwipeWinDashboard.login',
            'SwipeWinDashboard.logout',
            //'SwipeWinDashboard.search',
            'SwipeWinDashboard.users',
            'SwipeWinDashboard.user_icons',
            'SwipeWinDashboard.draws',
            'SwipeWinDashboard.instant_prizes',
            'SwipeWinDashboard.questions',
            'SwipeWinDashboard.questions_import',
            'SwipeWinDashboard.game_settings',
            //'SwipeWinDashboard.announcements',
            //'SwipeWinDashboard.quests',
            //'SwipeWinDashboard.reports_users',
            //'SwipeWinDashboard.reports_coins',
            //'SwipeWinDashboard.reports_gems',
            //'SwipeWinDashboard.reports_revenue',
            //'SwipeWinDashboard.reports_xp',
            //'SwipeWinDashboard.reports_items',
            //'SwipeWinDashboard.reports_buffs',
            //'SwipeWinDashboard.reports_desert',
            //'SwipeWinDashboard.reports_arena',
            //'SwipeWinDashboard.reports_palace',
            'SwipeWinDashboard.component_paging',
            'SwipeWinDashboard.component_duration_iso_8601',
            //'SwipeWinDashboard.component_item_reward_rule',
            //'SwipeWinDashboard.component_item',
            //'SwipeWinDashboard.component_game_reward_chest_spec',
            'SwipeWinDashboard.component_datetime_picker'
        ])
        .directive('multiLangText', MultiLangText)
        .directive('multiLangTextArea', MultiLangTextArea)
        .directive('reportDateRange', ReportDateRange)
        .directive('flot', flot)
        .directive('defaultPortrait', DefaultPortrait);


    function MultiLangText() {
        return {
            restrict: 'E',
            templateUrl: './app/views/directives/multiLangInput.html',
            scope: {
                selected: '@default',
                label: '@label',
                lObject: '=languageObject',
                ngModel: '=?ngModel',
                onEmpty: '=onEmpty',
                placeholder: '@placeholder'
            },
            controller: ['$scope', '$log', function ($scope, $log) {
                // $scope.selected = null;

                $scope.$watch('lObject', function (newValue, oldValue) {
                    if ($scope.selected)
                        $scope.key = $scope.selected;
                    else if ($scope.lObject && $scope.lObject.en)
                        $scope.key = 'en';
                    else if (!$scope.selected && _.size($scope.lObject) > 0) {
                        $scope.key = _.keys($scope.lObject)[0];
                    }

                    if ($scope.lObject && $scope.selected && $scope.lObject[$scope.selected]) {
                        $scope.ngModel = { key: $scope.selected, value: $scope.lObject[$scope.selected] };
                    }
                });


                $scope.addNew = function () {
                    $scope.key = null;
                }

                $scope.select = function (key) {
                    $scope.key = key;
                }

                $scope.pushLangKey = function (key) {
                    $scope.lObject[key] = "";
                    $scope.key = key;
                    key = null;
                };

                $scope.delete = function () {
                    console.log($scope.onEmpty);
                    delete $scope.lObject[$scope.key];
                    if (_.size($scope.lObject) == 0) {

                        $scope.onEmpty();
                    }
                    else
                        $scope.key = _.keys($scope.lObject)[0];
                };
            }]
        };
    }

    function MultiLangTextArea() {
        return {
            restrict: 'E',
            templateUrl: './app/views/directives/multiLangTextArea.html',
            scope: {
                selected: '@default',
                lObject: '=languageObject',
                placeholder: '@placeholder',
                label: '@label'
            },
            controller: ['$scope', function ($scope) {



                $scope.$watch('lObject', function (newValue, oldValue) {
                    if ($scope.lObject && $scope.lObject.en)
                        $scope.selected = 'en';

                }, true);

                $scope.addNew = function () {
                    $scope.selected = null;
                }

                $scope.select = function (key) {
                    $scope.selected = key;
                }

                $scope.pushLangKey = function (key) {
                    $scope.lObject[key] = "";
                    $scope.selected = key;
                    key = null;
                };

                $scope.delete = function (selected) {
                    delete $scope.lObject[selected];
                    $scope.selected = $scope.lObject[0];
                }
            }]
        };
    }

    function ReportDateRange() {
        return {
            restrict: 'E',
            templateUrl: './app/views/directives/reportDateRange.html',
            scope: {
                labelFrom: '=?',
                labelTo: '=?',
                callbackFunction: '&'
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {

                if (!$scope.labelFrom)
                    $scope.labelFrom = 'Date from:';
                if (!$scope.labelTo)
                    $scope.labelTo = 'to:';

                const now = moment.utc().startOf('day');

                $scope.filter = {
                    from: { text: null, value: null },
                    to: { text: null, value: null }
                };
                if ($rootScope.reportDateRange) {
                    $scope.filter.from = $rootScope.reportDateRange.from;
                    $scope.filter.to = $rootScope.reportDateRange.to;
                }

                /*
                const dateRangeOptions = [
                    {
                        text: 'D +1',
                        value: now.clone().add(1, 'd').format()
                    },
                    {
                        text: 'D +0 Today',
                        value: now.clone().format()
                    },
                    {
                        text: 'D -1',
                        value: now.clone().subtract(1, 'd').format()
                    },
                    {
                        text: 'D -2',
                        value: now.clone().subtract(2, 'd').format()
                    },
                    {
                        text: 'D -3',
                        value: now.clone().subtract(3, 'd').format()
                    },
                    {
                        text: 'D -4',
                        value: now.clone().subtract(4, 'd').format()
                    },
                    {
                        text: 'D -5',
                        value: now.clone().subtract(5, 'd').format()
                    },
                    {
                        text: 'W -1',
                        value: now.clone().subtract(1, 'w').format()
                    },
                    {
                        text: 'W -2',
                        value: now.clone().subtract(1, 'w').format()
                    },
                    {
                        text: 'M -1',
                        value: now.clone().subtract(1, 'm').format()
                    },
                    {
                        text: 'M -2',
                        value: now.clone().subtract(2, 'm').format()
                    },
                ];

                $scope.dateFromOptions = dateRangeOptions;
                $scope.dateToOptions = angular.copy(dateRangeOptions);

                $scope.changeRangeFrom = function () {
                    var index = $scope.dateFromOptions.indexOf($scope.filter.from);
                    $scope.dateToOptions = angular.copy(dateRangeOptions);
                    $scope.dateToOptions = $scope.dateToOptions.slice(0, index);
                }

                $scope.changeRangeTo = function () {
                }

                */

                $scope.fromDate = {
                    dt: null, 
                    minDate: null,
                    opened: false,

                    today: function () {
                        this.dt = new Date();
                    },
                    clear: function () {
                        this.dt = null;
                        $scope.filter.from = { text: null, value: null };
                    },

                    // Disable selection
                    disabled: function (date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    },

                    toggleMin: function () {
                        this.minDate = this.minDate ? null : new Date();
                    },

                    open: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        this.opened = true;
                    }
                };
                $scope.toDate = {
                    dt: null,
                    minDate: null,
                    opened: false,

                    today: function () {
                        this.dt = new Date();
                    },
                    clear: function () {
                        this.dt = null;
                        $scope.filter.to = { text: null, value: null };
                    },

                    // Disable selection
                    disabled: function (date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    },

                    toggleMin: function () {
                        this.minDate = this.minDate ? null : new Date();
                    },

                    open: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        this.opened = true;
                    }
                };

                // Added these 2 watch loops in order to intercept the clear button pressing (which is not any other way intercepted)
                $scope.$watch('filter.from.text', (newValue) => {
                    if (!newValue || newValue === '') {
                        $scope.fromDate.dt = null;
                        $scope.filter.from = { text: null, value: null };
                    }
                    else {
                        $scope.filter.from.value = $scope.filter.from.text.toISOString();
                        if (!$rootScope.reportDateRange)
                            $rootScope.reportDateRange = {
                                from: null,
                                to: null
                            };
                        $rootScope.reportDateRange.from = $scope.filter.from;
                    }
                });
                $scope.$watch('filter.to.text', (newValue) => {
                    if (!newValue || newValue === '') {
                        $scope.toDate.dt = null;
                        $scope.filter.to = { text: null, value: null };
                    }
                    else {
                        $scope.filter.to.value = $scope.filter.to.text.toISOString();
                        if (!$rootScope.reportDateRange)
                            $rootScope.reportDateRange = {
                                from: null,
                                to: null
                            };
                        $rootScope.reportDateRange.to = $scope.filter.to;
                    }
                });


                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };
                $scope.fromDate.today();
                $scope.fromDate.toggleMin();
                $scope.toDate.today();
                $scope.toDate.toggleMin();

                $scope.initDate = new Date('2019-10-20');
                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];


                // Glue for callback on the parent control
                $scope.refreshForDateRange = function (filter) {
                    if (($scope.filter.from && $scope.filter.from.text) || ($scope.filter.to && $scope.filter.to.text)) {
                        if ($scope.filter.from && $scope.filter.from.text)
                            $scope.filter.from.value = $scope.filter.from.text.toISOString();
                        if ($scope.filter.to && $scope.filter.to.text)
                            $scope.filter.to.value = $scope.filter.to.text.toISOString();
                        $scope.callbackFunction({
                            filter: $scope.filter
                        });
                    }
                };

            }]
        };
    }


    /**=========================================================
     * Directive: DefaultPortrait
     * Replaces a Not-found src attribute with a default image 
     =========================================================*/

    function DefaultPortrait() {       
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    element.attr('src', 'app/img/default-person.png'); // set default image
                });
            }
        };
    }

    /**=========================================================
     * Module: flot.js
     * Initializes the Flot chart plugin and handles data refresh
     =========================================================*/

    flot.$inject = ['$http', '$timeout'];

    function flot($http, $timeout) {

        var directive = {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                dataset: '=?',
                options: '=',
                series: '=',
                callback: '=',
                src: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            var height, plot, plotArea, width;
            var heightDefault = 220;

            plot = null;

            width = attrs.width || '100%';
            height = attrs.height || heightDefault;

            plotArea = $(element.children()[0]);
            plotArea.css({
                width: width,
                height: height
            });

            function init() {
                var plotObj;
                if (!scope.dataset || !scope.options) return;
                plotObj = $.plot(plotArea, scope.dataset, scope.options);
                scope.$emit('plotReady', plotObj);
                if (scope.callback) {
                    scope.callback(plotObj, scope);
                }

                return plotObj;
            }

            function onDatasetChanged(dataset) {
                if (plot) {
                    plot.setData(dataset);
                    plot.setupGrid();
                    return plot.draw();
                } else {
                    plot = init();
                    onSerieToggled(scope.series);
                    return plot;
                }
            }
            var $watchOff1 = scope.$watchCollection('dataset', onDatasetChanged, true);

            function onSerieToggled(series) {
                if (!plot || !series) return;
                var someData = plot.getData();
                for (var sName in series) {
                    angular.forEach(series[sName], toggleFor(sName));
                }

                plot.setData(someData);
                plot.draw();

                function toggleFor(sName) {
                    return function (s, i) {
                        if (someData[i] && someData[i][sName])
                            someData[i][sName].show = s;
                    };
                }
            }
            var $watchOff2 = scope.$watch('series', onSerieToggled, true);

            function onSrcChanged(src) {

                if (src) {

                    $http.get(src)
                        .then(function (data) {

                            $timeout(function () {
                                scope.dataset = data.data;
                            });

                        }, function () {
                            $.error('Flot chart: Bad request.');
                        });

                }
            }
            var $watchOff3 = scope.$watch('src', onSrcChanged);

            scope.$on('$destroy', function () {
                // detach watches and scope events
                $watchOff1();
                $watchOff2();
                $watchOff3();
                // destroy chart
                plot.destroy();
            });

        }
    }

})();



(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard')
        .run(run);

    run.$inject = ['$rootScope', '$location', '$state', '$http', 'SettingsService'];
    function run($rootScope, $location, $state, $http, SettingsService) {

        $rootScope.settings = SettingsService;

        $rootScope.$watch('app.settings.environment', function (newValue) {
            SettingsService.SetEnvironment(newValue);
        });

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/app/login');
            }
        });

    }
})();

/**=========================================================
 * Module: SwipeWinDashboard.settings_service.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.settings_service', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard')
        .service('SettingsService', SettingsService);

    SettingsService.$inject = ['$rootScope', '$http', '$location'];
    function SettingsService($rootScope, $http, $location) {
        var service = this;


        service.FetchGameSettings = function () {
            return $http
                .get(service.settings.backendUrl + 'api/admin/game-settings')
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !response.data instanceof Object) {
                        // log this
                    } else {
                        service.settings.gameSettings = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        };

        service.GetGameSettings = function () {
            return angular.copy(service.settings.gameSettings);
        };

        service.Reset = function () {

            const settings = angular.fromJson($rootScope.$storage.getItem('dashboardSettings'));
            if (settings)
                service.settings = settings;
            else {
                service.settings = {
                    environment: 'development',
                    backendUrl: 'https://swipewin.herokuapp.com/'
                };
            }
            service.FetchGameSettings();

            if (!$rootScope.globals)
                $rootScope.globals = {
                    authToken: null,
                    currentUser: null
                };
            $rootScope.globals.authToken = $rootScope.$storage.getItem('authToken');
            if ($rootScope.globals.authToken) {
                $http
                    .get(this.GetBackendUrl() + 'api/user', { token: $rootScope.globals.authToken })
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        // customize according to your api
                        if (!response.data || !response.data.id) {
                            //
                        } else {
                            $rootScope.globals.currentUser = response.data;
                            $location.path('/app/home');
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }

        };

        ////////////////

        service.GetEnvironment = function () {
            const env = service.settings.environment;
            return env;
        };

        service.SetEnvironment = function (env) {

            if (env === 'development' || env === 'production' || env === 'local') {
                if (env === 'development')
                    service.settings.backendUrl = 'https://swipewin.herokuapp.com/';
                else if (env === 'production')
                    service.settings.backendUrl = 'https://swipewin.herokuapp.com/';
                else if (env === 'local')
                    service.settings.backendUrl = 'http://localhost:3030/';

                service.settings.environement = env;
                //$rootScope.app.settings.environment = env;
                $rootScope.$storage.setItem('dashboardSettings', angular.toJson(service.settings));

                service.Reset();
            }
        };

        service.GetBackendUrl = function () {
            const path = service.settings.backendUrl;
            return path;
        };


        // Declare global enumerations
        service.rarityOptions = ['common', 'rare', 'legendary'];
        service.gameScopeOptions = ['desert', 'arena', 'silver-palace', 'gold-palace'];
        service.questionTypeOptions = ['multiple choice', 'true or false', 'how close', 'get 4 of 6'];
        service.difficultyLevelOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        service.countryCodes =
            [
                { name: 'Afghanistan', code: 'AF' },
                { name: 'Åland Islands', code: 'AX' },
                { name: 'Albania', code: 'AL' },
                { name: 'Algeria', code: 'DZ' },
                { name: 'American Samoa', code: 'AS' },
                { name: 'AndorrA', code: 'AD' },
                { name: 'Angola', code: 'AO' },
                { name: 'Anguilla', code: 'AI' },
                { name: 'Antarctica', code: 'AQ' },
                { name: 'Antigua and Barbuda', code: 'AG' },
                { name: 'Argentina', code: 'AR' },
                { name: 'Armenia', code: 'AM' },
                { name: 'Aruba', code: 'AW' },
                { name: 'Australia', code: 'AU' },
                { name: 'Austria', code: 'AT' },
                { name: 'Azerbaijan', code: 'AZ' },
                { name: 'Bahamas', code: 'BS' },
                { name: 'Bahrain', code: 'BH' },
                { name: 'Bangladesh', code: 'BD' },
                { name: 'Barbados', code: 'BB' },
                { name: 'Belarus', code: 'BY' },
                { name: 'Belgium', code: 'BE' },
                { name: 'Belize', code: 'BZ' },
                { name: 'Benin', code: 'BJ' },
                { name: 'Bermuda', code: 'BM' },
                { name: 'Bhutan', code: 'BT' },
                { name: 'Bolivia', code: 'BO' },
                { name: 'Bosnia and Herzegovina', code: 'BA' },
                { name: 'Botswana', code: 'BW' },
                { name: 'Bouvet Island', code: 'BV' },
                { name: 'Brazil', code: 'BR' },
                { name: 'British Indian Ocean Territory', code: 'IO' },
                { name: 'Brunei Darussalam', code: 'BN' },
                { name: 'Bulgaria', code: 'BG' },
                { name: 'Burkina Faso', code: 'BF' },
                { name: 'Burundi', code: 'BI' },
                { name: 'Cambodia', code: 'KH' },
                { name: 'Cameroon', code: 'CM' },
                { name: 'Canada', code: 'CA' },
                { name: 'Cape Verde', code: 'CV' },
                { name: 'Cayman Islands', code: 'KY' },
                { name: 'Central African Republic', code: 'CF' },
                { name: 'Chad', code: 'TD' },
                { name: 'Chile', code: 'CL' },
                { name: 'China', code: 'CN' },
                { name: 'Christmas Island', code: 'CX' },
                { name: 'Cocos (Keeling) Islands', code: 'CC' },
                { name: 'Colombia', code: 'CO' },
                { name: 'Comoros', code: 'KM' },
                { name: 'Congo', code: 'CG' },
                { name: 'Congo, The Democratic Republic of the', code: 'CD' },
                { name: 'Cook Islands', code: 'CK' },
                { name: 'Costa Rica', code: 'CR' },
                { name: 'Cote D\'Ivoire', code: 'CI' },
                { name: 'Croatia', code: 'HR' },
                { name: 'Cuba', code: 'CU' },
                { name: 'Cyprus', code: 'CY' },
                { name: 'Czech Republic', code: 'CZ' },
                { name: 'Denmark', code: 'DK' },
                { name: 'Djibouti', code: 'DJ' },
                { name: 'Dominica', code: 'DM' },
                { name: 'Dominican Republic', code: 'DO' },
                { name: 'Ecuador', code: 'EC' },
                { name: 'Egypt', code: 'EG' },
                { name: 'El Salvador', code: 'SV' },
                { name: 'Equatorial Guinea', code: 'GQ' },
                { name: 'Eritrea', code: 'ER' },
                { name: 'Estonia', code: 'EE' },
                { name: 'Ethiopia', code: 'ET' },
                { name: 'Falkland Islands (Malvinas)', code: 'FK' },
                { name: 'Faroe Islands', code: 'FO' },
                { name: 'Fiji', code: 'FJ' },
                { name: 'Finland', code: 'FI' },
                { name: 'France', code: 'FR' },
                { name: 'French Guiana', code: 'GF' },
                { name: 'French Polynesia', code: 'PF' },
                { name: 'French Southern Territories', code: 'TF' },
                { name: 'Gabon', code: 'GA' },
                { name: 'Gambia', code: 'GM' },
                { name: 'Georgia', code: 'GE' },
                { name: 'Germany', code: 'DE' },
                { name: 'Ghana', code: 'GH' },
                { name: 'Gibraltar', code: 'GI' },
                { name: 'Greece', code: 'GR' },
                { name: 'Greenland', code: 'GL' },
                { name: 'Grenada', code: 'GD' },
                { name: 'Guadeloupe', code: 'GP' },
                { name: 'Guam', code: 'GU' },
                { name: 'Guatemala', code: 'GT' },
                { name: 'Guernsey', code: 'GG' },
                { name: 'Guinea', code: 'GN' },
                { name: 'Guinea-Bissau', code: 'GW' },
                { name: 'Guyana', code: 'GY' },
                { name: 'Haiti', code: 'HT' },
                { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
                { name: 'Holy See (Vatican City State)', code: 'VA' },
                { name: 'Honduras', code: 'HN' },
                { name: 'Hong Kong', code: 'HK' },
                { name: 'Hungary', code: 'HU' },
                { name: 'Iceland', code: 'IS' },
                { name: 'India', code: 'IN' },
                { name: 'Indonesia', code: 'ID' },
                { name: 'Iran, Islamic Republic Of', code: 'IR' },
                { name: 'Iraq', code: 'IQ' },
                { name: 'Ireland', code: 'IE' },
                { name: 'Isle of Man', code: 'IM' },
                { name: 'Israel', code: 'IL' },
                { name: 'Italy', code: 'IT' },
                { name: 'Jamaica', code: 'JM' },
                { name: 'Japan', code: 'JP' },
                { name: 'Jersey', code: 'JE' },
                { name: 'Jordan', code: 'JO' },
                { name: 'Kazakhstan', code: 'KZ' },
                { name: 'Kenya', code: 'KE' },
                { name: 'Kiribati', code: 'KI' },
                { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
                { name: 'Korea, Republic of', code: 'KR' },
                { name: 'Kuwait', code: 'KW' },
                { name: 'Kyrgyzstan', code: 'KG' },
                { name: 'Lao People\'S Democratic Republic', code: 'LA' },
                { name: 'Latvia', code: 'LV' },
                { name: 'Lebanon', code: 'LB' },
                { name: 'Lesotho', code: 'LS' },
                { name: 'Liberia', code: 'LR' },
                { name: 'Libyan Arab Jamahiriya', code: 'LY' },
                { name: 'Liechtenstein', code: 'LI' },
                { name: 'Lithuania', code: 'LT' },
                { name: 'Luxembourg', code: 'LU' },
                { name: 'Macao', code: 'MO' },
                { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
                { name: 'Madagascar', code: 'MG' },
                { name: 'Malawi', code: 'MW' },
                { name: 'Malaysia', code: 'MY' },
                { name: 'Maldives', code: 'MV' },
                { name: 'Mali', code: 'ML' },
                { name: 'Malta', code: 'MT' },
                { name: 'Marshall Islands', code: 'MH' },
                { name: 'Martinique', code: 'MQ' },
                { name: 'Mauritania', code: 'MR' },
                { name: 'Mauritius', code: 'MU' },
                { name: 'Mayotte', code: 'YT' },
                { name: 'Mexico', code: 'MX' },
                { name: 'Micronesia, Federated States of', code: 'FM' },
                { name: 'Moldova, Republic of', code: 'MD' },
                { name: 'Monaco', code: 'MC' },
                { name: 'Mongolia', code: 'MN' },
                { name: 'Montserrat', code: 'MS' },
                { name: 'Morocco', code: 'MA' },
                { name: 'Mozambique', code: 'MZ' },
                { name: 'Myanmar', code: 'MM' },
                { name: 'Namibia', code: 'NA' },
                { name: 'Nauru', code: 'NR' },
                { name: 'Nepal', code: 'NP' },
                { name: 'Netherlands', code: 'NL' },
                { name: 'Netherlands Antilles', code: 'AN' },
                { name: 'New Caledonia', code: 'NC' },
                { name: 'New Zealand', code: 'NZ' },
                { name: 'Nicaragua', code: 'NI' },
                { name: 'Niger', code: 'NE' },
                { name: 'Nigeria', code: 'NG' },
                { name: 'Niue', code: 'NU' },
                { name: 'Norfolk Island', code: 'NF' },
                { name: 'Northern Mariana Islands', code: 'MP' },
                { name: 'Norway', code: 'NO' },
                { name: 'Oman', code: 'OM' },
                { name: 'Pakistan', code: 'PK' },
                { name: 'Palau', code: 'PW' },
                { name: 'Palestinian Territory, Occupied', code: 'PS' },
                { name: 'Panama', code: 'PA' },
                { name: 'Papua New Guinea', code: 'PG' },
                { name: 'Paraguay', code: 'PY' },
                { name: 'Peru', code: 'PE' },
                { name: 'Philippines', code: 'PH' },
                { name: 'Pitcairn', code: 'PN' },
                { name: 'Poland', code: 'PL' },
                { name: 'Portugal', code: 'PT' },
                { name: 'Puerto Rico', code: 'PR' },
                { name: 'Qatar', code: 'QA' },
                { name: 'Reunion', code: 'RE' },
                { name: 'Romania', code: 'RO' },
                { name: 'Russian Federation', code: 'RU' },
                { name: 'RWANDA', code: 'RW' },
                { name: 'Saint Helena', code: 'SH' },
                { name: 'Saint Kitts and Nevis', code: 'KN' },
                { name: 'Saint Lucia', code: 'LC' },
                { name: 'Saint Pierre and Miquelon', code: 'PM' },
                { name: 'Saint Vincent and the Grenadines', code: 'VC' },
                { name: 'Samoa', code: 'WS' },
                { name: 'San Marino', code: 'SM' },
                { name: 'Sao Tome and Principe', code: 'ST' },
                { name: 'Saudi Arabia', code: 'SA' },
                { name: 'Senegal', code: 'SN' },
                { name: 'Serbia and Montenegro', code: 'CS' },
                { name: 'Seychelles', code: 'SC' },
                { name: 'Sierra Leone', code: 'SL' },
                { name: 'Singapore', code: 'SG' },
                { name: 'Slovakia', code: 'SK' },
                { name: 'Slovenia', code: 'SI' },
                { name: 'Solomon Islands', code: 'SB' },
                { name: 'Somalia', code: 'SO' },
                { name: 'South Africa', code: 'ZA' },
                { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
                { name: 'Spain', code: 'ES' },
                { name: 'Sri Lanka', code: 'LK' },
                { name: 'Sudan', code: 'SD' },
                { name: 'Suriname', code: 'SR' },
                { name: 'Svalbard and Jan Mayen', code: 'SJ' },
                { name: 'Swaziland', code: 'SZ' },
                { name: 'Sweden', code: 'SE' },
                { name: 'Switzerland', code: 'CH' },
                { name: 'Syrian Arab Republic', code: 'SY' },
                { name: 'Taiwan, Province of China', code: 'TW' },
                { name: 'Tajikistan', code: 'TJ' },
                { name: 'Tanzania, United Republic of', code: 'TZ' },
                { name: 'Thailand', code: 'TH' },
                { name: 'Timor-Leste', code: 'TL' },
                { name: 'Togo', code: 'TG' },
                { name: 'Tokelau', code: 'TK' },
                { name: 'Tonga', code: 'TO' },
                { name: 'Trinidad and Tobago', code: 'TT' },
                { name: 'Tunisia', code: 'TN' },
                { name: 'Turkey', code: 'TR' },
                { name: 'Turkmenistan', code: 'TM' },
                { name: 'Turks and Caicos Islands', code: 'TC' },
                { name: 'Tuvalu', code: 'TV' },
                { name: 'Uganda', code: 'UG' },
                { name: 'Ukraine', code: 'UA' },
                { name: 'United Arab Emirates', code: 'AE' },
                { name: 'United Kingdom', code: 'GB' },
                { name: 'United States', code: 'US' },
                { name: 'United States Minor Outlying Islands', code: 'UM' },
                { name: 'Uruguay', code: 'UY' },
                { name: 'Uzbekistan', code: 'UZ' },
                { name: 'Vanuatu', code: 'VU' },
                { name: 'Venezuela', code: 'VE' },
                { name: 'Viet Nam', code: 'VN' },
                { name: 'Virgin Islands, British', code: 'VG' },
                { name: 'Virgin Islands, U.S.', code: 'VI' },
                { name: 'Wallis and Futuna', code: 'WF' },
                { name: 'Western Sahara', code: 'EH' },
                { name: 'Yemen', code: 'YE' },
                { name: 'Zambia', code: 'ZM' },
                { name: 'Zimbabwe', code: 'ZW' }
            ];
        service.countryLookup = {};
        service.countryCodes.forEach(function (pair) {
            service.countryLookup[pair.code] = pair.name;
        });

        service.Reset();

        return service;
    }
})();



(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', 'SettingsService', '$scope', '$http'];
    function HomeController($log, SettingsService, $scope, $http) {
        // for controllerAs syntax
        var vm = this;

        vm.getUserReport = function () {
            let path = SettingsService.GetBackendUrl() + 'api/admin/report/user?';
            let dateTo = new Date();
            let dateFrom = moment.utc(dateTo).subtract(1, 'd').toDate();

            path += '&dateFrom=' + dateFrom.toISOString();
            path += '&dateTo=' + dateTo.toISOString();

            return $http
                .get(path)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        //vm.authMsg = response.data.error || 'Error fetching users.';
                    } else {
                        /*
                                    users: 0,
                                    newUsers: 0,
                                    newUsersPercentage: 0,
                                    buyers: 0,
                                    buyersPercentage: 0,
                                    newBuyers: 0,
                                    newBuyersPercentage: 0,
                                    subscribers: 0,
                                    subscribersPercentage: 0,
                                    newSubscribers: 0,
                                    newSubscribersPercentage: 0,
                                    sessions: 0,
                                    sessionsPerUserPercentage: 0,
                                    coinsSpent: 0,
                                    coinsSpentPerUserPercentage: 0,
                                    gemsWon: 0,
                                    gemsWonPerUserPercentage: 0,
                                    revenues: 0,
                                    revenuesPerUserPercentage: 0,
                                    revenuesPerGemPercentage: 0,
                                    revenuesOfCoinsForGemPerGemPercentage: 0

                        */
                        var data = angular.copy($scope.dataTemplate);
                        //data[1].data.push(['All Users', response.data.users]);
                        //data[1].data.push(['New Users', response.data.newUsers]);
                        //data[1].data.push(['Buyers', response.data.buyers]);
                        //data[1].data.push(['New Buyers', response.data.newBuyers]);
                        //data[1].data.push(['Subscribers', response.data.subscribers]);
                        //data[1].data.push(['New Subscribers', response.data.newSubscribers]);
                        //data[1].data.push(['Sessions', response.data.sessions]);
                        //data[1].data.push(['Coins Spent', response.data.coinsSpent]);
                        //data[1].data.push(['Gems Won', response.data.gemsWon]);
                        //data[1].data.push(['Revenues', response.data.revenues]);

                        data[0].data.push(['All Users', response.data.users]);
                        data[0].data.push(['New Users', response.data.newUsers]);
                        data[0].data.push(['Buyers', response.data.buyers]);
                        data[0].data.push(['New Buyers', response.data.newBuyers]);
                        data[0].data.push(['Subscribers', response.data.subscribers]);
                        data[0].data.push(['New Subscribers', response.data.newSubscribers]);
                        data[0].data.push(['Sessions', response.data.sessions]);
                        //data[0].data.push(['Coins Spent', response.data.coinsSpent]);
                        //data[0].data.push(['Gems Won', response.data.gemsWon]);
                        data[0].data.push(['Revenues', response.data.revenues]);

                        $scope.data = data;
                        $scope.rawData = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        };


        activate();



        ////////////////

        function activate() {
            $log.log('I\'m a line from HomeController');

            // bind here all data from the form
            $scope.barStackedOptions = {
                series: {
                    stack: false,
                    bars: {
                        align: 'center',
                        lineWidth: 0,
                        show: true,
                        barWidth: 0.6,
                        fill: 0.9
                    }
                },
                grid: {
                    borderColor: '#eee',
                    borderWidth: 1,
                    hoverable: true,
                    backgroundColor: '#fcfcfc'
                },
                tooltip: true,
                tooltipOpts: {
                    content: function (label, x, y) { return x + ' : ' + y; }
                },
                xaxis: {
                    tickColor: '#fcfcfc',
                    mode: 'categories'
                },
                yaxis: {
                    min: 0,
                    //max: 200, // optional: use it for a clear representation
                    position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                    tickColor: '#eee'
                },
                shadowSize: 0
            };

            $scope.dataTemplate =
                [{
                    "label": "KPIs",
                    "color": "#564aa3",
                    "data": []
                }];

            vm.getUserReport();            
        }
    }
})();



/**=========================================================
 * Module: SwipeWinDashboard-TokenInjector.js
 * Interceptor that detects, compares and stores the token from inbound responses 
 * and injects the proper header in outbound requests
 * See http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard')
        .factory('TokenInjector', TokenInjector)
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('TokenInjector');
        }]);

    TokenInjector.$inject = ['$rootScope'];
    function TokenInjector($rootScope) {
        let tokenInjector = {
            request: function (config) {
                if ($rootScope.globals.authToken) {
                    config.headers['X-Access-Token'] = $rootScope.globals.authToken;
                }
                return config;
            },
            response: function (response) {
                const token = response.headers('x-access-token');
                if (token && $rootScope.globals.authToken != token) {
                    $rootScope.globals.authToken = token;
                    $rootScope.$storage.setItem('authToken', token);
                }
                return response;
            }
        };
        return tokenInjector;
    }
})();


/**=========================================================
 * Module: SwipeWinDashboard-search.js
 =========================================================*/
/*
(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.search', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$http', '$stateParams', '$location'];
    function SearchController($rootScope, $http, $stateParams, $location) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            if ($stateParams.module)
                vm.module = $stateParams.module;
            if ($stateParams.searchfor)
                vm.term = $stateParams.searchfor;
            else {
                const urlHash = $location.search();
                vm.term = urlHash['searchfor'];
                vm.module = urlHash['module'];
            }
            console.log(vm.term);
            console.log(vm.module);
        }
    }
})();
*/

/**=========================================================
 * Module: SwipeWinDashboard-login.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.login', [
        ]);
})();


(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.login')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$rootScope', 'SettingsService', '$http', '$state', '$location'];
    function LoginFormController($rootScope, SettingsService, $http, $state, $location) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';

            vm.login = function () {
                vm.authMsg = '';

                if (vm.loginForm.$valid) {

                    $http
                        .post(SettingsService.GetBackendUrl() + 'api/user/login', { email: vm.account.email, password: vm.account.password } )
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            // customize according to your api
                            if (!response.data || !response.data.id) {
                                vm.authMsg = 'Incorrect credentials.';
                            } else {
                                $rootScope.globals.currentUser = response.data;
                                $location.path('/app/home');
                            }
                        }, function (err) {
                            console.log(err);
                            vm.authMsg = 'Server Request Error';
                        });
                }
                else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.logout', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.logout')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$rootScope', '$location'];
    function LogoutController($rootScope, $location) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $rootScope.globals.currentUser = null;
            $rootScope.globals.authToken = null;
            $rootScope.$storage.removeItem('authToken');
            $location.path('/app/login');
        }
    }
})();


(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.component_paging', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.component_paging')
        .component('paging', {
            bindings: {
                paging: '='
                //getPage: '<',
                //firstPage: '<',
                //nextPage: '<',
                //previousPage: '<',
                //setPageSize: '&',
                //getPageSize: '<'
            },
            templateUrl: 'app/views/components/paging.html'
            // If we ever need a controller, this is the right way to write it with dependencies: https://stackoverflow.com/questions/35661200/angular-component-controller-injection-issue
        })
        ;
})();


// A component to render and get input from ISO 8601 duration formats
// For more information about this ISO, see: https://en.wikipedia.org/wiki/ISO_8601

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.component_duration_iso_8601', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.component_duration_iso_8601')
        .component('durationIso', {
            bindings: {
                duration: '=',
                disabled: '<'
            },
            templateUrl: 'app/views/components/duration-iso-8601.html',
            controller: DurationIso8601Controller
        })
        ;

    DurationIso8601Controller.$inject = [];
    function DurationIso8601Controller() {
        let vm = this;
        let years, months, days, hours, minutes, seconds;

        vm.changeYears = function (diff) {
            if (vm.years >= 0 && diff) {
                vm.years += diff;
                vm.onChange();
            }
        };

        vm.changeMonths = function (diff) {
            if (vm.months >= 0 && diff) {
                let potentialResult = vm.months + diff;
                if (potentialResult >= 0 && potentialResult <= 11) {
                    vm.months += diff;
                    vm.onChange();
                }
            }
        };

        vm.changeDays = function (diff) {
            if (vm.days >= 0 && diff) {
                let potentialResult = vm.days + diff;
                if (potentialResult >= 0 && potentialResult <= 30) {
                    vm.days += diff;
                    vm.onChange();
                }
            }
        };

        vm.changeHours = function (diff) {
            if (vm.hours >= 0 && diff) {
                let potentialResult = vm.hours + diff;
                if (potentialResult >= 0 && potentialResult <= 24) {
                    vm.hours += diff;
                    vm.onChange();
                }
            }
        };


        vm.changeMinutes = function (diff) {
            if (vm.minutes >= 0 && diff) {
                let potentialResult = vm.minutes + diff;
                if (potentialResult >= 0 && potentialResult <= 59) {
                    vm.minutes += diff;
                    vm.onChange();
                }
            }
        };

        vm.changeSeconds = function (diff) {
            if (vm.seconds >= 0 && diff) {
                let potentialResult = vm.seconds + diff;
                if (potentialResult >= 0 && potentialResult <= 59) {
                    vm.seconds += diff;
                    vm.onChange();
                }
            }
        };

        vm.activate = function () {

            vm.years = vm.months = vm.days = vm.hours = vm.minutes = vm.seconds = 0;

            vm.$doCheck = () => {
                if (vm.duration) {
                    let duration = moment.duration(vm.duration);
                    if (duration) {
                        vm.years = duration.years();
                        vm.months = duration.months();
                        vm.days = duration.days();
                        vm.hours = duration.hours();
                        vm.minutes = duration.minutes();
                        vm.seconds = duration.seconds();
                    }
                }
            };
        };

        vm.activate();

        vm.onChange = function () {
            vm.duration = `P${vm.years}Y${vm.months}M${vm.days}DT${vm.hours}H${vm.minutes}M${vm.seconds}S`;
        };
            
    }
})();



(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.component_datetime_picker', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.component_datetime_picker')
        .component('datetimePicker', {
            bindings: {
                disabled: '<',
                ngDisabled: '<',
                required: '<',
                ngRequired: '<',
                ngModel: '='
            },
            templateUrl: 'app/views/components/date-time-picker.html',
            controller: DatetimePickerComponentController
        })
        ;

    DatetimePickerComponentController.$inject = ['SettingsService'];
    function DatetimePickerComponentController(SettingsService) {
        var vm = this;

        vm.data = {
            dt: null,
            hours: 0,
            minutes: 0,
            minDate: null,
            opened: false,

            today: function () {
                this.dt = new Date();
            },
            clear: function () {
                this.dt = null;
            },

            // Disable selection
            disabled: function (date, mode) {
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            },

            toggleMin: function () {
                this.minDate = this.minDate ? null : new Date();
            },

            open: function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                this.opened = true;
            },

            setDate: function (year, month, day) {
                this.dt = new Date(year, month, day);
                vm.data.hours = vm.data.dt.getUTCHours();
                vm.data.minutes = vm.data.dt.getUTCMinutes();
            },

            onDateChange: function (newValue, oldValue) {
                if (vm.data.dt) {
                    vm.data.hours = vm.data.dt.getUTCHours();
                    vm.data.minutes = vm.data.dt.getUTCMinutes();
                    vm.ngModel = vm.data.dt.toISOString();
                }
            }
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.hourUp = function () {
            if (!vm.data.dt)
                return;

            if (vm.data.hours < 23) {
                vm.data.hours++;
            }
            else {
                vm.data.hours = 0;
            }
            vm.data.dt.setUTCHours(vm.data.hours);
            vm.ngModel = vm.data.dt.toISOString();
        };
        vm.hourDown = function () {
            if (!vm.data.dt)
                return;

            if (vm.data.hours > 1) {
                vm.data.hours--;
            }
            else {
                vm.data.hours = 23;
            }
            vm.data.dt.setUTCHours(vm.data.hours);
            vm.ngModel = vm.data.dt.toISOString();
        };
        vm.minuteUp = function () {
            if (!vm.data.dt)
                return;

            if (vm.data.minutes < 59) {
                vm.data.minutes++;
            }
            else {
                vm.data.minutes = 0;
            }
            vm.data.dt.setUTCMinutes(vm.data.minutes);
            vm.ngModel = vm.data.dt.toISOString();
        };
        vm.minuteDown = function () {
            if (!vm.data.dt)
                return;

            if (vm.data.minutes > 1) {
                vm.data.minutes--;
            }
            else {
                vm.data.minutes = 59;
            }
            vm.data.dt.setUTCMinutes(vm.data.minutes);
            vm.ngModel = vm.data.dt.toISOString();
        };

        vm.validateInput = function(format) {
            if (vm.required) {
                if (format === 'date')
                    return !!vm.data.dt;
            }
        };

        vm.$doCheck = function () {
            if (vm.ngModel && !vm.data.dt) {
                vm.data.dt = new Date(vm.ngModel);
                vm.data.hours = vm.data.dt.getUTCHours();
                vm.data.minutes = vm.data.dt.getUTCMinutes();
            }
        };

    }
})();



//(function () {
//    'use strict';

//    angular
//        .module('SwipeWinDashboard.component_useritem', [
//        ]);
//})();

//(function () {
//    'use strict';

//    angular
//        .module('SwipeWinDashboard.component_useritem')
//        .component('userItem', {
//            bindings: {
//                item: '=',
//                disabled: '<'
//            },
//            templateUrl: 'app/views/components/user-item.html'
//        })
//        ;
//})();



/**=========================================================
 * Module: SwipeWinDashboard-users.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.users', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.users')
        .controller('UserController', UserController)
        .component('userDetail', {
            bindings: {
                user: '='
            },
            templateUrl: 'app/views/users/user-detail-component.html', //helper.basepath('users/user-detail-component.html'),
            controller: UserController
        })
        ;

    UserController.$inject = ['SettingsService', '$scope', '$http', '$state', '$timeout'];
    function UserController(SettingsService, $scope, $http, $state, $timeout) {
        var vm = this;

        vm.infoMsg = null;
        vm.genderOptions = ['male', 'female'];
        vm.roleOptions = ['user', 'admin', 'game-admin', 'test', 'bot'];
        vm.countryCodes = SettingsService.countryCodes;


        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllUsers();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllUsers();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllUsers();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllUsers();
                }
            }
        };
        vm.users = [];
        vm.user = null;

        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.users' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllUsers();
            }
        });

        vm.getAllUsers = function () {

            let url = `${SettingsService.GetBackendUrl()}api/admin/user?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        //vm.authMsg = response.data.error || 'Error fetching users.';
                        console.log('no response for getting all users');
                    } else {
                        vm.users = response.data;

                        // Transform country codes to Upper
                        vm.users.forEach((u) => {
                            if (u.country)
                                u.country = u.country.toUpperCase();
                        });
                    }
                }, function (err) {
                    console.log(err);
                });
        };


        activate();

        ////////////////

        function activate() {
            // bind here all data from the form

            vm.getAllUsers();
        }

        vm.generateToken = function (userId) {
            return $http
                .get(SettingsService.GetBackendUrl() + 'api/admin/user/' + userId + '/token')
                .then(function (response) {
                    if (response.data && response.data.token) {
                        vm.infoMsg = `User ${userId} valid token: \n${response.data.token}`;
                        console.log(`User ${userId} valid token: \n${response.data.token}`);
                    }
                    else
                        vm.infoMsg = `Could not generate token for User ${userId}`;
                    $timeout(() => {
                        vm.infoMsg = null;
                    }, 15000);
                }, function (err) {
                        console.log(err);
                });
        };



        vm.setUser = function (user) {
            if (!user)
                return;

            vm.user = user;
        };

        vm.backToUsers = function () {
            vm.user = null;
        };

        vm.newUser = function () {
            vm.user = {};
            //$state.go('app.users_detail');
        };
    }
})();


/**=========================================================
 * Module: SwipeWinDashboard-userIcons.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.user_icons', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.user_icons')
        .controller('UserIconController', UserIconController);

    UserIconController.$inject = ['SettingsService', '$scope', '$http', 'toaster', '$window'];
    function UserIconController(SettingsService, $scope, $http, toaster, $window) {
        var vm = this;

        vm.userIconTemplate = {
            imageUrl: null,
            costInGems: null,
            costInCoins: null,
            isLocked: true,
            isDeleted: false
        };

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllUserIcons();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllUserIcons();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllUserIcons();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllUserIcons();
                }
            }
        };
        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.user_icons' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllUserIcons();
            }
        });



        vm.getAllUserIcons = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/avatar?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching all user Icons');
                    } else {
                        vm.userIcons = response.data;
                    }
                }, function (err) {
                    console.log(err);
                    toaster.pop('error', 'Error', err);
                });
        };

        activate();


        ////////////////

        function activate() {
            vm.userIcons = [];
            vm.userIcon = null;

            vm.getAllUserIcons();
        }

        vm.setUserIcon = function (userIcon) {
            if (userIcon) {
                vm.userIcon = userIcon;
            }

            // Alternatively:

            //if (userIcon) {
            //    vm.userIcon = vm.userIcons.find((elem) => {
            //        return elem.id === userIcon.id;
            //    });
            //}
        };

        vm.newUserIcon = function () {
            vm.userIcon = angular.copy(vm.userIconTemplate);
        };

        vm.backToUserIcons = function () {
            vm.userIcon = null;
        };

        vm.deleteUserIcon = function () {
            if ($window.confirm('Are you sure ??')) {
                const userIconId = vm.userIcon.id;
                if (userIconId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/avatar/' + userIconId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting the user Icon');
                            } else {
                                vm.userIcon.isDeleted = true;
                                vm.backToUserIcons();
                            }
                        }, function (err) {
                            console.log(err);
                            toaster.pop('error', 'Error', err);
                        });
                }
            }
        };

        vm.updateUserIcon = function () {

            const userIconId = vm.userIcon.id;
            if (userIconId) {
                return $http
                    .put(SettingsService.GetBackendUrl() + 'api/admin/avatar/' + userIconId, vm.userIcon)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error while updating the user Icon');
                        } else {
                            toaster.pop('success', 'Success', 'Successful update');
                            vm.userIcon = response.data;
                            vm.backToUserIcons();
                        }
                    }, function (err) {
                        console.log(err);
                        toaster.pop('error', 'Error', err);
                    });
            }
        };


        vm.saveNewUserIcon = function () {

            return $http
                .post(SettingsService.GetBackendUrl() + 'api/admin/avatar', vm.userIcon)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        toaster.pop('error', 'Error', 'Error while inserting the user Icon');
                    } else {
                        toaster.pop('success', 'Success', 'Successful insertion');
                        vm.userIcon = response.data;
                        vm.userIcons.push(vm.userIcon);
                        vm.backToUserIcons();
                    }
                }, function (err) {
                    console.log(err);
                    toaster.pop('error', 'Error', err);
                });
        };


    }
})();

/**=========================================================
 * Module: SwipeWinDashboard-items.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.items', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.items')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['SettingsService', '$scope', '$http', 'toaster', '$window'];
    function ItemController(SettingsService, $scope, $http, toaster, $window) {
        var vm = this;

        vm.itemTemplate = {
            name: { en: '' },
            description: { en: '' },
            rarity: 'common',
            duration: null,
            priceInCoins: 0,
            priceInGems: 0,
            isPermanent: false,
            minLevelToUnlock: 0,
            rewardRules: []
        };

        vm.operandOptions = ['coins', 'gems', 'ads', 'hints', 'xp'];
        vm.operationOptions = ['*', '+'];
        vm.typeOptions = ['coin-tree-grind', 'coin-tree-capacity', 'gems-reward', 'coins-reward', 'xp-reward', 'entry-cost', 'question-hint', 'question-skip', 'question-time'];
        vm.gameScopeOptions = SettingsService.gameScopeOptions;
        vm.rarityOptions = SettingsService.rarityOptions;

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllItems();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllItems();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllQuestions();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllItems();
                }
            }
        };
        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.items' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllItems();
            }
        });


        vm.getAllItems = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/market/item?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching the items');
                    } else {
                        vm.items = response.data;

                        if (vm.allRewardRules.length > 0) {
                            let rulesLookup = _.keyBy(vm.allRewardRules, 'id');
                            vm.items.forEach((i) => {
                                if (i.rewardRules && i.rewardRules.length > 0) {
                                    i.rewardRules.forEach((r) => {
                                        if (rulesLookup[r.id])
                                            r = rulesLookup[r.id];
                                    });
                                }
                            });
                        }
                    }
                }, function (err) {
                    console.log(err);
                    toaster.pop('error', 'Error', err);
                });
        };
        vm.getAllRewardRules = function () {
            return $http
                .get(`${SettingsService.GetBackendUrl()}api/admin/market/reward-rule?pageSize=${0}&page=${0}`)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching the independent Item buffs');
                    } else {
                        vm.allRewardRules = response.data;
                    }
                }, function (err) {
                    console.log(err);
                    toaster.pop('error', 'Error', err);
                });
        };

        activate();


        ////////////////

        function activate() {
            vm.items = [];
            vm.item = null;
            vm.allRewardRules = [];

            vm.getAllRewardRules();
            vm.getAllItems();
        }

        vm.setItem = function (item) {
            if (item) {
                vm.item = item;
            }
        };

        vm.newItem = function () {
            vm.item = angular.copy(vm.itemTemplate);
        };

        vm.backToItems = function () {
            vm.item = null;
        };

        vm.deleteItem = function () {

            if ($window.confirm('Are you sure ??')) {
                const itemId = vm.item.id;
                if (itemId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/market/item/' + itemId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting the item');
                            } else {
                                toaster.pop('success', 'Success', 'Successful deletion');

                                vm.item.isDeleted = true;
                                vm.backToItems();
                            }
                        }, function (err) {
                            console.log(err);
                            toaster.pop('error', 'Error', err);
                        });
                }
            }
        };

        vm.updateItem = function () {

            const itemId = vm.item.id;
            if (itemId) {
                return $http
                    .put(SettingsService.GetBackendUrl() + 'api/admin/market/item/' + itemId, vm.item)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error while updating the item');
                        } else {
                            toaster.pop('success', 'Success', 'Successful update');

                            vm.item = response.data;
                            vm.backToItems();
                        }
                    }, function (err) {
                        console.log(err);
                        toaster.pop('error', 'Error', err);
                    });
            }
        };


        vm.saveNewItem = function () {

            return $http
                .post(SettingsService.GetBackendUrl() + 'api/admin/market/item', vm.item)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        toaster.pop('error', 'Error', 'Error while inserting the item');
                    } else {
                        toaster.pop('success', 'Success', 'Successful insertion');

                        vm.item = response.data;
                        vm.items.push(vm.item);

                        vm.backToItems();
                    }
                }, function (err) {
                    console.log(err);
                    toaster.pop('error', 'Error', err);
                });
        };

        vm.removeRule = function (rule) {
            if (!vm.item)
                return;

            var index = vm.item.rewardRules.indexOf(rule);
            vm.item.rewardRules.splice(index, 1);
        };

        vm.addRule = function () {
            if (!vm.item)
                return;

            if (!vm.rewardRules)
                vm.rewardRules = [];

            vm.item.rewardRules.push({
                title: {},
                subtitle: {},
                spriteName: '',
                gameModeScopes: [],
                modifier: '1',
                operation: '*',
                isStackable: true,
                type: ''
            });
        };

    }
})();



/**=========================================================
 * Module: SwipeWinDashboard-bundle.js
 =========================================================*/

    (function () {
        'use strict';

        angular
            .module('SwipeWinDashboard.bundle', [
            ]);
    })();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.bundle')
        .controller('SpecialBundleController', SpecialBundleController);

    SpecialBundleController.$inject = ['SettingsService', '$scope', '$http', 'toaster', '$window'];
    function SpecialBundleController(SettingsService, $scope, $http, toaster, $window) {
        var vm = this;

        vm.bundleTemplate = {
            name: { en: '' },
            imageUrl: null,
            iconUrl: null,
            storeId: null,
            itemIds: [],
            payoutInCoins: 0,
            payoutInGems: 0,
            priceOffPercentage: 0,
            startsAt: null,
            endsAt: null,
            isDeleted: false
        };

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllBundles();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllBundles();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllBundles();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllBundles();
                }
            }
        };
        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.bundle' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllBundles();
            }
        });

        vm.getAllItems = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/market/item/headers`;

            return $http
                .get(url)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching the items');
                    } else {
                        vm.items = response.data;
                    }
                }, function (err) {
                    console.log(err);
                    toaster.pop('error', 'Error', err);
                });
        };


        vm.getAllBundles = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/market/bundle?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching the bundle');
                    } else {
                        vm.bundles = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        };

        activate();


        ////////////////

        function activate() {
            vm.bundles = [];
            vm.bundle = null;

            vm.getAllBundles();
            vm.getAllItems();
        }

        vm.setBundle = function (bundle) {
            if (bundle) {
                vm.bundle = bundle;
            }
        };

        vm.newBundle = function () {
            vm.bundle = angular.copy(vm.bundleTemplate);
        };

        vm.backToBundles = function () {
            vm.bundle = null;
        };

        vm.deleteBundle = function () {

            if ($window.confirm('Are you sure ??')) {
                const bundleId = vm.bundle.id;
                if (bundleId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/market/bundle/' + bundleId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting the bundle');
                            } else {
                                toaster.pop('success', 'Success', 'Successful deletion');

                                vm.bundle.isDeleted = true;
                                vm.backToBundles();
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }
        };

        vm.updateBundle = function () {

            const bundleId = vm.bundle.id;
            if (bundleId) {
                return $http
                    .put(SettingsService.GetBackendUrl() + 'api/admin/market/bundle/' + bundleId, vm.bundle)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error while updating the bundle');
                        } else {
                            toaster.pop('success', 'Success', 'Successful update');

                            vm.bundle = response.data;
                            vm.backToBundles();
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }
        };


        vm.saveNewBundle = function () {

            return $http
                .post(SettingsService.GetBackendUrl() + 'api/admin/market/bundle', vm.bundle)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        toaster.pop('error', 'Error', 'Error while inserting the bundle');
                    } else {
                        toaster.pop('success', 'Success', 'Successful insertion');

                        vm.bundle = response.data;
                        vm.bundles.push(vm.bundle);

                        vm.backToBundles();
                    }
                }, function (err) {
                    console.log(err);
                });
        };


    }
})();



/**=========================================================
 * Module: SwipeWinDashboard-inapp_products.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.inapp_products', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.inapp_products')
        .controller('InAppController', InAppController);

    InAppController.$inject = ['SettingsService', '$scope', '$http', 'toaster', '$window'];
    function InAppController(SettingsService, $scope, $http, toaster, $window) {
        var vm = this;

        vm.inappItemTemplate = {
            name: { en: '' },
            imageUrl: null,
            storeId: null,
            payoutInCoins: 0,
            isDeleted: false,
            popular: null,
            bestValue: null
        };
        vm.inappItems = [];
        vm.inappItem = null;

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllInAppItems();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllInAppItems();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllInAppItems();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllInAppItems();
                }
            }
        };
        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.inapp_products' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllInAppItems();
            }
        });



        vm.getAllInAppItems = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/market/coin?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching the in-app products');
                    } else {
                        vm.inappItems = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        };

        activate();


        ////////////////

        function activate() {
            vm.inappItems = [];
            vm.inappItem = null;

            vm.getAllInAppItems();
        }

        vm.setInappItem = function (inappItem) {
            if (inappItem) {
                vm.inappItem = inappItem;
            }
        };

        vm.newInappItem = function () {
            vm.inappItem = angular.copy(vm.inappItemTemplate);
        };

        vm.backToInappItems = function () {
            vm.inappItem = null;
        };

        vm.deleteInappItem = function () {
            if ($window.confirm('Are you sure ??')) {
                const inappItemId = vm.inappItem.id;
                if (inappItemId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/market/coin/' + inappItemId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting the in-app product');
                            } else {
                                toaster.pop('success', 'Success', 'Successful deletion');

                                vm.inappItem.isDeleted = true;
                                vm.backToInappItems();
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }
        };

        vm.updateInappItem = function () {

            const inappItemId = vm.inappItem.id;
            if (inappItemId) {
                return $http
                    .put(SettingsService.GetBackendUrl() + 'api/admin/market/coin/' + inappItemId, vm.inappItem)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error while updating the in-app product');
                        } else {
                            toaster.pop('success', 'Success', 'Successful update');

                            vm.inappItem = response.data;
                            vm.backToInappItems();
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }
        };


        vm.saveNewInappItem = function () {

            return $http
                .post(SettingsService.GetBackendUrl() + 'api/admin/market/coin', vm.inappItem)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        toaster.pop('error', 'Error', 'Error while inserting the in-app product');
                    } else {
                        toaster.pop('success', 'Success', 'Successful insertion');

                        vm.inappItem = response.data;
                        vm.inappItems.push(vm.inappItem);

                        vm.backToBundles();
                    }
                }, function (err) {
                    console.log(err);
                });
        };


    }
})();


/**=========================================================
 * Module: SwipeWinDashboard-draws.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.draws', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.draws')
        .controller('DrawController', DrawController);

    DrawController.$inject = ['SettingsService', '$scope', '$http', 'toaster', '$window'];
    function DrawController(SettingsService, $scope, $http, toaster, $window) {
        var vm = this;

        vm.drawTemplate = {
            title: { en: '' },
            description: { en: '' },
            imageUrl: null,
            imageSquareUrl: null,
            isDeleted: false,
            isCompleted: false,
            startsAt: null,
            endsAt: null,
            recurringPattern: null,
            recurringParentId: null,
            minTicketNumber: 0,
            ticketCostInGems: 1,
            maxTicketNumber: 0,
            eligibleInCountries: []
        };

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllDraws();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllDraws();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllDraws();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllDraws();
                }
            }
        };
        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.draws' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllDraws();
            }
        });



        vm.getAllDraws = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/market/draw?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching the draws');
                    } else {
                        vm.draws = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        };

        activate();


        ////////////////

        function activate() {
            vm.draws = [];
            vm.draw = null;

            vm.getAllDraws();
        }

        vm.setDraw = function (draw) {
            if (draw) {
                vm.draw = draw;
            }
        };

        vm.newDraw = function () {
            vm.draw = angular.copy(vm.drawTemplate);
        };

        vm.backToDraws = function () {
            vm.draw = null;
        };

        vm.deleteDraw = function () {
            if ($window.confirm('Are you sure ??')) {
                const drawId = vm.draw.id;
                if (drawId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/market/draw/' + drawId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting the draw');
                            } else {
                                toaster.pop('success', 'Success', 'Successful deletion');

                                vm.draw.isDeleted = true;
                                vm.backToDraws();
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }
        };

        vm.updateDraw = function () {

            const drawId = vm.draw.id;
            if (drawId) {
                return $http
                    .put(SettingsService.GetBackendUrl() + 'api/admin/market/draw/' + drawId, vm.draw)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error while updating the draw');
                        } else {
                            toaster.pop('success', 'Success', 'Successful update');

                            vm.draw = response.data;
                            vm.backToDraws();
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }
        };


        vm.saveNewDraw = function () {

            return $http
                .post(SettingsService.GetBackendUrl() + 'api/admin/market/draw', vm.draw)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        toaster.pop('error', 'Error', 'Error while inserting the draw');
                    } else {
                        toaster.pop('success', 'Success', 'Successful insertion');

                        vm.draw = response.data;
                        vm.draws.push(vm.draw);

                        vm.backToDraws();
                    }
                }, function (err) {
                    console.log(err);
                });
        };


    }
})();


/**=========================================================
 * Module: SwipeWinDashboard-instant_prizes.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.instant_prizes', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.instant_prizes')
        .controller('InstantPrizeController', InstantPrizeController);

    InstantPrizeController.$inject = ['SettingsService', '$scope', '$http', 'toaster', '$window'];
    function InstantPrizeController(SettingsService, $scope, $http, toaster, $window) {
        var vm = this;

        vm.instantPrizeTemplate = {
            title: { en: '' },
            description: { en: '' },
            imageUrl: null,
            imageSquareUrl: null,
            startsAt: null,
            endsAt: null,
            itemsInStock: 1,
            maxCountPerUser: 1,
            isDeleted: false,
            isCompleted: false,
            costInGems: 0,
            eligibleInCountries: []
        };

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllInstantPrizes();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllInstantPrizes();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllInstantPrizes();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllInstantPrizes();
                }
            }
        };
        vm.filtering = {
            search: null,
            id: null,
            username: null
        };

        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.instant_prizes' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filtering.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllInstantPrizes();
            }
        });



        vm.getAllInstantPrizes = function () {
            let url = `${SettingsService.GetBackendUrl()}api/admin/market/instant-prize?pageSize=${vm.paging.pageSize}&page=${vm.paging.page}`;
            if (vm.filtering.search)
                url += `&search=${vm.filtering.search}`;

            return $http
                .get( url )
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        //vm.authMsg = response.data.error || 'Error fetching users.';
                    } else {
                        vm.instantPrizes = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        };

        activate();


        ////////////////

        function activate() {
            vm.instantPrizes = [];
            vm.instantPrize = null;

            vm.getAllInstantPrizes();
        }

        vm.setInstantPrize = function (instantPrize) {
            if (instantPrize) {
                vm.instantPrize = instantPrize;
            }
        };

        vm.newInstantPrize = function () {
            vm.instantPrize = angular.copy(vm.instantPrizeTemplate);
        };

        vm.backToInstantPrizes = function () {
            vm.instantPrize = null;
        };

        vm.deleteInstantPrize = function () {
            if ($window.confirm('Are you sure ??')) {
                const instantPrizeId = vm.instantPrize.id;
                if (instantPrizeId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/market/instant-prize/' + instantPrizeId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting the item');
                            } else {
                                vm.instantPrize.isDeleted = true;
                                vm.backToInstantPrizes();
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }
        };

        vm.updateInstantPrize = function () {

            const instantPrizeId = vm.instantPrize.id;
            if (instantPrizeId) {
                return $http
                    .put(SettingsService.GetBackendUrl() + 'api/admin/market/instant-prize/' + instantPrizeId, vm.instantPrize)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error while updating the instantPrize');
                        } else {
                            toaster.pop('success', 'Success', 'Successful update');
                            vm.instantPrize = response.data;
                            vm.backToInstantPrizes();
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }
        };


        vm.saveNewInstantPrize = function () {

            return $http
                .post(SettingsService.GetBackendUrl() + 'api/admin/market/instant-prize', vm.instantPrize)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    if (!response.data) {
                        toaster.pop('error', 'Error', 'Error while inserting the instantPrize');
                    } else {
                        toaster.pop('success', 'Success', 'Successful insertion');
                        vm.instantPrize = response.data;
                        vm.instantPrizes.push(vm.instantPrize);

                        vm.backToInstantPrizes();
                    }
                }, function (err) {
                    console.log(err);
                });
        };


    }
})();



/**=========================================================
 * Module: SwipeWinDashboard-questions.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.questions', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.questions')
        .controller('QuestionController', QuestionController);

    QuestionController.$inject = ['$rootScope', 'SettingsService', '$scope', '$http', '$window', 'toaster' ];
    function QuestionController($rootScope, SettingsService, $scope, $http, $window, toaster) {
        var vm = this;

        // bind here all data from the form
        vm.questions = [];
        vm.question = null;

        vm.paging = {
            pageSize: 10,
            page: 1,
            nextPage: function () {
                vm.paging.page++;
                vm.getAllQuestions();
            },
            previousPage: function () {
                if (vm.paging.page > 1) {
                    vm.paging.page--;
                    vm.getAllQuestions();
                }
            },
            firstPage: function () {
                vm.paging.page = 1;
                vm.getAllQuestions();
            },
            setPageSize: function (newSize) {
                if (newSize > 0 && newSize <= 100 && vm.paging.pageSize !== newSize) {
                    vm.paging.pageSize = newSize;
                    vm.getAllQuestions();
                }
            }
        };


        vm.filter = {
            type: null,
            category: null,
            difficultyLevel: null,
            isDeleted: null,
            search: null,
            id: null,
            username: null
        };
        $scope.$on('search', function (e, args) {
            if (!e.defaultPrevented && args && args.module === 'app.questions' && args.searchfor) {
                //e.preventDefault();
                console.log('Detected search event for ' + args.searchfor);
                vm.filter.search = args.searchfor;

                vm.paging.page = 1;
                vm.getAllQuestions();
            }
        });

        vm.difficultyLevelOptions = SettingsService.difficultyLevelOptions;
        vm.countryCodes = SettingsService.countryCodes;
        vm.countryLookup = SettingsService.countryLookup;
        vm.typeOptions = SettingsService.questionTypeOptions;


        // Default object for a new question
        vm.questionTemplate = {
            title: { en: '', gr: '', ru: '' },
            difficultyLevel: 0,
            category: 'general',
            type: 'true or false',
            choices: {
                '0': { title: { en: 'Yes', gr: 'Ναι', ru: 'да' } },
                '1': { title: { en: 'No', gr: 'Όχι', ru: 'нет' } }
            }
        };
        vm.howCloseProgress = 0;

        vm.updateChoices = function () {
            const typeNew = vm.question.type;

            if (typeNew === 'true or false') {
                vm.question.choices = {
                    "0": {
                        title: { en: 'True' }
                    },
                    "1": {
                        title: { en: 'False' }
                    }
                };
            }
            else if (typeNew === 'multiple choice') {
                vm.question.choices = {
                    '0': { title: {} },
                    '1': { title: {} },
                    '2': { title: {} },
                    '3': { title: {} }
                };
            }
            else if (typeNew === 'how close') {
                vm.question.choices = {};
            }
            else if (typeNew === 'get 4 of 6') {
                vm.question.choices = {
                    '0': { title: {} },
                    '1': { title: {} },
                    '2': { title: {} },
                    '3': { title: {} },
                    '4': { title: {} },
                    '5': { title: {} }
                };
            }
        };

        vm.warnMsg = vm.okMsg = vm.infoMsg = vm.alarmMsg = null;

        const populateCategoryOptions = function () {
            let categoryOptions = [];
            const settings = SettingsService.GetGameSettings();
            const categoryLookup = settings['question-corpus-entry']['game-categories'];
            const keys = Object.keys(categoryLookup);
            keys.forEach((key) => {
                if (categoryLookup[key].en)
                    categoryOptions.push({ id: key, value: categoryLookup[key].en });
            });
            return categoryOptions;
        };

        vm.categoryOptions = populateCategoryOptions();

        vm.getAllQuestions = function () {
            let url = SettingsService.GetBackendUrl() + 'api/admin/question?';

            url += 'page=' + vm.paging.page;
            url += '&pageSize=' + vm.paging.pageSize;

            if (vm.filter.type) {
                url += '&type=' + vm.filter.type;
            }
            if (vm.filter.category) {
                url += '&category=' + vm.filter.category;
            }
            if (vm.filter.difficultyLevel) {
                url += '&difficultyLevel=' + vm.filter.difficultyLevel;
            }
            if (vm.filter.isDeleted) {
                url += '&isDeleted=' + vm.filter.isDeleted;
            }
            if (vm.filter.search)
                url += `&search=${vm.filter.search}`;

            return $http
                .get(url)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !Array.isArray(response.data)) {
                        toaster.pop('error', 'Error', 'Error while fetching questions');
                    } else {
                        vm.questions = response.data;

                        vm.questions.forEach((question) => {
                            if (question.answer !== 'undefined' && question.answer != null) {
                                if (question.type && (question.type === 'multiple choice' || question.type === 'true or false'))
                                    question.answer = question.answer.toString();
                                else if (question.type && question.type === 'get 4 of 6') {
                                    question.answer = question.answer.map((i) => { return i.toString(); });
                                }
                            }
                        });
                    }
                }, function (err) {
                    toaster.pop('error', 'Error', 'Error while fetching questions: ' + err);
                });
        };

        activate();

        ////////////////

        function activate() {
            // place the message if something goes wrong

            vm.getAllQuestions();
        }

        vm.setQuestion = function (question) {
            if (question) {
                vm.question = question;
            }
        };

        vm.backToQuestions = function () {
            vm.question = null;
        };

        vm.newQuestion = function () {
            vm.question = angular.copy(vm.questionTemplate);
        };


        vm.deleteQuestion = function () {

            if ($window.confirm('Are you sure ??')) {
                const questionId = vm.question.id;
                if (questionId) {
                    return $http
                        .delete(SettingsService.GetBackendUrl() + 'api/admin/question/' + questionId)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error while deleting');
                            } else {
                                toaster.pop('success', 'Success', 'Successful deletion');

                                vm.question.isDeleted = true;
                                vm.backToQuestions();
                            }
                        }, function (err) {
                            toaster.pop('error', 'Error', 'Error while deleting: ' + err);
                        });
                }
            }
        };

        vm.updateQuestion = function () {

            const sanitizedQ = vm.sanitizeQuestion();
            if (!sanitizedQ) {
                const warnMsg = 'The question is incomplete (type or answer is missing)';
                toaster.pop('warning', 'Warning', warnMsg);
            }
            else {
                const questionId = vm.question.id;
                if (questionId) {
                    return $http
                        .put(SettingsService.GetBackendUrl() + 'api/admin/question/' + questionId, vm.question)
                        .then(function (response) {
                            // assumes if ok, response is an object with some data, if not, a string with error
                            if (!response.data) {
                                toaster.pop('error', 'Error', 'Error on update');
                            } else {
                                toaster.pop('success', 'Success', 'Successful update');
                                vm.backToQuestions();
                            }
                        }, function (err) {
                            toaster.pop('error', 'Error', 'Error while updating the question: ' + err);
                        });
                }
            }
        };


        vm.saveNewQuestion = function () {

            const sanitizedQ = vm.sanitizeQuestion();
            if (!sanitizedQ) {
                const warnMsg = 'The question is incomplete (type or answer is missing)';
                toaster.pop('warning', 'Warning', warnMsg);
            }
            else {
                return $http
                    .post(SettingsService.GetBackendUrl() + 'api/admin/question', sanitizedQ)
                    .then(function (response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        if (!response.data) {
                            toaster.pop('error', 'Error', 'Error on insertion');
                        } else {
                            toaster.pop('success', 'Success', 'Successful insertion');
                            vm.questions.push(vm.question);
                            vm.backToQuestions();
                        }
                    }, function (err) {
                        toaster.pop('error', 'Error', 'Error while inserting the question: ' + err);
                    });
            }
        };

        vm.sanitizeQuestion = function () {
            const q = vm.question;
            if (q.answer === undefined || q.answer === null || !q.type)
                return null;

            const sanitizedQ = angular.copy(q);
            if (sanitizedQ.type === 'how close')
                return sanitizedQ;
            else if (sanitizedQ.type === 'get 4 of 6') {
                sanitizedQ.answer = sanitizedQ.answer.map(Number);
            }
            else {
                sanitizedQ.answer = Number(sanitizedQ.answer);
            }

            return sanitizedQ;
        };

        vm.computeHowCloseRange = function () {
            const q = vm.question;

            if (q.answer === 'undefined' || q.answer === null || !q.type || q.type !== 'how close')
                return null;

            const stepValue = Math.pow(10, q.answer.toString().length - 2) / 10;
            const randomStep = Math.random() * 100;

            q.choiceMaximum = Math.trunc(q.answer + randomStep * stepValue);
            q.choiceMinimum = Math.trunc(q.answer - (100 - randomStep) * stepValue);

            vm.howCloseProgress = q.choiceMaximum ? 100 * (q.answer - q.choiceMinimum) / (q.choiceMaximum - q.choiceMinimum) : 0;
        };

        vm.removeChoice = function (choice) {
            let keys = Object.keys(vm.question.choices);
            keys.forEach((key) => {
                if (vm.question.choices[key] === choice)
                    delete vm.question.choices[key];
            });
        };

        vm.addChoice = function () {
            let keys = Object.keys(vm.question.choices);
            keys.sort();
            vm.question.choices[keys.length.toString()] = {
                title: {
                    en: ''
                }
            };
        };
    }
})();



(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.questions_import', [
            
        ]);
})();


(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.questions_import')
        .controller('QuestionImportController', QuestionImportController);

    QuestionImportController.$inject = ['$stateParams', 'SettingsService', '$scope', '$http', 'toaster'];
    function QuestionImportController($stateParams, SettingsService, $scope, $http, toaster) {
        var vm = this;

        vm.fileToUpload = null;
        vm.model = {
            delimiter: 'tab',
            header: true
        };
        vm.allDelimiters = //['Comma', 'Space', 'Semicolon', 'Tab'];
            [
                { key: 'Comma \',\'', value: 'comma' },
                { key: 'Space \' \'', value: 'space' },
                { key: 'Semicolon \';\'', value: 'semicolon' },
                { key: 'Tab \'\\t\'', value: 'tab' }
            ];

        activate();

        ////////////////



        vm.upload = function () {

            if (!vm.fileToUpload || vm.fileToUpload === '')
                return;

            const url = SettingsService.GetBackendUrl() + 'api/admin/question/import?delimiter=' + vm.model.delimiter + '&header=' + vm.model.header;

            return $http
                .post(url, vm.fileToUpload, {
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                })
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !response.data instanceof Object || response.status >= 400) {
                        toaster.pop('error', 'Error', 'Error while importing the questions file');
                    } else {
                        toaster.pop('success', 'Success', 'Successful import of questions file: ' + response.data);
                        console.log(response.data);
                    }
                }, function (err) {
                    toaster.pop('error', 'Error', 'Error while importing the questions file: ' + err);
                    console.log(err);
                });

        };


        function activate() {
        }
    }
})();



/**=========================================================
 * Module: SwipeWinDashboard-game_settings.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.game_settings', [
        ]);
})();

(function () {
    'use strict';

    angular
        .module('SwipeWinDashboard.game_settings')
        .controller('GameSettingsController', GameSettingsController);

    GameSettingsController.$inject = ['SettingsService', '$http', '$state', 'toaster', '$q'];
    function GameSettingsController(SettingsService, $http, $state, toaster, $q) {
        var vm = this;
        vm.validRewards = ['pouch', 'wood-chest', 'silver-chest', 'gold-chest', 'legendary-chest'];

        activate();


        ////////////////

        function activate() {
            // bind here all data from the form
            vm.model = {};

            vm.serverSettings = null;
            vm.model = SettingsService.GetGameSettings();

            vm.getGameSettings = function () {
                /*
                    $q.all({
                        settings: $http.get(SettingsService.GetBackendUrl() + 'api/admin/game-settings'),
                        gameRewards: $http.get(SettingsService.GetBackendUrl() + 'api/admin/game-rewards?pageSize=0&page=1')
                    }).then((results) => {
                        if (!results.settings.data || !response.data instanceof Object || !results.gameRewards.data) {
                            toaster.pop('error', 'Error', 'Error during fetching settings');
                        } else {
                            vm.model = results.settings.data;
                            vm.rewards = results.gameRewards.data;
                        }

                    }, (err) => {
                            toaster.pop('error', 'Error', 'Error during fetching settings: ' + err.message);
                            console.error(err);
                    });
                 * */

                return $http
                    .get(SettingsService.GetBackendUrl() + 'api/admin/game-reward?pageSize=0&page=1')
                    .then(function (response) {
                        if (!response.data || !response.data instanceof Object) {
                            toaster.pop('error', 'Error', 'Error during fetching settings');
                        } else {
                            vm.rewards = response.data;
                        }
                    }, function (err) {
                        toaster.pop('error', 'Error', 'Error during fetching settings: ' + err.message);
                        console.error(err);
                    });
            };
            vm.getGameSettings();
        }

        vm.removeCategory = function (key) {
            if (vm.model && vm.model['question-corpus-entry'] && vm.model['question-corpus-entry']['game-categories'] && vm.model['question-corpus-entry']['game-categories'][key] !== 'undefined') {
                delete vm.model['question-corpus-entry']['game-categories'][key];
            }
        };

        vm.addCategory = function (newKey) {
            if (newKey && vm.model && vm.model['question-corpus-entry'] && vm.model['question-corpus-entry']['game-categories']) {
                vm.model['question-corpus-entry']['game-categories'][newKey] = { en: 'New Category' };
            }
        };

        vm.backToHome = function () {
            $state.go('app.home');
        };

        vm.save = function () {
            return $http
                .put(SettingsService.GetBackendUrl() + 'api/admin/game-settings', vm.model)
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !response.data instanceof Object) {
                        toaster.pop('warning', 'Warning', 'Possible server Error during update');
                    } else {
                        toaster.pop('success', 'Success', 'Successful update');
                        vm.model = response.data;
                    }
                }, function (err) {
                    toaster.pop('error', 'Error', 'Error during update: ' + err.message);
                    console.error(err);
                });
        };

        vm.getServerSettings = function () {
            return $http
                .get(SettingsService.GetBackendUrl() + 'api/admin/game-settings/server')
                .then(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (!response.data || !response.data instanceof Object) {
                        toaster.pop('warning', 'Warning', 'Possible server Error during update');
                    } else {
                        vm.serverSettings = response.data;
                    }
                }, function (err) {
                    toaster.pop('error', 'Error', 'Error during update: ' + err.message);
                    console.error(err);
                });
        };

        vm.addDesertExitReward = function (greaterThan, value) {
            if (!vm.model || !vm.model['desert-user-exit'] || !vm.model['desert-user-exit']['pointsToGameRewards'])
                return;

            angular.forEach(vm.model['desert-user-exit']['pointsToGameRewards'], (item) => {
                if (item.greaterThan == greaterThan) {
                    item.reward.push(value);
                }
            });
        };

        vm.removeDesertExitReward = function (greaterThan, value) {
            if (!vm.model || !vm.model['desert-user-exit'] || !vm.model['desert-user-exit']['pointsToGameRewards'])
                return;

            angular.forEach(vm.model['desert-user-exit']['pointsToGameRewards'], (item) => {
                if (item.greaterThan == greaterThan && item.reward.indexOf(value) > -1) {
                    item.reward.splice(item.reward.indexOf(value), 1);
                }
            });
        };

        vm.deleteDesertExitRewardRule = function (greaterThan) {
            if (!vm.model || !vm.model['desert-user-exit'] || !vm.model['desert-user-exit']['pointsToGameRewards'])
                return;

            let foundIndex = -1;
            angular.forEach(vm.model['desert-user-exit']['pointsToGameRewards'], (item, index) => {
                if (foundIndex == -1 && item.greaterThan == greaterThan) {
                    foundIndex = index;
                }
            });
            if (foundIndex > -1)
                (vm.model['desert-user-exit']['pointsToGameRewards']).splice(foundIndex, 1);
        };
    }
})();

