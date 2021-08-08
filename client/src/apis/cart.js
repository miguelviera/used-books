import queryString from 'query-string'
import { baseUrl } from '../apis/config'
import auth from '../auth/auth-helper'

const create = async (productId, credentials) => {
  try {
      let response = await fetch(`${baseUrl}/api/cart/${auth.isAuthenticated().user._id}/${productId}`, {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
          }
      })
        return response.json()
      }catch(err) {
        console.log(err)
  }
}

const update = async (cartItem, quantity, credentials) => {
  try {
    let response = await fetch(`${baseUrl}/api/cart/${cartItem}/${quantity}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }

}

const remove = async (cartId, credentials) => {
    try {
        let response = await fetch(`${baseUrl}/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const clearCart = async (credentials) => {
  try {
      let response = await fetch(`${baseUrl}/api/cart/${auth.isAuthenticated().user._id}/clearCart`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
      }
      })
      return response.json()
  } catch(err) {
      console.log(err)
  }
}

const listByUser = async (userId, credentials) => {
  try {
    let response = await fetch(`${baseUrl}/api/cart/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
    }
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  update,
  remove,
  listByUser,
  clearCart
}