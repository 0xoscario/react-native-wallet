package com.zhimakaimen.splash;

import android.app.Dialog;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;

import com.zhimakaimen.R;

public class SplashDialog extends Dialog {

  public SplashDialog(@NonNull Context context) {
    super(context, R.style.AppTheme);
    this.configure();
  }

  public View getContentView() {
    return ((ViewGroup) this.getWindow().getDecorView()).getChildAt(0);
  }

  private void configure() {
    this.setContentView(R.layout.layout_dialog_splash);
    this.setCancelable(false);
  }
}
