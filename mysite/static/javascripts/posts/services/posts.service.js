/**
* Posts
* @namespace thinkster.posts.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.posts.services')
    .factory('Posts', Posts);

  Posts.$inject = ['$http'];

  /**
  * @namespace Posts
  * @returns {Factory}
  */
  function Posts($http) {
    var Posts = {
      all: all,
      create: create,
      distroy_post: distroy_post,
      edit_post:edit_post,
      get: get
    };

    return Posts;

    ////////////////////

    /**
    * @name all
    * @desc Get all Posts
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Posts
    */
    function all() {
      return $http.get('/api/v1/posts/');
    }


    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Posts
    */
    function create(content){//, author) {
      return $http.post('/api/v1/posts/', {
        content: content
        //"author_id": author
      });
    }

    /**
    * @name delete
    * @desc Delete a Post
    * @param {number} id The id of the new Post
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Posts
    */
    function distroy_post(id){
      return $http.delete('/api/v1/posts/'+id+'/', {});
    }

    /**
    * @name edit_post
    * @desc Edit a Post
    * @param {number} id The id of the new Post
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Posts
    */
    function edit_post(id){
      return $http.put('/api/v1/posts/'+id+'/', {});
    }

    /**
     * @name get
     * @desc Get the Posts of a given user
     * @param {string} username The username to get Posts for
     * @returns {Promise}
     * @memberOf thinkster.posts.services.Posts
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/posts/');
    }
  }
})();