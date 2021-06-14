package com.contactapp.demo;

import com.facebook.react.ReactActivity;
import com.react.SmsPackage;
import java.util.List;
 import java.util.Arrays;
 import com.facebook.react.shell.MainReactPackage;
 import com.facebook.react.ReactPackage;
 import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
 import com.rt2zz.reactnativecontacts.ReactNativeContacts;
 import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ContactApp";
  }

  // @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
       new MainReactPackage(),
       new SmsPackage(),
       new ReactNativeContacts(),
       new RNImmediatePhoneCallPackage()
      );
  }
}
