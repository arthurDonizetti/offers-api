export class SignUpController {
  handle (httpRequest: any): any {
    const { name, email, password, passwordConfirmation } = httpRequest.body

    if (name === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (email === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    if (password === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: password')
      }
    }

    if (passwordConfirmation === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: passwordConfirmation')
      }
    }
  }
}
