'use strict';
angular.module('w11k.angular-seo-header', []);
angular.module('w11k.angular-seo-header').directive('head', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        var  html ='<title ng-if="head.title">{{head.title}}</title>' +
            '<meta name="keywords" content="{{head.keywords}}" ng-if="head.keywords">' +
            '<meta name="description" content="{{head.description}}" ng-if="head.description">' +
            '<meta name="robots" content="{{head.robots}}" ng-if="head.robots">' +
            '<link rel="canonical" href="{{head.canonical}}" ng-if="head.canonical"/>';
        return {
            restrict: 'E',
            link: function(scope, elem) {
                elem.append($compile(html)(scope));
                scope.head = {};
                $rootScope.$on('$stateChangeStart', function (event, toState,toParams) { //fromParams
                    if(toState.data.head){
                        scope.head = {
                            title: toState.data.head.title,
                            keywords:  toState.data.head.keywords ? toState.data.head.keywords.join(',')  : false,
                            description:toState.data.head.description,
                            robots:toState.data.head.robots,
                            canonical:toState.data.head.canonical
                        };
                    } else {
                        scope.head = {};
                    }
                    if(toState.data.head.canonicalExtend){              // extend function is defined
                        scope.head.canonical= toState.data.head.canonicalExtend(scope.head.canonical, toParams);
                    }
                    if(toState.data.head.titleExtend){              // extend function is defined
                        scope.head.title = toState.data.head.titleExtend(scope.head.title, toParams);
                    }

                });
            }};
    }
]);