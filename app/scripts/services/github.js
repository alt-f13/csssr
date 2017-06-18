'use strict';

/**
 * @ngdoc service
 * @name csssrApp.github
 * @description
 * # github
 * Factory in the csssrApp.
 */
angular.module('csssrApp')
  .factory('github', function ($http) {
    var self = this,
        url='https://api.github.com',
        token='2a05480ae29fc150d'; // костыль что бы github не блокировал token
        token+='795b649dcb98a3b7feb1ab8'; //при заливке в репозитарий
    var page = {
      user: "",
      repo: "",
      perPage: 5,
      current: 1,
      pageSizes: [5,15,25,50],
      total: 0,
      data:[],
      repos:[],
      errors: []
    };
    var setData = function(newData) {
      page.data=newData;
    };
    var parseData = function(_data) {
      setData(_data.data);
      var pages = _data.headers('link').match(/page=(\d){1,}&/g);
      page.total = pages[1].match(/(\d){1,}/ig);
    };
    return {
      page: page,
      getIssue: function(user, repo, _id) {
        return $http({
          method: "GET",
          url: url+"/repos/"+user+"/"+repo+"/issues/"+_id,
          params: {
            access_token: token
          }
        })
          .then(function(data) {
            console.log(data);
            setData(data.data);
          })
          .catch(function(err) {
            page.errors.push(data);
            console.error(err);
          })
      },
      getIssues: function(user, repo, _page, perPage) {
        return $http({
          method: "GET",
          url: url+"/repos/"+user+"/"+repo+"/issues",
          params: {
            per_page: perPage,
            page: _page,
            access_token: token
          }
        })
          .then(function(data) {
            console.log(data);
            parseData(data);
          })
          .catch(function(data) {
            page.errors.push(data);
            console.error(data);
          })
      },
      getRepos: function(user) {
        console.log(user);
        var _user = user.match(/^([a-zA-Z\d_-]*)\/?$/gi);
        return $http({
          method: "GET",
          url: url+"/users/"+_user[0]+"/repos",
          params: {
            access_token: token,
            limit: 500
          }
        })
        .then(function(data) {
          console.log("getrepos",data);
          data.data.map(function(rep) {
            console.log(rep);
            page.repos.push({full_name: rep.full_name});
          });
        })
        .catch(function(data) {
          page.errors.push(data);
          console.error(data);
        })
      },


    }
  });
