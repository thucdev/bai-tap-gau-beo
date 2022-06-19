const TOKEN = "accessToken"
const CURRENT_PAGE = "currentPage"

const storage = {
   getAccessToken: (): string | null => {
      return localStorage.getItem(TOKEN)
   },
   setAccessToken: (accessToken: string): void => {
      localStorage.setItem(TOKEN, accessToken)
   },
   removeAccessToken: (): void => {
      localStorage.removeItem(TOKEN)
   },
}

export default storage
