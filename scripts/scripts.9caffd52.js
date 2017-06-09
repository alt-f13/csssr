"use strict";angular.module("csssrApp",["ngRoute","angular-loading-bar","angucomplete-alt"]).config(["$routeProvider","cfpLoadingBarProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/issuse/:username/:repo/:id",{templateUrl:"views/issuse.html",controller:"IssuseCtrl",controllerAs:"issuse"}).otherwise({redirectTo:"/"})}]),angular.module("csssrApp").controller("MainCtrl",["$scope","$http",function(a,b){a.pagination=[5,15,25,40,70,100],a.repos=[],a.setPagination=function(b){a.per_page=b,a.page=1,console.log("page size:",b),a.getIssuse(a.searchData)},a.setPage=function(b){a.page=b,console.log("page:",b),a.getIssuse(a.searchData)},a.getIssuse=function(c){console.log(c),a.data=[],a.per_page||(a.per_page=5),a.page||(a.page=1),b.get("https://api.github.com/repos/"+c+"/issues?per_page="+a.per_page+"&page="+a.page).then(function(b){console.log(b),a.data=b.data,console.log(a.data)})["catch"](function(a){console.error(a)})},a.selectRepo=function(b){console.log(b.originalObject.full_name),a.searchData=b.originalObject.full_name,a.getIssuse(b.originalObject.full_name)},a.searchRepos=function(a,c){return b.get("https://api.github.com/users/"+a+"/repos")}}]),angular.module("csssrApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("csssrApp").controller("IssuseCtrl",["$scope","$http","$routeParams",function(a,b,c){console.log(c),a.getIssuse=function(){b.get("https://api.github.com/repos/"+c.username+"/"+c.repo+"/issues/"+c.id).then(function(b){console.log(b),a.data=b.data,console.log(a.data)})["catch"](function(a){console.error(a)})},a.getIssuse()}]),angular.module("csssrApp").filter("gh",function(){return function(a){return a.replace("https://api.github.com/repos/","")}}),angular.module("csssrApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/issuse.html",'<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> {{data.title}} </h3> </div> <div class="panel-body"> {{data.body}} </div> <div class="panel-footer"> <div class=""> <a ng-href="{{data.user.html_url}}"> <img src="{{data.user.avatar_url}}" alt="" class="img-responsive img-circle" width="30"> {{data.user.login}} </a> <div class="pull-right"> {{data.created_at}} </div> </div> </div> </div>'),a.put("views/main.html",'<nav aria-label="Page navigation"> <ul class="pagination"> <li><a href="" ng-click="setPage(1)">1</a></li> <li><a href="" ng-click="setPage(2)">2</a></li> <li><a href="" ng-click="setPage(3)">3</a></li> <li><a href="" ng-click="setPage(4)">4</a></li> <li><a href="" ng-click="setPage(5)">5</a></li> </ul> <ul class="pagination"> <li ng-repeat="page in pagination"> <a href="" ng-click="setPagination(page)">{{page}}</a> </li> </ul> </nav> <ul class="list-group"> <li class="list-group-item clearfix" ng-repeat="item in data"> <a href="#!/issuse/{{item.repository_url|gh}}/{{item.number}}"> <div class="list-group-item-heading"> #{{item.number}} <h3> {{item.title}} <small> {{item.created_at}} </small> </h3> </div> </a> <p class="list-group-item-text"> <div class="pull-left"> <a ng-href="{{item.user.html_url}}"> <img src="{{item.user.avatar_url}}" alt="" class="img-responsive img-circle" width="100"> <h4> {{item.user.login}} </h4> </a> </div> {{item.body}} </p> </li> </ul>')}]);