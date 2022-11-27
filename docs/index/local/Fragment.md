---
layout: default
title: Fragment
parent: 局部UI设置
grand_parent: base_core

---

# 局部Fragment设置

{: .no_toc}

Fragment的效果与Activity效果相同，示例视频直接使用Activity的示例视频，具体可以下载项目运行Demo查看。
相关函数中的`Activity`参数为当前Fragment所在的Activity。演示类`LocalFragment`

目录
{: .no_toc .text-delta }

- TOC
{:toc}

## 自定义UIEngine

重写`setUiEngine()`，返回实现接口`IUiEngine`的类，即可对当前Activity进行的UI配置进行替换。

```kotlin
override fun setUiEngine(): IUiEngine {
    // 这里使用自定义UIEngine进行替换。
    return CustomUiEngine()
}
```

## 屏幕适配

Fragment不需要传递屏幕适配的相关参数，它所在的Activity已经完成。

## 状态栏

Fragment没有设置状态栏的相关函数，可自行在合适的位置设置。

## 根布局

重写函数`rootLayout()`，组件默认返回全局UI配置`rootLayout()`函数设置的值。

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
    return R.layout.custom_root_layout
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_root_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 根布局回调

重写函数`rootLayoutListener()`，根布局初始化之后会回调该函数，函数有两个参数：

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

<iframe width="243" height="535" src="../../../assets/images/local_root_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 标题布局

重写函数`titleLayout()`，组件默认返回全局UI配置`titleLayout()`函数设置的值。

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

<iframe width="243" height="535" src="../../../assets/images/local_title_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 设置标题布局

对于标题布局的设置，提供三种方法，第一种通过标题布局初始化回调，第二种是根据泛型获取当前标题布局，第三种是根据泛型通过DSL方式来设置。

