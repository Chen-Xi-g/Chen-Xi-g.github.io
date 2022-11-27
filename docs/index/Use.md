---
title: 使用
layout: default
parent: base_core
nav_order: 1
---

# 使用
{: .no_toc}

目录
{: .no_toc .text-delta }

- TOC
{:toc}
## 使用

在开始使用之前，需要有[DataBinding](https://developer.android.com/topic/libraries/data-binding)、[ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel)的基础，并且需要了解本项目所使用的[屏幕适配方案](https://blankj.com/2018/12/18/android-adapt-screen-killer/)。

如果满足以上条件，在使用之前需要完成以下步骤。

1. 在`Application`中初始化。
2. 创建`Activity/Fragment。`

## 开启DataBinding

在`module`级别的`build.gradle`中开启`dataBinding`选项。

```kotlin
android{
    ...
    buildFeatures{
        dataBinding true
    }
    ...
}
```

## 初始化

在Application中调用`GlobalUiEngine.init()`进行初始化以及全局UI配置，`GlobalUiEngine.init()`拥有三个参数。

1. 传入Application，用于初始化[AndroidUtilCode](https://github.com/Blankj/AndroidUtilCode)。
2. 全局自定义UI配置。
3. 当前是否为Debug模式。

```kotlin
class BaseApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // 参数二使用的是组件提供的默认UI配置。
        GlobalUiEngine.init(this, DefaultUiEngine(), BuildConfig.DEBUG)
    }
}
```

完成初始化工作后即可创建`Activity/Fragment`。

## 创建Activity

### 创建布局文件
{: .no_toc}

在`layout`中创建内容布局，并且使用`dataBinding`标签包裹。

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="data"
            type="com.alvin.sample.entity.TestEntity" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:orientation="vertical"
        tools:context=".demo.DefaultActivity">

        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tv_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{data.title}"
            android:textColor="@color/black"
            android:textSize="15pt"
            tools:text="标题" />

        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tv_content"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="15pt"
            android:text="@{data.content}"
            android:textSize="12pt"
            tools:text="内容" />
    </LinearLayout>
</layout>
```

你会得到以下布局

![默认内容布局](../../assets/images/default_content_layout.png)

### 创建ViewModel
{: .no_toc}

创建一个类，继承`BaseVM`，在内部完成相关的网络请求及数据处理。

```kotlin
class DefaultVM: BaseVM() {
    /**
     * 回传数据
     */
    val testData = MutableLiveData<TestEntity>()
    
    /**
     * 模拟网络请求
     */
    fun sendHttpTestData() {
        viewModelScope.launch {
            delay(2000)
            // 请求成功
            testData.value = TestEntity("网络请求的标题", "网络请求的内容")
        }
    }
}
```

### 创建Activity
{: .no_toc}

创建一个类，继承`BaseVMActivity<DB,VM>(contentLayoutId)`，需要传递以下参数。

1. `DB -> ` 布局生成的`ViewDataBinding`类。
1. `VM -> ` 继承`BaseVM`后的`ViewModel`类。
1. `contentLayoutId ->` 布局文件ID。

继承`BaseVMActivity`后需要重写以下函数。

1. `initView ->` 用于初始化UI相关操作。
2. `obtainData ->` 用于数据相关操作，该函数在`initView`后调用。
3. `registerObserver ->` 注册监听`ViewModel`回传数据。

使用`binding`获取泛型`DB`，`vm`获取泛型传递的`ViewModel`。

```kotlin
class DefaultActivity: BaseVMActivity<ActivityDefaultBinding, DefaultVM>(
    R.layout.activity_default
) {
    override fun initView(savedInstanceState: Bundle?) {
    }

    override fun obtainData() {
        // 模拟网络请求
        vm.sendHttpTestData()
    }

    override fun registerObserver() {
        // 监听数据回传
        vm.testData.observe(this){
            binding.data = it
        }
    }
}
```



运行后效果

<iframe width="243" height="535" src="../../assets/images/default_activity.mp4" frameborder="0" allowfullscreen></iframe>

## 创建Fragment

创建`Fragment`与创建`Activity`流程相同。

### 创建布局文件
{: .no_toc}

在`layout`中创建内容布局，并且使用`dataBinding`标签包裹。

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="data"
            type="com.alvin.sample.entity.TestEntity" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:orientation="vertical"
        tools:context=".demo.DefaultActivity">

        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tv_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{data.title}"
            android:textColor="@color/black"
            android:textSize="15pt"
            tools:text="标题" />

        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tv_content"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="15pt"
            android:text="@{data.content}"
            android:textSize="12pt"
            tools:text="内容" />
    </LinearLayout>
</layout>
```

你会得到以下布局

![默认内容布局](../../assets/images/default_content_layout.png)

### 创建ViewModel
{: .no_toc}

创建一个类，继承`BaseVM`，在内部完成相关的网络请求及数据处理。

```kotlin
class DefaultVM: BaseVM() {
    /**
     * 回传数据
     */
    val testData = MutableLiveData<TestEntity>()
    
    /**
     * 模拟网络请求
     */
    fun sendHttpTestData() {
        viewModelScope.launch {
            delay(2000)
            // 请求成功
            testData.value = TestEntity("网络请求的标题", "网络请求的内容")
        }
    }
}
```

### 创建Fragment
{: .no_toc}

创建一个类，继承`BaseVMFragment<DB,VM>(contentLayoutId)`，需要传递以下参数。

1. `DB -> ` 布局生成的`ViewDataBinding`类。
1. `VM -> ` 继承`BaseVM`后的`ViewModel`类。
1. `contentLayoutId ->` 布局文件ID。

继承`BaseVMFragment`后需要重写以下函数。

1. `initView ->` 用于初始化UI相关操作。
2. `obtainData ->` 用于数据相关操作，该函数在`initView`后调用。
3. `registerObserver ->` 注册监听`ViewModel`回传数据。

使用`binding`获取泛型`DB`，`vm`获取泛型传递的`ViewModel`。

```
class DefaultFragment : BaseVMFragment<FragmentDefaultBinding, DefaultVM>(
    R.layout.fragment_default
) {
    override fun initView(view: View, savedInstanceState: Bundle?) {
    }

    override fun obtainData() {
        // 模拟网络请求
        vm.sendHttpTestData()
    }

    override fun registerObserver() {
        // 监听数据回传
        vm.testData.observe(this) {
            binding.data = it
        }
    }

    /**
     * 取消显示标题栏，具体查看文档局部UI配置。
     */
    override fun titleLayoutIsShow(): Boolean {
        return false
    }
}
```

运行后效果

<iframe width="243" height="535" src="../../assets/images/default_fragment.mp4" frameborder="0" allowfullscreen></iframe>
