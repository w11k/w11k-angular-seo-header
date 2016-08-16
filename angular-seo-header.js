'use strict';
angular.module('w11k.angular-seo-header', []);
angular.module('w11k.angular-seo-header').directive('head', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        var  html ='<title ng-if="head.title">{{head.title}}</title>' +
            '<meta name="keywords" content="{{head.keywords}}" ng-if="head.keywords">' +
            '<meta name="description" content="{{head.description}}" ng-if="head.description">' +
            '<meta name="robots" content="{{head.robots}}" ng-if="head.robots">' +
            '<link rel="canonical" href="{{head.canonical}}" ng-if="head.canonical"/>' +
            '<link rel="alternate" ng-repeat="(lang, href) in head.hreflangs" href="{{href}}" hreflang="{{lang}}"/>';
        return {
            restrict: 'E',
            link: function(scope, elem) {

                elem.append($compile(html)(scope));
                scope.head = {};

                $rootScope.$on('$stateChangeStart', function (event, toState,toParams) {
                    if(toState.data && toState.data.head){
                        // head data are available for upcoming view, directive jumps in:

                        var canonical,
                            title,
                            description,
                            keywords,
                            hreflangs;

                        if(toState.data.head.canonicalExtend){              // extend function is defined
                            canonical= toState.data.head.canonicalExtend(toState.data.head.canonical, toParams);
                        } else {
                            canonical =  toState.data.head.canonical;
                        }

                        if(toState.data.head.titleExtend){              // extend function is defined
                            title = toState.data.head.titleExtend(toState.data.head.title, toParams);
                        } else {
                            title = toState.data.head.title;
                        }

                        if(toState.data.head.descriptionExtend){              // extend function is defined
                            description = toState.data.head.descriptionExtend(toState.data.head.description, toParams);
                        } else {
                            description = toState.data.head.description;
                        }

                        if(toState.data.head.keywordsExtend){              // extend function is defined
                            keywords = toState.data.head.keywordsExtend(toState.data.head.keywords, toParams);
                        } else {
                            keywords = toState.data.head.keywords;
                        }

                        if(toState.data.head.hreflangsExtend){              // extend function is defined
                            hreflangs = toState.data.head.hreflangsExtend(toState.data.head.hreflangs, toParams);
                        } else {
                            hreflangs = toState.data.head.hreflangs;
                        }


                        scope.head = {
                            title: title,
                            keywords:  keywords ? keywords.join(',')  : false,
                            description:description,
                            robots:toState.data.head.robots,
                            canonical:canonical,
                            hreflangs: hreflangs
                        };

                    } else {
                        scope.head = {};
                    }
                });
            }};
    }
]);