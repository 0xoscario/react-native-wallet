package com.zhimakaimen;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.zhimakaimen.splash.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    SplashScreen.getInstance().open(this);
  }

  @Override protected void onDestroy() {
    super.onDestroy();
    SplashScreen.getInstance().reset();
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "zhimakaimen";
  }

  public static void start(Context context) {
    Intent starter = new Intent(context, MainActivity.class);
    context.startActivity(starter);
  }
}
