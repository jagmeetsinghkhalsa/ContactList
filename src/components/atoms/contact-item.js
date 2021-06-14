import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {LayoutConst, GlobalStyle, Colors} from '../../styles';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const ContactItem = (parameter) => {
  let {contact, props} = parameter;
  
  const onClick = ()=> {
    props.navigation.navigate("ContactDetail",{'detail':contact});
  };

  return (
    <TouchableOpacity style={styles.cotactiItemBlock} onPress={onClick}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={contact.hasThumbnail ? { uri: contact.thumbnailPath } : require('assets/images/profile.png')}></Image>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.nameBlock}>
          <Text style={[styles.name]} numberOfLines={1}>
            {contact.displayName}
          </Text>
          <TouchableOpacity style={styles.forwardIcon} onPress={() => {}}>
              <Icon
                name="right"
                size={17}
                color="#000000"
                style={{opacity: 0.45}}></Icon>
            </TouchableOpacity> 
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  cotactiItemBlock: {
    paddingLeft: 5,
    width: LayoutConst.window.width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 50,
  },
  profileContainer: {
    width: 50,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 100,
    marginLeft:10,
  },
  rightContainer: {
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    width: '100%',
    height: '50%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  name: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Muli',
    textAlign: 'left',
    marginBottom: 5,
    width: '60%',
    paddingRight: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Muli',
    textAlign: 'right',
    width: '38%',
  },
  messageText: {
    fontSize: 13,
    color: '#F6F6F6',
    opacity: 0.45,
    fontFamily: 'Muli-SemiBold',
    textAlign: 'left',
    width: '80%',
  },
  forwardIcon: {
    position: 'absolute',
    right: 0,
  },
});
