
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import user from './models';
import FocusedUserPage from './src/lvl-3/focused-user-page';
import LoginPage from './src/lvl-1/login-page';
import ManageRequestsPage from './src/lvl-2/manage-requests-page';

const stack = createNativeStackNavigator()

export default function App() {

  const [userState, setUserState] = useState<user>()
  const [userlistState, setUserlistState] = useState<user[]>()
  const [focusedUserState, setFocusedUserState] = useState<user>()
  const [usersToUpdateState, setUsersToUpdateState] = useState<user[]>([])
  const [isSavedState, setIsSavedState] = useState<boolean>(true)

  return (
    
    <NavigationContainer>
        
        <stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
            <stack.Screen 
                name="Login" 
                component={LoginPage} 
                initialParams={{setUserState:setUserState, setUserlistState: setUserlistState}}/>
            <stack.Screen name="Manage Requests" 
                component={ManageRequestsPage} 
                initialParams={{
                    isSavedState: isSavedState,
                    userState:userState, 
                    userlistState:userlistState, 
                    focusedUserState: focusedUserState, 
                    usersToUpdateState: usersToUpdateState,
                    setIsSavedState: setIsSavedState,
                    setUsersToUpdateState: setUsersToUpdateState,
                    setUserlistState:setUserlistState,
                    setFocusedUserState: setFocusedUserState}}/>
            <stack.Screen name="Employee Requests" 
                component={FocusedUserPage} 
                initialParams={{
                    userState:userState, 
                    focusedUserState: focusedUserState, 
                    usersToUpdateState: usersToUpdateState,
                    setIsSavedState: setIsSavedState,
                    setUsersToUpdateState:setUsersToUpdateState,
                    setFocusedUserState: setFocusedUserState}}/>
      </stack.Navigator>

      
    </NavigationContainer>

  )
}