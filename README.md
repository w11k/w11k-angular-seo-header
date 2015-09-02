# w11k.angular-seo-header
works with ui router's pageData' and allows you to set following html tags in the head of your single page application:

* page title
* meta description
* canonical tags
* meta robots (index follow)
* meta keywords



## how to

    bower install --save w11k.angular-seo-header

### 1. include module
     angular.module('myModule', ['w11k.angular-seo-header',]);

### 2. add the data to your view's

add the following data.head object to your view initialisation and fill in your content.

    var module = angular.module('myModule', ['ui.router', 'w11k.angular-seo-header']);

    module.config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                data: {
                    head: {
                        title: 'Page title for this View',
                        keywords: ["Array", "of", 'Keywords'],
                        description: "your meta description",
                        robots: "index,follow",
                        canonical: 'http://www.mySite.tld/home',
                    }
                },
            });
    });







***make sure your html file has no title tag to avoid duplicates.***


## Question and Answers

***i dont want to use keywords***

just leave the array empty

***what happens to views with no data.head defined at all?***

nothing, it will work. meta tags wont be displayed


## canonical Tags
you should use them since they help google to render your javascript site without any html snapshots needed. but watch our, wrong canonical tags could exclude your site from googles index.

### use cases for canonical tags:
1. e.g. if you switch from http to https, you should not use 301 but canonical tags to tell google that your sites are now available with https and that you'd like google to prefer this version.
2. improve crawlability without having to prerender your site into html snapshots
3. url rearrangement in order to get rid of the #! (you need the hashbang for legacy browsers! so **dont use 301** but the canonical to tell google which version is the *right* one!)
4. ..
