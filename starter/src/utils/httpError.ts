export class httpError extends Error {
  res: Response | undefined | null

  constructor(message: string, res: Response | undefined | null) {
    super(message)
    if (res) this.res = res
    console.error(message, '\n\n>>>>>> Status Code:', this.getStatus())
  }

  getStatus() {
    return this.res?.status ?? 'No code'
  }

  async getResMessage() {
    const data = await this.res?.json()
    return data
  }

  async getMessage() {
    return this.message
  }
}
