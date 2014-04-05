angular.module( 'MyStore', [
  'ui.router',
  'templates-app',
  'templates-common'
])

.config(function ($stateProvider, $urlRouterProvider) {
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
    .state('product', {
      url: '/products/:productSku',
      views: {
        'main': {
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
})

.run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $rootScope.pageTitle = toState.data.pageTitle + ' | MyStore' ;
    }
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
  if ($stateParams.productSku != null) {
    $scope.product = $scope.store.getProduct($stateParams.productSku);
  }
}])
;
