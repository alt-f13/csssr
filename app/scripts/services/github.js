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
      total: 0,
      data:[],
      repos:[],
      countRepos: 0,
      errors: []
    };
    var setData = function(newData) {
      page.data=newData;
    };
    var parseData = function(_data) {
      setData(_data.data);
      var links = _data.headers('link');
      if (links) {
        var pages=links.match(/page=(\d){1,}&/g);
        page.total = pages[1].match(/(\d){1,}/ig);
      }
    };
    return {
      page: page,
      token: token,
      getIssue: function(user, repo, _id) {
        return $http({
          method: "GET",
          url: url+"/repos/"+user+"/"+repo+"/issues/"+_id,
          params: {
            access_token: token
          }
        })
          .then(function(data) {
            setData(data.data);
          })
          .catch(function(err) {
            page.errors.push(data);
            console.error(err);
          })
      },
      getIssues: function(user, repo, _page, perPage) {
        page.data=[]
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
            parseData(data);
          })
          .catch(function(data) {
            page.errors.push(data);
            console.error(data);
          })
      },
      search: function(str, tp) {
        var params= {
          access_token: token,
          q: str
        };
        return $http({
          method: "GET",
          url: url+"/search/repositories",
          params: params,
        })
        .catch(function(data) {
          page.errors.push(data);
          console.error(data);
        })
      }
    }
  });
