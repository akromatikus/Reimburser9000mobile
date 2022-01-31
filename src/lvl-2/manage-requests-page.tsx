import { useState } from "react"
import { Button, FlatList, Text, StyleSheet, Pressable, ImageBackground } from "react-native"
import { View } from "react-native"
import fetcher from "../../fetcher"
import user, { expenseHistory } from "../../models"

//componentInputs:{user: user, userlist: user[], setUserlist: Function}
export default function ManageRequestsPage(properties: any){
    let props = properties.route.params
    //console.log('the derp user is',props.userState)

    async function saveChanges(){

        const usersToUpdate = props.usersToUpdateState
        
        if (properties.route.params.isSavedState)
            {console.log("everything is already up to date") }
        else{
            console.log("updating backend");
            await fetcher(usersToUpdate, 'update-users'); 
            props.setUsersToUpdateState([]) 
            properties.route.params.setIsSavedState(true);
            properties.navigation.navigate('Manage Requests', {isSavedState: true})
        }        
    }


    //set the focused user state to the user being clicked, so they can be referenced for updates in the focused user page
    function setFocus(user: user){
        props.setFocusedUserState(user)
        properties.navigation.navigate(`Employee Requests`, {focusedUserState:user, isSavedState: properties.route.params.isSavedState})
    }
    

    return(<>
    
        <View style={styles.headerView}>
            <View style={{marginLeft: '80%'}}><Button color={properties.route.params.isSavedState? 'dodgerblue':'red'} title='Save' onPress={()=>saveChanges()}></Button></View>
        </View>
        <ImageBackground imageStyle={{opacity: .9, width:'100%', height:'100%'}} style={styles.backgroundImage} resizeMode="stretch" source={require("C:/Users/dasdu/Documents/Work/Project/reimburser9000mobile/assets/login-background.jpg")}>

        <View style={styles.tableView}>
            <Text style={styles.subTitle}>User Request List</Text>
            <FlatList 
                data={props.userlistState} 
                renderItem={({item})=> 
                    <Pressable style={styles.userlistNames} onPress={()=> setFocus(item)}>
                        <Text style={item.expenseHistory.some((expense: expenseHistory) => {return(expense.isApproved == "Pending")}) ? {color:'red', fontSize:20} : {color:'white',fontSize:20}}>
                            {item.username}
                        </Text>
                    </Pressable>}
                keyExtractor={item => item.id}
            ></FlatList>
        </View>  

        </ImageBackground>   
    </>)
}

 const styles = StyleSheet.create({
    main: {
        alignItems: 'center', //horizontal positioning
        justifyContent: 'center', //vertical positioning
        color: 'white',
        // padding: 20 //WILL OFFSET THE VIEW, DO NOT USE!!!
    },
    headerView:{
        flex: 1,
        //justifyContent: 'flex-start',
        position: 'absolute',
        width: '100%',
        height: 65,
        paddingTop: 15,
        // marginLeft: 0,
        borderWidth: 5,
        //borderColor: 'purple',
        backgroundColor: 'black',
    },
    subTitle: {
        fontSize: 40,
        color: 'white',
        width: 380,
        textAlign: 'center',
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        margin: 10,
        backgroundColor: 'rgba(121, 139, 161, 0.7)'

    },
    saveButton: {
        position: 'absolute',
        bottom: 0,
        fontSize: 40,
        height: 45,
        width: 100,
        textAlign: 'center',
        //borderWidth: 4,
        //borderColor: 'purple',
        //borderRadius: 7,
        //margin: 10,
        backgroundColor: 'rgba(121, 139, 161, 0.7)',

    },
    userlistNames: {
        width: 250,
        fontSize: 50,
        //width: 1,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        alignItems: 'center', //horizontal positioning
        justifyContent: 'space-around', //vertical positioning
        backgroundColor: 'rgba(121, 139, 161, 0.7)',
        margin: 2, 
        height: 40

    },
    inputText: {
        alignItems: 'center',
        textAlign: 'center',
        height: 60,
        width: "100%",
        color: 'white',
        margin: 10,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: 'rgba(121, 139, 161, 0.7)',
        justifyContent: 'space-around'
    
    },
    title: {
        color: 'white',
        margin: 10,
        width: 300,
        backgroundColor: 'rgba(121, 139, 161, 0.7)',
        justifyContent: 'space-around'
        //   margin: '2vh'
    },
    backgroundImage: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        margin: 0,
        // marginRight: 20,
        marginTop: 65,
        // borderWidth: 4,
        // borderColor: 'red',
    
    },
    tableView:{
        flex: 1,
        alignItems: 'center', //horizontal positioning
        justifyContent: 'center', //vertical positioning
        color: 'white',
        borderWidth: 4,
        borderColor: 'black',
    }
    
});