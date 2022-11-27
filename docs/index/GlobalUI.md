---
title: 全局UI配置
layout: default
parent: base_core
nav_order: 2
---

# 全局UI配置
{: .no_toc}

通过实现`IUiEngine`来配置全局UI，演示类`CustomUiEngine`。

目录
{: .no_toc .text-delta }

- TOC
{:toc}

## 创建配置类

创建一个类，实现`IUiEngine`接口，重写所有函数。

```kotlin
class CustomUiEngine() : IUiEngine{
    // ......
}
```

当你自定义`IUiEngine`后，需要对`GlobalUiEngine.init()`**参数2**进行替换。

## 屏幕适配

实现`IUiEngine`接口，在构造参数中重写`screenWidth`的值，值为设计图的pt值，如不理解请查看该项目所使用的[屏幕适配方案](https://blankj.com/2018/12/18/android-adapt-screen-killer/)。

如设计图宽度为375pt，设置`screenWidth = 375`即可。

如果你不想使用此套适配方案，请返回`-1`，此时该组件不再屏幕适配。

```kotlin
class CustomUiEngine(override val screenWidth: Int = 375) : IUiEngine{
}
```

## 全局状态栏

实现`IUiEngine`接口，重写函数`setStatusBar()`，在该函数中对状态栏、导航栏进行设置。组件已集成[AndroidUtilCode](https://github.com/Blankj/AndroidUtilCode)，建议使用该库的[BarUtils](https://github.com/Blankj/AndroidUtilCode/blob/master/lib/utilcode/README-CN.md#%E6%A0%8F%E7%9B%B8%E5%85%B3---barutilsjava---demo)，没有必要再集成其他第三方。

组件默认的状态栏颜色为白色，

```kotlin
override fun setStatusBar(activity: Activity) {
    // 设置状态栏颜色
    BarUtils.setStatusBarColor(activity, ContextCompat.getColor(activity, R.color.blue))
    // 设置导航栏颜色
    BarUtils.setNavBarColor(activity, ContextCompat.getColor(activity, R.color.blue))
    // 设置状态栏图标颜色
    BarUtils.setStatusBarLightMode(activity, true)
    // 设置导航栏图标颜色
    BarUtils.setNavBarLightMode(activity, true)
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_title_bar.mp4" frameborder="0" allowfullscreen></iframe>

## 根布局

实现`IUiEngine`接口，重写函数`rootLayout()`，使用组件默认跟布局时，返回`com.alvin.base_engine.R.layout.base_engine_default_root_layout`，大多数情况下不需要自定义。

```kotlin
override fun rootLayout(): Int {
    return R.layout.base_engine_default_root_layout
}
```

组件默认的根布局结构如下：

```
└─LinearLayout
    └─FrameLayout（标题布局）
    └─FrameLayout（缺省页+内容布局）
```

当你进行自定义布局时，可以不遵守以上布局，但有两个必须条件：

1. 必须有一个**id为`root_title`的FrameLayout**，用于放置标题栏。
2. 必须有一个**id为`root_content`的FrameLayout**，用于放置缺省页及内容。

**自定义根布局**增加一个Tip布局



布局结构：

```
└─LinearLayout
    └─FrameLayout（标题布局）
    └─TipLayout（Tip布局）
    └─FrameLayout（缺省页+内容布局）
```

返回根布局：

```kotlin
override fun rootLayout(): Int {
    return R.layout.custom_root_layout.xml
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_root_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 根布局回调

实现`IUiEngine`接口，重写函数`rootLayoutListener()`，根布局初始化之后会回调该函数，函数有两个参数：

1. `activity ->`当前Activity。
2. `rootBinding ->`根布局的`ViewDataBinding`。

```kotlin
override fun rootLayoutListener(activity: Activity, rootBinding: ViewDataBinding) {
}
```

**Tip显示当前类名**

```kotlin
override fun rootLayoutListener(activity: Activity, rootBinding: ViewDataBinding) {
    // 判断是否是自定义的根布局
    if (rootBinding is CustomRootLayoutBinding) {
        rootBinding.tvTip.text = activity.javaClass.simpleName
    }
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_root_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 标题布局

实现`IUiEngine`接口，重写函数`titleLayout()`，组件默认返回`com.alvin.base_engine.R.layout.base_engine_default_root_title_layout`，建议自定义。

默认的标题布局只实现了基本的返回按钮，标题，一个右侧按钮，一个右侧文字。

```kotlin
override fun titleLayout(): Int {
    return com.alvin.base_engine.R.layout.base_engine_default_root_title_layout
}
```

**自定义标题布局**

设置一个左侧返回按钮、居中标题名、右侧更多按钮、蓝色背景色、白色按钮颜色、白色字体颜色。

布局结构：

```
└─FrameLayout
    └─ImageButton（返回按钮）
    └─TextView（标题名称）
    └─ImageButton（更多按钮）
```

返回标题布局

```kotlin
override fun titleLayout(): Int {
    return R.layout.custom_title_layout
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_title_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 控制标题显示

实现`IUiEngine`接口，重写函数`titleLayoutIsShow()`，返回`true`时显示标题布局，返回`false`则不显示。

标题布局默认添加状态栏高度到标题布局顶部外边距，当标题隐藏时外边距也随之隐藏。

```kotlin
override fun titleLayoutIsShow(): Boolean {
    // 不显示标题
//        return false
    // 显示标题
    return true
}
```

## 标题回调

实现`IUiEngine`接口，重写函数`titleLayoutListener()`，标题布局初始化之后会回调该函数，函数有两个参数：

1. `activity ->`当前Activity。
2. `titleBinding->`标题布局的`ViewDataBinding`。

**自定义回调**

设置点击back时关闭当前Activity

```kotlin
override fun titleLayoutListener(activity: Activity, titleBinding: ViewDataBinding) {
    // 判断是否是自定义的标题栏
    if (titleBinding is CustomTitleLayoutBinding) {
        titleBinding.ivBack.setOnClickListener {
            // 关闭页面
            activity.finish()
        }
    }
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_title_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 加载布局

实现`IUiEngine`接口，重写函数`loadingLayout()`，组件默认返回`com.alvin.base_engine.R.layout.base_engine_default_root_loading_layout`，建议自定义。

默认的加载布局只实现了ProgressBar和加载时的提示信息。

```kotlin
override fun titleLayout(): Int {
    return com.alvin.base_engine.R.layout.base_engine_default_root_title_layout
}
```

显示加载布局需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

**自定义加载布局**

设置一个显示当前类名的TextView、ProgressBar、蓝色加载提示语的TextView。

布局的内容需要在[加载布局回调](#加载布局回调)中设置

布局结构：

```
└─LinearLayout
    └─TextView（当前类名）
    └─ProgressBar（加载样式）
    └─TextView（加载提示语）
```

返回加载布局

```kotlin
override fun loadingLayout(): Int {
    return R.layout.custom_loading_layout
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_loading_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 加载布局回调

实现`IUiEngine`接口，重写函数`loadingLayoutListener()`，加载布局初始化和参数三更新之后会回调该函数，函数有三个参数：

1. `activity ->`当前Activity。
2. `loadingBinding->`加载布局的`ViewDataBinding`。
3. `msg ->`加载提示语。

**自定义回调**

```kotlin
override fun loadingLayoutListener(
    activity: Activity,
    loadingBinding: ViewDataBinding,
    msg: String
) {
    // 判断是否是自定义的加载布局
    if (loadingBinding is CustomLoadingLayoutBinding){
        // 设置当前类名
        loadingBinding.tvClassName.text = activity.javaClass.simpleName
        // 设置加载提示
        loadingBinding.tvMsg.text = msg
    }
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_loading_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 加载Dialog

实现`IUiEngine`接口，重写函数`loadingDialog()`，组件默认返回`com.alvin.base_engine.base.dialog.DefaultLoadingDialog`，根据需求自定义，返回值为`Dialog`。

默认的加载布局只实现了加载样式和加载时的提示信息。

```kotlin
override fun loadingDialog(activity: Activity, msg: String): Dialog {
    // msg默认显示的加载内容
    return DefaultLoadingDialog(activity, msg)
}
```

显示加载Dialog需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

**默认效果**

<iframe width="243" height="535" src="../../assets/images/default_loading_dialog.mp4" frameborder="0" allowfullscreen></iframe>

**自定义加载Dialog**

设置背景色为蓝色、加载样式、白色加载提示语。

更新Dialog提示需请查看[更新Dialog内容](#更新Dialog内容)。

布局结构：

```
└─LinearLayout
    └─ImageView（加载样式）
    └─TextView（加载提示语）
```

返回自定义Dialog

```kotlin
override fun loadingDialog(activity: Activity, msg: String): Dialog {
    return DefaultLoadingDialog(activity, msg)
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_loading_dialog.mp4" frameborder="0" allowfullscreen></iframe>

## 更新Dialog内容

实现`IUiEngine`接口，重写函数`loadingDialogMsg()`，当正在加载的提示语发生改变后将会回调该函数，函数有两个参数：

1. `dialog ->` 自定义的Dialog。
2. `msg ->` 加载提示语。

**修改提示语**

```kotlin
override fun loadingDialogMsg(dialog: Dialog, msg: String) {
    // 判断是否是自定义的加载框
    if (dialog is CustomLoadingDialog){
        // 修改Dialog的提示
        dialog.changeMsg(msg)
    }
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_loading_dialog_msg.mp4" frameborder="0" allowfullscreen></iframe>

## 空布局

实现`IUiEngine`接口，重写函数`emptyLayout()`，组件默认返回`com.alvin.base_engine.R.layout.base_engine_default_root_empty_layout`，建议自定义。

默认只实现了空数据提示和默认重试按钮。

```kotlin
override fun emptyLayout(): Int {
    return com.alvin.base_engine.R.layout.base_engine_default_root_empty_layout
}
```

显示空布局需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

**自定义空布局**

设置一个显示当前类名的TextView、空布局提示语、蓝色重新加载。

布局的内容需要和重新加载在[空布局回调](#空布局回调)中设置

布局结构：

```
└─LinearLayout
    └─TextView（当前类名）
    └─TextView（空布局提示语）
    └─Button  （重新加载）
```

返回空布局

```kotlin
override fun emptyLayout(): Int {
    return R.layout.custom_empty_layout
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_empty_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 空布局回调

实现`IUiEngine`接口，重写函数`emptyLayoutListener()`，空布局初始化和参数三更新之后会回调该函数，函数有三个参数：

1. `activity ->`当前Activity。
2. `emptyBinding->`空布局的`ViewDataBinding`。
3. `msg ->`空数据提示语。

当有需要触发重新加载事件的按钮时，返回View的ID即可。

**自定义回调**

重试的回调在Activity重写`onRetry`处理

```kotlin
override fun emptyLayoutListener(activity: Activity,emptyBinding: ViewDataBinding,msg: String): Int {
    if (emptyBinding is CustomEmptyLayoutBinding){
        // 设置当前类名
        emptyBinding.tvClassName.text = activity.javaClass.simpleName
        // 设置空数据提示
        emptyBinding.tvMsg.text = msg
    }
    // 返回重试View的ID
    return R.id.btn_retry
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_empty_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 错误布局

实现`IUiEngine`接口，重写函数`errorLayout()`，组件默认返回`com.alvin.base_engine.R.layout.base_engine_default_root_error_layout`，建议自定义。

默认只实现了错误数据提示和默认重试按钮。

```kotlin
override fun emptyLayout(): Int {
    return com.alvin.base_engine.R.layout.base_engine_default_root_error_layout
}
```

显示错误布局需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

**自定义错误布局**

设置一个显示当前类名的TextView、错误布局提示语、蓝色重新加载。

布局的内容需要和重新加载在[错误布局回调](#错误布局回调)中设置

布局结构：

```
└─LinearLayout
    └─TextView（当前类名）
    └─TextView（错误布局提示语）
    └─Button  （重新加载）
```

返回空布局

```kotlin
override fun errorLayout(): Int {
    return R.layout.custom_error_layout
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_error_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 错误布局回调

实现`IUiEngine`接口，重写函数`errorLayoutListener()`，错误布局初始化和参数三更新之后会回调该函数，函数有三个参数：

1. `activity ->`当前Activity。
2. `errorBinding->`加载布局的`ViewDataBinding`。
3. `msg ->`加载提示语。

当有需要触发重新加载事件的按钮时，返回View的ID即可。

**自定义回调**

重试的回调在Activity重写`onRetry`处理

```kotlin
override fun errorLayoutListener(activity: Activity,errorBinding: ViewDataBinding,msg: String): Int {
    if (errorBinding is CustomErrorLayoutBinding){
        // 设置当前类名
        errorBinding.tvClassName.text = activity.javaClass.simpleName
        // 设置错误提示
        errorBinding.tvMsg.text = msg
    }
    // 返回重试View的ID
    return R.id.btn_retry
}
```

效果：

<iframe width="243" height="535" src="../../assets/images/custom_error_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>
