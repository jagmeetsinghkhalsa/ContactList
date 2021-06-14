import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground, ActivityIndicator,
} from 'react-native';
import { styles } from './style';
import { ContactItem } from '../../components/atoms';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { setAllContactsList, getContactsWithIndexing, getContactsAllCount, searchContact } from '../../utils/contact-storage';

export default function ContactList(props) {
  const { navigation } = props;
  const [onAnyContact, setChatRoomsStatus] = useState(false);
  const [contactList, setContactsList] = useState([]);
  const [spinnerVisibility, setSpinner] = useState(true);
  const [pageIndexFrom, setPageIndexFrom] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [loadMoreSpinner, setLoadMoreSpinner] = useState(false);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    checkPermission();
    const listener = navigation.addListener('focus', () => {
      //call method
    });
    return listener;
  }, [navigation]);



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <View style={[styles.inputContainer]}>
          <Icon
            name="search"
            size={15}
            style={styles.search_input_label_icon}
          />
          <TextInput
            style={[styles.search_input]}
            placeholder="Search..."
            placeholderTextColor="#7f7979"
            onChangeText={text => filterContactList(text)}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: '#e6e6e6', //Set Header color
        elevation: 0,
      },
    });
  }, [navigation]);

  const checkPermission = () => {
    Contacts.checkPermission().then((permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      console.log(permission)
      if (permission === 'undefined') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        ).then(contactsList);
      }
      if (permission === 'authorized') {
        contactsList();
      }
      if (permission === 'denied') {
        //Message for denied
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        ).then(contactsList);
      }
    });
  };

  const contactsList = () => {
    setSpinner(true);
    Contacts.getCount().then(actualNuber => {
      setTotalContacts(actualNuber);
      getContactsAllCount().then((storageCount) => {
        console.log("storageCount....",storageCount);
        if (actualNuber > storageCount) {
          loadContactFromMobile();
        }
        else {
          getContactsWithIndexing(pageIndexFrom, 20, searchText).then(list => {
            if (list.length != undefined && list.length != null && list.length > 0) {
              setSpinner(false);
              setPageIndexFrom(pageIndexFrom + 20);
              Contacts.getCount().then(number => { setTotalContacts(number); });
              setContactsList(list);
            }
            else {
              loadContactFromMobile();
            }
          }).catch(error => { setSpinner(false) });
        }

      }
      ).catch((error) => { setSpinner(false); });
    }).catch((error) => { setSpinner(false); });

  };

  const loadContactFromMobile = () => {
    Contacts.getAll().then((contacts) => {
      contacts.sort(
        (a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase(),
      );
      setAllContactsList(contacts)
        .then((status) => {
          if (status == false) {
            //show not found irrow
            setSpinner(false);
          }
          else {
            Contacts.getCount().then(number => { setTotalContacts(number); });
            setPageIndexFrom(pageIndexFrom + 20);
            let firstTiemList = contacts.slice(0, 20);
            setContactsList(firstTiemList);
            setSpinner(false);
          }
        }).catch((error) => { console.log("setAllContactsList(contacts)..error....", error); setSpinner(false); })
    }).catch((error) => { console.log("Contacts.getAll..error....", error); setSpinner(false); })
  };

  const _handleLoadMore = () => {
    if (pageIndexFrom <= totalContacts) {
      setLoadMoreSpinner(true);
      getContactsWithIndexing(pageIndexFrom, (pageIndexFrom + 10), searchText).then(list => {
        setPageIndexFrom(pageIndexFrom + 10);
        if (list.length != undefined && list.length != null && list.length > 0) {
          setContactsList(prevState => [...prevState, ...list]);
        }
        setLoadMoreSpinner(false);
      }).catch((error) => { setLoadMoreSpinner(false); })
    }
  }

  const filterContactList = (text) => {
    setSpinner(true);
    setPageIndexFrom(0);
    setContactsList([]);
    setSearchText(text);
    searchContact(0, 20, text).then(list => {
      if (list.length != undefined && list.length != null && list.length > 0) {
        setPageIndexFrom(pageIndexFrom + 20);
        setContactsList(prevState => [...prevState, ...list]);
      }
      setSpinner(false);
    }).catch((error) => { setSpinner(false); })
  }

  return (
    <View style={styles.container}>
      {spinnerVisibility && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingRight: '10%',
            marginBottom: '10%',
          }}>
          <ActivityIndicator color="gray" size={30}></ActivityIndicator>
        </View>
      )}
      <FlatList style={{ flex: 1, width: '100%' }}
        data={contactList}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            props={props}></ContactItem>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
      >
      </FlatList>
      {loadMoreSpinner && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingRight: '10%',
            marginBottom: '10%',
          }}>
          <ActivityIndicator color="gray" size={30}></ActivityIndicator>
        </View>
      )}
    </View>
  );
}


{/* {(() => {
          if (onAnyContact) {
            return <Text style={[styles.noconversation]}>No any contact!</Text>;
          } else {
            return contactList.map((item, index) => (
              <ContactItem
                key={index}
                contact={item}
                props={props}></ContactItem>
            ));
          }
        })()} */}
