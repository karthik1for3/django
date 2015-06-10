/**
* EditPostController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.posts.controllers')
    .controller('EditPostController', EditPostController);

  EditPostController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Posts'];

  /**
  * @namespace EditPostController
  */
  function EditPostController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Posts) {
    var vm = this;
    var username = $routeParams.username;
    var post_id = $routeParams.post_id;

    vm.edit_post = edit_post;
    vm.post_id = post_id;
    console.info('username ' + username);

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thinkster.profiles.controllers.ProfileSettingsController
    */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();

      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/');
        Snackbar.error('You are not authorized to edt this post.');
      } else {
        // Redirect if logged in, but not the owner of this profile.
        if (authenticatedAccount.username !== username) {
          $location.url('/');
          Snackbar.error('You are not authorized to edt this post.');
        }
      }

    }

    /**
    * @name edit_post
    * @desc edt a new Post
    * @memberOf thinkster.posts.controllers.EditPostController
    */
    function edit_post() {
      $rootScope.$broadcast('post.edited', {
        content: vm.content,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      //$scope.closeThisDialog();
      //alert(Authentication.getAuthenticatedAccount().username);
      Posts.edit_post(vm.post_id, vm.content).then(edtPostSuccessFn, edtPostErrorFn);


      /**
      * @name edtPostSuccessFn
      * @desc Show snackbar with success message
      */
      function edtPostSuccessFn(data, status, headers, config) {
         $location.url('/');
         Snackbar.show('Success! Post edtd.');
      }


      /**
      * @name edtPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function edtPostErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('post.edited.error');
         $location.url('/');
         Snackbar.error(data.error);
      }
    }
  }
})();