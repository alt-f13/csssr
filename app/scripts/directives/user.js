'use strict';

/**
 * @ngdoc directive
 * @name csssrApp.directive:user
 * @description
 * # user
 */
angular.module('csssrApp')
  .component('user', {
      bindings: {
        item: '<'
      },
      template: `
      <div>
        автор:
        <a ng-href="{{$ctrl.item.html_url}}" role="button" class="btn btn-default">
          <img ng-src="{{$ctrl.item.avatar_url}}"  width="30">{{$ctrl.item.login}}
        </a>
      </div>
      `
    }
  );
