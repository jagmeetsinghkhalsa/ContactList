import {StyleSheet} from 'react-native';
import {LayoutConst} from '../../styles';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titelText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
  editBtn: {
    right: 10,
    backgroundColor: 'transparent',
    width: 40,
    color: 'red',
  },
  topContainer: {
    minHeight: (LayoutConst.window.height / 100) * 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#fbfaff',
    borderBottomColor: '#bcbcbc',
    borderBottomWidth: 1,
    paddingVertical:10
  },
  bottomContainer: {
    height: (LayoutConst.window.height / 100) * 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  profileImageContainer: {
    width: (LayoutConst.window.height / 100) * 10,
    height: (LayoutConst.window.height / 100) * 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  userProfileImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  displayName: {
    color: '#000000',
    fontSize: 25,
    fontWeight: '600',
    textAlign:'center'
  },
  conteactEventRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  contactEventBtnBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactEventBtn: {
    backgroundColor: '#1c7ef8',
    borderRadius: 100,
    width: 40,
    height: 40,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactEventBtnText: {
    color: '#1c7ef8',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  moreInfoRowContainer: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  borderBottonWithRow: {
    borderBottomColor: '#bcbcbc',
    borderBottomWidth: 1,
    // backgroundColor:'#000000'
  },
  moreInfoContentContainer: {
    minHeight: 100,
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical:15
  },
  moreInfoHeading:{
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    marginBottom:10
  },
  moreInfoText:{
    width: (LayoutConst.window.width / 100) * 60,
    color: '#1c7ef8',
    fontSize: 14,
    fontWeight: '500',
  },
  contactRow:{
    marginBottom:40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex:1,
  },
  contactEventBtnWithRow: {
    width: (LayoutConst.window.width / 100) * 30,
    paddingRight:10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop:-5
  }  
  
});
