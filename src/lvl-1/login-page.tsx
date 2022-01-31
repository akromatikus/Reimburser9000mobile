import { useState } from "react"
import { StyleSheet,View, Text, TextInput, Pressable, ImageBackground, Keyboard } from "react-native"
import fetcher from "../../fetcher"

export default function LoginPage(props: any){
  //console.log("props are", props)

    //states
    const [usernameInput, setUsername] = useState<string>()
    const [pwInput, setPW] = useState<string>()
    const [attemptWarning, setWarning] = useState<string>('')

    async function checkCredentials(){

        const inputsToCheck = {   
            username: usernameInput,
            pw: pwInput
        } 
        
        //fetch a user if one exists
        const resBody = await fetcher(inputsToCheck, 'check-if-user')
        
        //if the user exists
        if (resBody !== 'Not a user' && resBody.isManager){
            
            //update the user state
            props.route.params.setUserState({
                id: resBody.id, 
                username: resBody.username, 
                pw: resBody.pw,
                isManager: resBody.isManager,
                expenseHistory: resBody.expenseHistory
            })

            //get the userlist
            const fetchedUserlist = await fetcher(null, 'get-userlist')
            props.route.params.setUserlistState(fetchedUserlist)

            //goto manager page 
            props.navigation.navigate('Manage Requests', {userlistState:fetchedUserlist})

        }
        else{
            Keyboard.dismiss()
            setWarning("The username and/or password is incorrect.")
        }
    }

    //returns either this login page or the employee page if the user is logged it
    //style={styles.loginView}
    return(
        <View style={styles.loginView}> 
            <ImageBackground imageStyle={{opacity: .9, width:'100%', height:'100%'}} style={styles.backgroundImage} resizeMode="stretch" source={require("C:/Users/dasdu/Documents/Work/Project/reimburser9000mobile/assets/login-background.jpg")}>
                {/* <Text style={styles.title}>Login</Text> */}
                <Text style={styles.title}>Reimburser9000</Text>
                <TextInput style={styles.inputText} placeholder="username" onChangeText={text => setUsername(text)}></TextInput>
                <TextInput style={styles.inputText} placeholder="password" secureTextEntry={true} onChangeText={text => setPW(text)}></TextInput>
                <Pressable style={styles.loginButton} onPress={()=> checkCredentials()}><Text style={{fontSize:50, color:'white'}}>Log In</Text></Pressable>
                <Text style={styles.warning}>{attemptWarning}</Text>
            </ImageBackground>
        </View>
         
    )
}


const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        //backgroundColor: 'blue',
        alignItems: 'center', //horizontal positioning
        justifyContent: 'space-around', //vertical positioning
        color: 'white',
    },
    inputText: {
        alignItems: 'center',
        textAlign: 'center',
        height: 70,
        width: 350,
        color: 'white',
        fontSize: 40,
        margin: 10,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: 'rgba(121, 139, 161, 0.6)'

    },
    title: {
        justifyContent: 'center',
        fontWeight: "bold",
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 50,
        height: 100,
        width: 400,
        color: 'cyan',
        margin: 20,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: 'rgba(121, 139, 161, 0.6)' ,
        paddingTop: 15
        
        //   margin: '2vh'
    },
    warning: {
        color: 'white',
        margin: 10, 
        fontSize: 30, 
        
        //   margin: '2vh'
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 100,
        height: 100,
        width: 250,
        color: 'white',
        margin: 20,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: 'rgba(121, 139, 161, 0.6)'
    },
    backgroundImage: {
        //display:'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        margin: 0,
        //borderWidth: 4,
        //borderColor: 'red',
    
    },

});