import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_PROFILE_KEY = '@fitness-app:user-profile:v1'

export async function loadUserProfile() {
  try {
    const rawValue = await AsyncStorage.getItem(USER_PROFILE_KEY)
    if (!rawValue) {
      return { userName: 'Usuario' }
    }

    const parsedValue = JSON.parse(rawValue)
    return {
      userName: String(parsedValue?.userName ?? 'Usuario').trim() || 'Usuario',
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
    return { userName: 'Usuario' }
  }
}

export async function saveUserProfile(profile) {
  try {
    const nextProfile = {
      userName: String(profile?.userName ?? 'Usuario').trim() || 'Usuario',
    }

    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(nextProfile))
    return nextProfile
  } catch (error) {
    console.error('Error saving user profile:', error)
    throw error
  }
}
