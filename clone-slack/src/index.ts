import {App} from './app'
import './config/database'
const main = async ():Promise<void>=>{
    const app = new App()
    await app.listen()
}
main()