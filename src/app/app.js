angular.module( 'MyStore', [
  'ui.router',
  'MyStore.store'
  'templates-app',
  'templates-common'
])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('store', {
      url: '/',
      views: {
        'main': {
          templateUrl: 'store/store.tpl.html',
          controller: 'StoreCtrl'            
        }
      },
      data: { pageTitle: 'Welcome ' }        
    })
    .state('product', {
      url: '/products/:productSku',
      views: {
        'main': {
          templateUrl: 'product/product.tpl.html',
          controller: 'StoreCtrl'            
        }
      },
      data: { pageTitle: 'Product ' }        
    })
    .state('cart', {
      url: '/cart',
      views: {
        'main': {
          templateUrl: 'cart/cart.tpl.html',
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
    var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart("AngularStore");

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
}) 

;
