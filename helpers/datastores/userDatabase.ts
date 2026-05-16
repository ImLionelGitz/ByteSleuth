interface UserSetting {
   color: string
}

const userSettings = storage.defineItem<UserSetting>('sync:userData', {
   fallback: {
      color: '#10aa1f92',
   },
})

function getUserData() {
   return userSettings.getValue()
}

function getDefaultUserData() {
   return userSettings.fallback
}

async function saveUserData(key: keyof UserSetting, val: string) {
   const curData = await userSettings.getValue()
   userSettings.setValue({ ...curData, [key]: val })
}

export { getUserData, getDefaultUserData, saveUserData, userSettings }
