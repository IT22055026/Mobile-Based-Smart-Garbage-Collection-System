import * as React from 'react';
import { View,Text,TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import Form from '@/components/vindi/Form';
import Navbar from '@/components/vindi/NavBar';

const AddComplaint: React.FC =() => {

    return(

        
        
        <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>Complaint Dashboard</Text>
      </View>

          <Navbar/>
            
                <Form/>
            


        </View>
        


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        
        
    
    },
    title: {
        marginTop: 30,
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 10,
      },
      header: {
        width: 450,
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
      },
      
    
      headerTitle: {
        fontSize: 20,
        color: 'black',
      },


});

export default AddComplaint;

