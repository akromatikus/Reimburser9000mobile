import { useState } from "react";
import { View, Text, SectionList, StyleSheet, Pressable, Button, ImageBackground, TextInput} from "react-native";
import user from "../../models";

export default function FocusedUserPage(properties: any){
    
    //states
    const [commentBoxState, setCommentBoxState] = useState<boolean>(false)
    const [commentIndexState, setcommentIndexState] = useState<number>(NaN) //LOL
    const [commentTextState, setCommentTextState] = useState<string>("")
    
    //property focusedUserState alias
    const user: user = properties.route.params.focusedUserState

    //approve or deny request
    function changeRequest(expenseIndex: number){

        //if the focused user is not the logged in user
        if (user.id !== properties.route.params.userState.id){
        
            properties.route.params.setIsSavedState(false)
            //console.log(expenseIndex)

            //if the request is not approved
            if (user.expenseHistory[Number(expenseIndex)].isApproved !== 'Yes'){
                
                //approve it
                user.expenseHistory[Number(expenseIndex)].isApproved = 'Yes'    
            }
            else{
                
                //otherwise deny it
                user.expenseHistory[Number(expenseIndex)].isApproved = 'No'             
            }

            //rerender alternative since no local state was changed in this component, but why does it work?
            properties.navigation.navigate("Employee Requests")
        }
    }

    
    function openCommentBox(expenseIndex: number){ 
        
        //if the focused user is not the logged in user
        if (user.id !== properties.route.params.userState.id){
            properties.route.params.setIsSavedState(false)
        
            //set the expense request index so the save comment button will know which request to update
            setcommentIndexState(expenseIndex)

            //toggle comment box
            setCommentBoxState(!commentBoxState)
        }
        
    }

    function saveComment(){
        user.expenseHistory[commentIndexState].comment = commentTextState
        setCommentBoxState(false)
        
        //rerender alternative since no local state was changed in this component, but why does it work?
        properties.navigation.navigate("Employee Requests")
    }

    function prepareRequestList(){    
        
        //map the array which will be used by the sectionList element to show each expense request
        const returnedList = user.expenseHistory.map((expense, expenseIndex)=>{return({
            title:expense.name,
            data:[[
                <View style={styles.dataItemView}> 
                    <Text style={styles.dataText}>Amount:</Text>                
                    <Text style={styles.dataText}>${expense.amount}</Text> 
                </View>], 
                [
                <View style={styles.dataItemView}> 
                    <Text style={styles.dataText}>Reason:</Text>               
                    <Text style={styles.dataText}>{expense.reason}</Text> 
                </View>], 
                [
                <View style={styles.dataItemView}> 
                    <Text style={styles.dataText}>Approval Status:</Text>
                    <Text style={styles.dataText}>{expense.isApproved}</Text> 
                    <Pressable  onPress={()=>changeRequest(expenseIndex)} style={styles.buttons}><Text style={{color:'white'}}>Approve/Deny</Text></Pressable> 
                </View>], 
                [
                <View style={styles.dataItemView}> 
                    <Text style={styles.dataText}>Comment:</Text>
                    <Text style={styles.dataText}>{expense.comment}</Text> 
                    <Pressable onPress={()=>openCommentBox(expenseIndex)}style={styles.buttons}><Text style={{color:'white'}}>Set Comment</Text></Pressable>
                </View>]]})})        
        return returnedList
    }

    function saveAndGoBack(){
        if (properties.route.params.isSavedState){
            console.log("already saved, going back to manage reuqests")
            
            properties.navigation.navigate('Manage Requests')

        } 
        else{
            
            const usersToUpdateStateClone: user[] = properties.route.params.usersToUpdateState
            usersToUpdateStateClone.push(user)
            properties.route.params.setUsersToUpdateState(usersToUpdateStateClone)
            
            console.log("going back")
            properties.navigation.navigate('Manage Requests');

        }
    }

    const preparedList = prepareRequestList()
    return(<>
        <View style={styles.headerView}>
            <View style={{marginRight: '80%'}}><Button title='Back' color={properties.route.params.isSavedState? 'dodgerblue':'red'} onPress={()=>saveAndGoBack()}></Button></View>
        </View>

        <ImageBackground imageStyle={{opacity: .9, width:400, height:'100%'}} style={styles.backgroundImage} resizeMode="cover" source={require("C:/Users/dasdu/Documents/Work/Project/reimburser9000mobile/assets/login-background.jpg")}>        
        <View style={styles.loginView}>                
            <SectionList
                // style={styles.loginView}
                showsVerticalScrollIndicator={false}
                sections={prepareRequestList()}
                keyExtractor={(item, index) => `${item}.${index}`}
                renderItem={({ item }) => <View style={styles.expenseItems}>{item}</View>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.title}>{title}</Text>
                )}
            />
            {commentBoxState? 
                <View style={styles.commentView}>
                    <TextInput style={styles.commentInput} placeholder="your comment" onChangeText={text => setCommentTextState(text)}></TextInput>
                    <View style={{height:100, width:100, justifyContent:'center'}}><Button title={`Save \n Comment`} onPress={()=>saveComment()}></Button></View>
                </View> 
            
            : null}
        </View>
        </ImageBackground>       
    </>)
}



const styles = StyleSheet.create({
    loginView: {
      flex: 1,
    //   backgroundColor: 'blue',
      alignItems: 'center', //horizontal positioning
      justifyContent: 'center', //vertical positioning
      color: 'white',
    //   padding: 2.5
      width: 400,
      borderWidth: 4,
      borderColor: 'black',

    },
    expenseItems: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
      //height: 150,
      width: 300,
      color: 'white',
      margin: 10,
      //padding: 5,
      borderWidth: 4,
      borderColor: 'black',
      borderRadius: 7,
      fontSize: 15,
      backgroundColor: 'rgba(121, 139, 161, 0.7)'

    },
    dataItemView:{
        flex: 1,
        alignItems:'center', 
        flexDirection:'column',
        justifyContent: 'space-around',
        width: 300,
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        padding: 5,
        //borderWidth: 4,
        //borderColor: 'blue',
    },
    dataText:{
        color: 'white',
        fontSize: 15,
        width: 300,
        textAlign: 'center',
        margin: 5,
        padding: 5
    },
    title: {
        color: 'white',
        margin: 10,
        width: 300,
        fontSize: 35,
        //fontStyle: 'bold'
        //   margin: '2vh'
    },
    buttons:{
        backgroundColor: 'black',
        borderRadius: 7, 
        padding: 12
    },
    headerView:{
        flex: 1,
        //justifyContent: 'flex-start',
        position: 'absolute',
        width: '100%',
        height: 65,
        paddingTop: 20,
        // marginLeft: 0,
        borderWidth: 5,
        //borderColor: 'purple',
        backgroundColor: 'black'


        
    },
    backgroundImage: {
        //display:'flex',
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        //margin: 0,
        marginTop: 65,
        //borderWidth: 4,
        //borderColor: 'red',
    
      },
    commentInput:{
        fontSize: 25,
        textAlign: 'center',
        width: 292,
        height: 100,
        padding: 10,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 7,
        backgroundColor: 'rgba(121, 139, 161, 0.7)'
        
    },
    commentView:{
        borderColor: 'black',

        borderWidth: 4,
        flexDirection:'row', 
        height:100, 
        justifyContent:'space-between', 
        alignItems:'center',
        width: 400,

    }
  });