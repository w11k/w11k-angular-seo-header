# w11k.angular-seo-header
*dynamically set your meta tags, pagetitles and canonical tags*

![alt tag](http://fs2.directupload.net/images/150902/2s2nypvv.png "Screenshot Canonical Tags")

works with ui router's pageData' and allows you to set following html tags in the head of your single page application:

* page title
* canonical tags
* meta robots (index follow)
* meta description
* meta keywords


## Get Started

####1. install via bower: 

    bower install --save w11k.angular-seo-header

#### 2. include module
     angular.module('myModule', ['w11k.angular-seo-header',]);

#### 3. add the data to your view's

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







**Note:** make sure your html file has no title tag to avoid duplicates.




## Question and Answers

>##### ***i dont want to use keywords***

just leave the array empty

>##### ***what happens to views with no data.head defined at all?***

nothing, it will work. meta tags wont be displayed



> #####i have urls with parameters

you **must** add the paramters to the canonical tag in order to get the right urls. you can use a function for that and inject $stateParams to return the result.

     canonical:(function($stateParams) {
        return 'https://www.myDomain.tld/route/' + $stateParams.myParam;
     })();



## canonical Tags
you should use them since they help google to render your javascript site without any html snapshots needed. but watch out, wrong canonical tags could exclude your site from googles index.

### use cases for canonical tags:
1. e.g. switching from http to https. you should not use 301 but canonical tags to tell google that your sites are now available with https and that you'd like google to prefer this version.
2. improve crawlability without having to prerender your site into html snapshots
3. url rearrangement in order to get rid of the #! (you need the hashbang for legacy browsers! so **dont use 301 redirect** but the canonical to tell google which version is the right one)
4. ..


### use parameter in canonical tags OR use parameter in title tags
to inject the parameters in the canonical tags you need to create a canonicalExtend (name must match exact) function in your config. the direktive will check whether it is available and use it instead of the tag.
the function will receive two parameters from the direktive, first the string you entered as canonical tag, as second parameter the toParams from $stateChange event are received.
From here you can create your custom mapping function and either map the parameters to readable strings or just chain them to the string. this method will work for title tag and canonical tag.

**example config with canonicalExtend and titleExtend function**


    module.config(function($stateProvider) {
    $stateProvider
        .state('route', {
          url: '/route/:param1',
          data: {
              head: {
                  title: 'My View Page-Title',
                  keywords: ['keyword 1', 'keyword 2'],
                  description: 'Meta Description for View',
                  robots: 'index,follow',
                  canonical: 'https://www.domain.tld/#!/route/',
                  canonicalExtend: function (canonicalStr, toParams) {
                      return canonicalStr+toParams.param1;
                  },
                  titleExtend: function(titleStr, toParams){
                  return titleStr + capitalizeFirstLetter(toParams.param1);
                  }
              }
          },