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
      getRepos: function(user, pageNumber) {
        var _page = (pageNumber) ? pageNumber : 1;
        var _user = user.match(/^([a-zA-Z\d_-]*)\/?$/gi);
        return $http({
          method: "GET",
          url: url+"/users/"+_user[0]+"/repos",
          params: {
            access_token: token,
            per_page: 100,
            // page: _page
          }
        })
        .then(function(data) {
          var link=data.headers('link');
          data.data.map(function(rep) {
            page.repos.push({full_name: rep.full_name});
          });
        })
        .catch(function(data) {
          page.errors.push(data);
          console.error(data);
        })
      },
      search: function(str, tp) {
        var _str = str.split('/');
        console.log(_str);
        var params= {
          access_token: token,
          per_page: 100,
          q: "user:"+_str[0]
        };
        if (_str.length > 1) params.q+=" "+_str[1];
        return $http({
          method: "GET",
          url: url+"/search/repositories",
          params: params,
        })
        // .then(function(data) {
        //     console.log(data);
        //     data.data.items.map(function(rep) {
        //       page.repos.push({full_name: rep.full_name});
        //     });
        //   })
          .catch(function(data) {
            page.errors.push(data);
            console.error(data);
          })
      }
    }
  });
