import axios, { AxiosResponse } from "axios";
import {
  IGetProductsParams,
  IGetProductsRes,
  AxiosAuthRefreshRequestConfig,
  IGetCategoriesParams,
  IGetCategoriesRes,
  IGetCartRes,
  IGetPaymentMethodsRes,
  IGetWishlistRes,
  IGetShippingMethodsRes,
  IGetBannersRes,
  RegisterResData,
  LoginResData,
  IFetchUserResData,
  IAddress,
  IGetCitiesParams,
  IGetSpotsRes,
  ISpot,
  ICity,
  IGetCitiesRes,
} from "./types";

export function createEmojisushiAgent(options: { service: string }) {
  const { service } = options;
  const axiosClient = axios.create({
    baseURL: service,
  });
  const client = axiosClient;

  function log(data: any, version: string) {
    axiosClient.post("/log", {
      version: version,
      navigator: {
        userAgent: navigator.userAgent,
        online: navigator.onLine,
      },
      ...data,
    });
  }

  function getProducts(params: IGetProductsParams, signal?: AbortSignal) {
    return client.get<IGetProductsRes>("products", {
      params,
      signal,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getCategories(params: IGetCategoriesParams) {
    return client.get<IGetCategoriesRes>("categories", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getIngredients(params = {}) {
    return client.get("ingredients", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function placeOrder(params: {
    phone: string;
    firstname?: string; // це ім'я зберігаеться на сайті
    lastname?: string;
    email?: string;

    shipping_method_id: number;
    payment_method_id: number;
    spot_id: number;
    address?: string;

    comment?: string;
    sticks?: number;
    change?: string;
  }) {
    return client.post("order/place", params);
  }

  function getCartProducts(params = {}) {
    return client
      .get<IGetCartRes>("cart/products", {
        params,
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((res) => res.data);
  }

  function addCartProduct(data: {
    product_id: number;
    variant_id?: number;
    quantity: number;
  }): Promise<IGetCartRes> {
    return client.post("cart/add", data, {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function removeCartProduct(cart_product_id: string): Promise<IGetCartRes> {
    return client.post(
      "cart/remove",
      {
        cart_product_id,
      },
      {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig,
    );
  }

  function clearCart(data = {}) {
    return client.post<IGetCartRes>("cart/clear", data, {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getPaymentMethods(
    params = {},
  ): Promise<AxiosResponse<IGetPaymentMethodsRes>> {
    return client.get("payments", {
      params,
    });
  }

  function addWishlistItem(params: {
    product_id: number;
    quantity?: number | null;
  }) {
    return client.get("wishlist/add", {
      params,
    });
  }
  function getWishlists() {
    return client.get<IGetWishlistRes>("wishlist/list");
  }

  function getShippingMethods(
    params = {},
  ): Promise<AxiosResponse<IGetShippingMethodsRes>> {
    return client.get("shipping", {
      params,
    });
  }

  function getBanners(params = {}) {
    return client
      .get<IGetBannersRes>("banners", {
        params,
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((res) => res.data);
  }

  function register(
    data: {
      email: string;
      password: string;
      password_confirmation: string;
      name: string;
      surname: string;
      agree: boolean;
    },
    activate = true,
    autoLogin = true,
  ) {
    const { email, password, password_confirmation, name, surname, agree } =
      data;
    return client.post<RegisterResData>("auth/register", {
      email,
      password,
      password_confirmation,
      name,
      agree,
      surname,
      activate,
      auto_login: autoLogin,
    });
  }

  function login(credentials: { email: string; password: string }) {
    return client.post<LoginResData>("auth/login", credentials);
  }

  function restorePassword({
    email,
    redirect_url,
  }: {
    email: string;
    redirect_url: string;
  }) {
    return client.post("auth/restore-password", {
      email,
      redirect_url,
    });
  }

  function resetPassword(data: { code: string; password: string }) {
    return client.post("auth/reset-password", data);
  }

  function updateUserPassword(data: {
    password_old: string;
    password: string;
    password_confirmation: string;
  }) {
    return client.post("user/password", data);
  }

  function fetchUser() {
    const config = {
      params: {},
    };
    return client.get<IFetchUserResData>("user", config);
  }

  function updateUser(data: {
    name?: string;
    surname?: string;
    phone?: string;
  }) {
    return client.post("user", data);
  }

  function updateCustomer(data: { firstname?: string; lastname?: string }) {
    return client.post("user/customer", data);
  }

  function addAddress(data: {
    name: string;
    lines: string;
    zip: string;
    city: string;
    two_letters_country_code?: string;
  }) {
    return client.post<IAddress>("user/address", data);
  }

  function deleteAddress(id: number) {
    return client.delete("user/address", {
      data: {
        id,
      },
    });
  }

  function makeAddressDefault(id: number) {
    return client.post("user/address/default", {
      id,
    });
  }

  const getCitiesDefaults: IGetCitiesParams = {
    includeSpots: false,
  };

  function getSpots(params = {}) {
    return client
      .get<IGetSpotsRes>("spots", {
        params,
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((res) => res.data);
  }

  function getSpot(params: { slug_or_id: string | number }) {
    return client.get<ISpot>("spot", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getMainSpot() {
    return client.get<ISpot>("spot-main", {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getCity(params: { slug_or_id: string | number }) {
    return client.get<ICity>("city", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getMainCity() {
    return client.get<ICity>("city-main", {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  }

  function getCities(params: IGetCitiesParams = getCitiesDefaults) {
    return client
      .get<IGetCitiesRes>("cities", {
        params,
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((res) => res.data);
  }

  return {
    axiosClient,
    getProducts,
    getCategories,
    getIngredients,
    placeOrder,
    getCartProducts,
    addCartProduct,
    removeCartProduct,
    clearCart,
    getPaymentMethods,
    getWishlists,
    addWishlistItem,
    getShippingMethods,
    getBanners,
    register,
    login,
    restorePassword,
    resetPassword,
    updateUserPassword,
    fetchUser,
    updateUser,
    updateCustomer,
    addAddress,
    deleteAddress,
    makeAddressDefault,
    getCity,
    getMainSpot,
    getMainCity,
    getCities,
    getSpot,
    getSpots,
    log,
  };
}
