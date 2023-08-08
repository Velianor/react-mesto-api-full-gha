class Auth {
  constructor(baseUrl) {
      this._baseUrl = baseUrl;
  };

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
  };

  
  register(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      })
          .then(this._checkResponse)
  };



  login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      })
          .then(this._checkResponse)
  };



  checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
              'content-Type': 'application/json',
              authorization: `Bearer ${token}`,
          },
      })
          .then(this._checkResponse);
  };
};

const auth = new Auth('https://mestopavel.nomoreparties.co/api');

export default auth;
