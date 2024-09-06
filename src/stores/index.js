import { createPinia } from 'pinia' //引入pinia
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia().use(persist)
export { useUserInfoStore, useUserKeyStore } from './modules/user'
export { useUserChatStore } from './modules/userChat'
export default pinia

// export { useSettingsStore } from './settings'
