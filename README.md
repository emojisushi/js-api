# emojisushi-js-sdk

## Installation
```
yarn add @layerok/emojisushi-js-sdk
```

## Servers
| Server     | URL                                     |
|------------|-----------------------------------------|  
| Production | https://api.emojisushi.com.ua/api       |
| Staging    | https://stage-api.emojisushi.com.ua/api |


## Usage

```typescript
const agent = createEmojisushiAgent({
  service: "https://example.com"
})
```


### Methods
```typescript
agent.getProducts()
agent.getCatalog();
agent.getCategories()
agent.getIngredients()
agent.placeOrder()
agent.getCartProducts()
agent.addCartProduct()
agent.removeCartProduct()
agent.clearCart()
agent.getPaymentMethods()
agent.getWishlists()
agent.addWishlistItem()
agent.getShippingMethods()
agent.getBanners()
agent.register()
agent.login()
agent.restorePassword()
agent.resetPassword()
agent.updateUserPassword()
agent.fetchUser()
agent.updateUser()
agent.updateCustomer()
agent.addAddress()
agent.deleteAddress()
agent.makeAddressDefault()
agent.getCity()
agent.getMainSpot()
agent.getMainCity()
agent.getCities()
agent.getSpot()
agent.getSpots()
agent.log()
```

## Publishing to npm
1. bump version
2. yarn build
3. npm publish
