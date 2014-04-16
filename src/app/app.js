angular.module( 'MyStore', [
  'ui.router',
  'ngProgress',
  'templates-app',
  'templates-common'
])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('store', {
      url: '/',
      views: {
        'main': {
          templateUrl: 'partials/store.tpl.html',
          controller: 'StoreCtrl'            
        }
      },
      data: { pageTitle: 'Welcome ' }        
    })
    .state('products', {
      url: '/products',
      abstract: true
    })
    .state('product', {
      parent: 'products',
      url: '/:productSku',
      views: {
        'main@': {
          templateUrl: 'partials/product.tpl.html',
          controller: 'StoreCtrl'            
        }
      },
      data: { pageTitle: 'Product ' }        
    })
    .state('cart', {
      url: '/cart',
      views: {
        'main': {
          templateUrl: 'partials/cart.tpl.html',
          controller: 'StoreCtrl'            
        }
      },
      data: { pageTitle: 'Cart ' }        
    });

  $urlRouterProvider.otherwise( '/' );

  /**
   * Remove # from url
   */
  $locationProvider.html5Mode(true);

})

.run(['$rootScope', 'ngProgress', function ($rootScope, ngProgress) {

  $rootScope.$on('$stateChangeStart', function (toState, toParams, fromState, fromParams) {
    ngProgress.set(0);
    ngProgress.start();
    console.log( ngProgress );
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $rootScope.pageTitle = toState.data.pageTitle + ' | MyStore' ;
    }
    ngProgress.complete();
  });
}])

.factory("DataService", function () {

    // create store
    var myStore = new Store();

    // create shopping cart
    var myCart = new Cart("AngularStore");

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
}) 

.controller('StoreCtrl', ['$scope', 'DataService', '$stateParams', function ($scope, DataService, $stateParams) { 
  // get store and cart from service
  $scope.store = DataService.store;
  $scope.cart = DataService.cart;

  // use routing to pick the selected product
  if ( $stateParams.productSku ) {
    $scope.product = $scope.store.getProduct( $stateParams.productSku );
  }
}])
;