1. [布局回调](#标题布局回调)用于初始化和只设置一次标题属性。
2. [布局实例](#获取标题布局)用于多次设置标题属性。
3. [DSL](#标题DSL)更加灵活的方式

需要**注意**的是，通过实例和DSL进行设置，只有在该布局显示之后才会有值，否则为null。

### 标题布局回调

重写函数`titleLayoutListener()`，标题布局初始化之后会回调该函数，函数有两个参数：

1. `activity ->`当前Activity。
2. `titleBinding->`标题布局的`ViewDataBinding`。

**关闭页面，设置标题名，Menu点击事件**

```kotlin
override fun titleLayoutListener(activity: Activity, titleBinding: ViewDataBinding) {
    if (titleBinding is CustomTitleLayoutBinding) {
        titleBinding.ivBack.setOnClickListener {
            finish()
        }
        titleBinding.tvTitle.text = "局部设置"
        titleBinding.ivRightImage.setOnClickListener{
            "点击了右侧菜单".toast()
        }
    }
}
```

### 获取标题布局

在`BaseVMActivity`中调用`titleBinding<DB>()`获取自定义的标题布局，泛型中传入自定义的标题`ViewDataBinding`。

```kotlin
private val titleBinding by lazy {
	titleBinding<CustomTitleLayoutBinding>()
}
```

获取到标题`ViewDataBinding`后可以自行设置功能，如标题名，Menu事件。

**关闭页面，设置标题名，Menu点击事件**

```kotlin
private val titleBinding by lazy {
    titleBinding<CustomTitleLayoutBinding>()
}

override fun initView(savedInstanceState: Bundle?) {
    titleBinding.tvTitle.text = "局部设置"
    titleBinding.ivRightImage.setOnClickListener { 
        "点击了右侧菜单".toast()
    }
}
```

### 标题DSL

`BaseVMActivity`中提供快速设置标题属性的函数`titleLayout<DB>`，用于设置标题名称和其他属性。

**关闭页面，设置标题名，Menu点击事件**

```kotlin
override fun initView(savedInstanceState: Bundle?) {
    setTitleName<CustomTitleLayoutBinding> {
        ivBack.setOnClickListener {
            finish()
        }
        tvTitle.text = "局部设置"
        ivRightImage.setOnClickListener{
            "点击了右侧菜单".toast()
        }
    }
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_title_layout_name.mp4" frameborder="0" allowfullscreen></iframe>

## 控制标题显示

重写函数`titleLayoutIsShow()`，返回`true`时显示标题布局，返回`false`则不显示。

标题布局默认添加状态栏高度到标题布局顶部外边距，当标题隐藏时外边距也随之隐藏。

```kotlin
override fun titleLayoutIsShow(): Boolean {
    // 不显示标题
//        return false
    // 显示标题
    return true
}
```

## 加载布局

重写函数`loadingLayout()`，组件默认返回全局UI配置`loadingLayout()`函数设置的值。

显示加载布局需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

返回加载布局

```kotlin
override fun loadingLayout(): Int {
    return R.layout.custom_loading_layout
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_loading_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 设置加载布局

对于加载布局的设置，提供两种方法，第一种通过加载布局初始化回调，第二种是根据泛型获取当前加载布局。

1. [布局回调](#加载布局回调)用于初始化和只设置提示语。
2. [布局实例](#获取加载布局)用于多次设置加载属性。

需要**注意**，通过实例设置，只有在该布局初始化之后才会有值，否则会抛出异常。

### 加载布局回调

重写函数`loadingLayoutListener()`，加载布局初始化和参数三更新之后会回调该函数，函数有三个参数：

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

### 获取加载布局

在`BaseVMActivity`中调用`loadingBinding<DB>()`获取自定义的加载布局，泛型中传入自定义的加载`ViewDataBinding`。

需要**注意**，通过实例设置，只有在该布局初始化之后才会有值，否则会抛出异常。

```kotlin
private val loadingLayoutBinding by lazy { 
    loadingBinding<CustomLoadingLayoutBinding>()
}
```

获取到加载`ViewDataBinding`后可以自行设置功能。

**设置提示语颜色**

```kotlin
private val loadingLayoutBinding by lazy {
    loadingBinding<CustomLoadingLayoutBinding>()
}

override fun loadingLayoutListener(
    activity: Activity,
    loadingBinding: ViewDataBinding,
    msg: String
) {
    // 判断是否是自定义的加载布局
    if (loadingBinding is CustomLoadingLayoutBinding){
        // 设置加载提示颜色
        loadingLayoutBinding.tvMsg.setTextColor(ContextCompat.getColor(this, R.color.purple_500))
    }
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_loading_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 加载Dialog

重写函数`loadingDialog()`，组件默认返回全局UI配置`loadingDialog()`函数设置的值。

显示加载Dialog需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

返回自定义Dialog

```kotlin
override fun loadingDialog(activity: Activity, msg: String): Dialog {
    return DefaultLoadingDialog(activity, msg)
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_loading_dialog.mp4" frameborder="0" allowfullscreen></iframe>

## 设置加载Dialog

对于加载Dialog的设置，提供两种方法，第一种通过加载Dialog初始化回调，第二种是根据泛型获取当前加载Dialog。

1. [Dialog回调](#加载Dialog回调)用于初始化和只设置提示语。
2. [Dialog实例](#获取加载Dialog)用于多次设置加载属性。

需要**注意**，通过实例设置，只有在Dialog创建之后才会有值，否则会抛出异常。

### 加载Dialog回调

重写函数`loadingDialogMsg()`，当正在加载的提示语发生改变后将会回调该函数，函数有两个参数：

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

### 获取加载Dialog

在`BaseVMActivity`中调用`loadingBinding<DB>()`获取自定义的加载Dialog，泛型中传入自定义的加载Dialog。

需要**注意**，通过实例设置，只有在Dialog初始化之后才会有值，否则会抛出异常。

```kotlin
private val loadingDialog by lazy {
    loadingDialogBinding<CustomLoadingDialog>()
}
```

获取到加载Dialog后可以自行设置功能。

**设置提示语颜色**

提示语改变，颜色也会被修改。

```kotlin
override fun loadingDialogMsg(dialog: Dialog, msg: String) {
    if (dialog is CustomLoadingDialog) {
        loadingDialog.changeColor(ContextCompat.getColor(this, R.color.purple_500))
    }
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_loading_dialog_msg.mp4" frameborder="0" allowfullscreen></iframe>

## 空布局

重写函数`emptyLayout()`，组件默认返回全局UI配置`emptyLayout()`函数设置的值。

显示空布局需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

返回空布局

```kotlin
override fun emptyLayout(): Int {
    return R.layout.custom_empty_layout
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_empty_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 设置空布局

对于空布局的设置，提供两种方法，第一种通过空布局初始化回调，第二种是根据泛型获取当前空布局。

1. [空布局回调](#空布局回调)用于初始化和只设置提示语。
2. [空布局实例](#获取空布局)用于多次设置加载属性。

需要**注意**，通过实例设置，只有在空布局创建之后才会有值，否则会抛出异常。

### 空布局回调

重写函数`emptyLayoutListener()`，空布局初始化和参数三更新之后会回调该函数，函数有三个参数：

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
override fun onRetry() {
    "重新尝试".toast()
}
```

### 获取空布局

在`BaseVMActivity`中调用`emptyBinding<DB>()`获取自定义的空布局，泛型中传入自定义的空布局。

需要**注意**，通过实例设置，只有在空布局初始化之后才会有值，否则会抛出异常。

```kotlin
private val emptyLayoutBinding by lazy {
    emptyBinding<CustomEmptyLayoutBinding>()
}
```

获取到空布局后可以自行设置功能。

```kotlin
override fun emptyLayoutListener(activity: Activity,emptyBinding: ViewDataBinding,msg: String): Int {
    emptyLayoutBinding.tvClassName.text = activity.javaClass.simpleName
    emptyLayoutBinding.tvMsg.text = msg
    // 返回重试View的ID
    return R.id.btn_retry
}
```



效果：

<iframe width="243" height="535" src="../../../assets/images/local_empty_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>

## 错误布局

实现`IUiEngine`接口，重写函数`errorLayout()`，组件默认返回全局UI配置`errorLayout()`函数设置的值。

显示错误布局需要配合BaseVM中的`uiState`，具体请看BaseVM部分。

返回空布局

```kotlin
override fun errorLayout(): Int {
    return R.layout.custom_error_layout
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_error_layout.mp4" frameborder="0" allowfullscreen></iframe>

## 设置错误布局

对于错误布局的设置，提供两种方法，第一种通过错误布局初始化回调，第二种是根据泛型获取当前错误布局。

1. [错误布局回调](#错误布局回调)用于初始化和只设置提示语。
2. [错误布局实例](#获取错误布局)用于多次设置加载属性。

需要**注意**，通过实例设置，只有在错误布局创建之后才会有值，否则会抛出异常。

### 错误布局回调

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

### 获取错误布局

在`BaseVMActivity`中调用`emptyBinding<DB>()`获取自定义的错误布局，泛型中传入自定义的错误布局。

需要**注意**，通过实例设置，只有在错误布局初始化之后才会有值，否则会抛出异常。

```kotlin
private val errorLayoutBinding by lazy {
    errorBinding<CustomErrorLayoutBinding>()
}
```

获取到错误布局后可以自行设置功能。

```kotlin
override fun errorLayoutListener(activity: Activity,errorBinding: ViewDataBinding,msg: String): Int {
    errorLayoutBinding.tvClassName.text = activity.javaClass.simpleName
    errorLayoutBinding.tvMsg.text = msg
    // 返回重试View的ID
    return R.id.btn_retry
}
```

效果：

<iframe width="243" height="535" src="../../../assets/images/local_error_layout_listener.mp4" frameborder="0" allowfullscreen></iframe>