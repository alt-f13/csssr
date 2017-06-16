'use strict';

/**
 * @ngdoc service
 * @name csssrApp.github
 * @description
 * # github
 * Factory in the csssrApp.
 */
angular.module('csssrApp')
  .factory('github', function ($http, linkHeaderParser) {
    var self = this,
        url='https://api.github.com',
        token='309d7847a4c67cf72c8b1e74d96d9bc2f31edc87';
    var page = {
      perPage: 5,
      page: 1,
      pagesTotal: 0,
      total: 0,
      data:[]
    }
    var getParams = function() {
      return {
        per_page: page.perPage,
        page: page.page,
        access_token: token
      };
    }

    var setData = function(newData) {
      page.data=newData;
      page.pagesTotal = 20;
      //console.log('setData', page);
    };
    var parseData = function(_data) {
      console.log("parse", _data);
      setData(_data.data);
      page.total = _data.headers('link').match(/page=(\d)&/g);
      console.log("total:", page.total);
    };
    return {
      page: page,
      getData: function() {
        return page;
      },
      getIssue: function(user, repo, _id) {
        return $http({
          method: "GET",
          url: url+"/repos/"+user+"/"+repo+"/issues/"+_id,
          params: getParams()
        })
          .then(function(data) {
            console.log(data);
            setData(data.data);
          })
          .catch(function(err) {
            console.error(err);
          })
      },
      getIssues: function(user, repo) {
        return $http({
          method: "GET",
          url: url+"/repos/"+user+"/"+repo+"/issues",
          params: getParams()
        })
          .then(function(data) {
            console.log(data);
            parseData(data);
          })
          .catch(function(err) {
            console.error(err);
          })
      },
      getRepos: function(user) {
        var _user = user.match(/^([a-zA-Z\d_-]*)\/?.*$/);
        return $http({
          method: "GET",
          url: url+"/users/"+_user[1]+"/repos",
          params: getParams()
        })
        .then(function(data) {
          console.log(data);
        })
        .catch(function(data) {
          console.error(data);
        })
      }
    }
  });
