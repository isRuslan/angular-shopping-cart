'use strict';

/**
 * @controller storeController
 * @require $scope, $routeParams
 * @param {DataService factory} get product list and cart object
 */
function storeController($scope, $routeParams, DataService) {

    // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;

    // use routing to pick the selected product
    if ($routeParams.productSku != null) {
        $scope.product = $scope.store.getProduct($routeParams.productSku);
    }
}
