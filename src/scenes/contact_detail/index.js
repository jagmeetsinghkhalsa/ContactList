import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button, PermissionsAndroid
} from 'react-native';
import { styles } from './style';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import IconEntypo from 'react-native-vector-icons/dist/Entypo';
import { useRoute } from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { openSettings } from 'react-native-permissions';

export default function ContactDetail(props) {
  const { navigation } = props;
  const [contactNumbersList, setContactNumbers] = useState([]);
  const [contactEmailList, setContactEmail] = useState([]);
  const route = useRoute();
  let contactParam = route.params.detail;


  useLayoutEffect(() => {
    setContactNumbers(contactParam.phoneNumbers);
    setContactEmail(contactParam.emailAddresses);
    navigation.setOptions({
      headerTitle: (props) => (
        <View style={[styles.inputContainer]}>
          <Text style={styles.titelText}>Contact Detail</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#e6e6e6', //Set Header color
        elevation: 0,
      },
    });
  }, [navigation]);

  const phoneCall = (phoneNumber) => {
    if (phoneNumber != undefined) {
      checkCallPermission().then((status) => {
        if (status)
          RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
      });
    }
    else {
      alert("Call failed. Please try again");
    }
  };

  const email = () => { };

  const message = () => { };

  const checkCallPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
      if (granted) {
        return true;
      }
      else {
        const requstReturnStatus = requestCallPermission();
        console.log("requstReturnStatus...........", requstReturnStatus);
        if (requstReturnStatus === PermissionsAndroid.RESULTS.GRANTED)
          return true;
        else if (requstReturnStatus === PermissionsAndroid.RESULTS.DENIED) {
          openSettings().catch(() => console.warn('cannot open settings'));
          return false;
        }
        else {
          openSettings().catch(() => console.warn('cannot open settings'));
          return false;
        }
        // checkCallPermission();  

      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCallPermission = async () => {
    const requestPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
    );
    console.log("requestPermission...........", requestPermission);
    return requestPermission;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.userProfileImage}
            source={contactParam.hasThumbnail ? { uri: contactParam.thumbnailPath } : require('assets/images/profile.png')}></Image>
        </View>
        <Text style={styles.displayName}>{contactParam.displayName}</Text>
        <View style={styles.conteactEventRow}>
          {contactNumbersList.length > 0 && <View style={styles.contactEventBtnBlock}>
            <TouchableOpacity
              style={styles.contactEventBtn}
              onPress={() => { phoneCall(contactNumbersList[0]['number']); }}>
              <Icon name="phone" size={15} color="#FFFFFF"></Icon>
            </TouchableOpacity>
            <Text style={styles.contactEventBtnText}>Call</Text>
          </View>}
          {contactEmailList.length > 0 && <View style={styles.contactEventBtnBlock}>
            <TouchableOpacity style={styles.contactEventBtn} onPress={email}>
              <Icon name="mail" size={15} color="#FFFFFF"></Icon>
            </TouchableOpacity>
            <Text style={styles.contactEventBtnText}>E-mail</Text>
          </View>}
          {contactNumbersList.length > 0 && <View style={styles.contactEventBtnBlock}>
            <TouchableOpacity style={styles.contactEventBtn} onPress={message}>
              <IconEntypo name="chat" size={15} color="#FFFFFF"></IconEntypo>
            </TouchableOpacity>
            <Text style={styles.contactEventBtnText}>Message</Text>
          </View>}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {contactNumbersList.length > 0 && <View style={styles.moreInfoRowContainer}>
          <View
            style={[
              styles.moreInfoContentContainer,
              styles.borderBottonWithRow,
            ]}>
            <Text style={styles.moreInfoHeading}>phone</Text>
            {(() => {
              return contactNumbersList.map((item, index) => (
                <View key={index} style={styles.contactRow}>
                  <TouchableOpacity  style={{width:'75%'}}
                      onPress={() => { phoneCall(item.number); }}>
                    <Text style={styles.moreInfoText}> {item.number}</Text>
                  </TouchableOpacity>
                  <View style={styles.contactEventBtnWithRow}>
                    <TouchableOpacity  onPress={message} style={{width:50}}>
                      <IconEntypo name="chat" size={15} color="#FFFFFF"></IconEntypo>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{width:50}}
                      onPress={() => { phoneCall(item.number); }}>
                      <Icon name="phone" size={20} color="#1c7ef8"></Icon>
                    </TouchableOpacity>
                  </View>
                </View> 
              ));
            })()}
          </View>
        </View>}
        {contactEmailList.length > 0 && <View style={styles.moreInfoRowContainer}>
          <View
            style={[
              styles.moreInfoContentContainer,
              styles.borderBottonWithRow,
            ]}>
            <Text style={styles.moreInfoHeading}>email</Text>
            {(() => {
              return contactEmailList.map((item, index) => (
                <View key={index} style={styles.contactRow}>
                  <Text style={styles.moreInfoText}> {item.email}</Text>
                  <TouchableOpacity style={styles.contactEventBtnWithRow} onPress={email}>
                    <IconEntypo name="mail" size={15} color="#FFFFFF"></IconEntypo>
                  </TouchableOpacity>
              </View> 
              ));
            })()}
          </View>
        </View>}
      </View>
    </View>
  );
}
