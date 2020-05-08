export class Auth {

    constructor(
        public _email: string,
        public _token: string,
        public _refreshToken: string,
        public _tokenExpirationDate: string,
        public _domain: string,
        public _farmland: string,
        public _header: any
    ) {}

    get email() {
        if ( !this.email ) {
            return null;
        }
        return this.email;
    }
    get token() {
        if ( !this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get refreshToken() {
        if ( !this._refreshToken) {
            return null;
        }
        return this._refreshToken;
    }

    get tokenExpirationDate() {
        if ( !this._tokenExpirationDate) {
            return null;
        }
        return this._tokenExpirationDate;
    }
    get domain() {
        if ( !this._domain ) {
            return null;
        }
        return this._domain;
    }
    get farmland() {
        if ( !this._farmland ) {
            return null;
        }
        return this._farmland;
    }
    get header() {
        if ( !this._header ) {
            return null;
        }
        return this._header;
    }


}
