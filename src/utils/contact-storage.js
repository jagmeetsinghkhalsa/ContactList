import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const setAllContactsList = async (contactsList) => {
  try {
    return await AsyncStorage.setItem('contact_list', JSON.stringify(contactsList));
  } catch (error) {
    return false;
  }
}


export const getContactsAllCount = async () => {
  try {
    const contactsList = await AsyncStorage.getItem('contact_list');
    if (contactsList !== null) {
      let listAfterPars = JSON.parse(contactsList);
      return listAfterPars.length;
    }
  } catch (error) {
    return [];
  }
}

export const getContactsWithIndexing = async (fromNIndex, numberOfItems, searchText) => {
  try {
    const contactsList = await AsyncStorage.getItem('contact_list');
    if (contactsList != null) {
      let listAfterPars = JSON.parse(contactsList);
      if (searchText != '')
        listAfterPars =  listAfterPars.filter(contact => contact.displayName.toLowerCase().includes(searchText.toLowerCase()));
      let afterPaging = listAfterPars.slice(fromNIndex, numberOfItems);
      return afterPaging;
    }
    else {
      return [];
    }
  } catch (error) {
    console.log("error....", error);
    return [];
  }
}

export const searchContact = async (fromNIndex, numberOfItems, searchText) => {
  try {
    const contactsList = await AsyncStorage.getItem('contact_list');
    if (contactsList != null) {

      let listAfterPars = JSON.parse(contactsList);
      var filtered = listAfterPars.filter(contact => contact.displayName.toLowerCase().includes(searchText.toLowerCase()));
     
      let afterPaging = filtered.slice(fromNIndex, numberOfItems);
      return afterPaging;
    }
    else {
      return [];
    }
  } catch (error) {
    console.log("error....", error);
    return [];
  }
}
