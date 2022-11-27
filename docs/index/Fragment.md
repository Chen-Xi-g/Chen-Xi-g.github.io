---
title: Fragment
layout: default
parent: base_core
nav_order: 5
---

# 使用Fragment

{: .no_toc}

介绍Activity中所有的函数及使用。

目录
{: .no_toc .text-delta }

- TOC
{:toc}


## 创建Fragment

创建`Fragment`与创建`Activity`流程相同。

### 创建布局文件
{: .no_toc}

在`layout`中创建内容布局，并且使用`dataBinding`标签包裹。

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <data>

    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.appcompat.widget.AppCompatTextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/sample_str_hint"
            android:textColor="@color/black"
            android:textSize="17pt"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

### 创建ViewModel
{: .no_toc}

创建一个类，继承`BaseVM`，在内部完成相关的网络请求及数据处理。

```kotlin
class DefaultVM: BaseVM() {
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

```kotlin
class SampleFragment : BaseVMFragment<FragmentSampleBinding, SampleVM>(
    R.layout.fragment_sample
) {
    override fun initView(view: View, savedInstanceState: Bundle?) {
    }

    override fun obtainData() {
    }

    override fun registerObserver() {
    }
}
```

运行后效果

## 内容布局

泛型传入内容布局的`ViewDataBinding`，内部会自动实例化ViewDataBinding，在Activity中可以通过`binding`来获取。

```kotlin
override fun initView(savedInstanceState: Bundle?) {
    binding.tvTitle.text = "默认的Activity页面"
}
```

## ViewModel

泛型传入`ViewModel`，内部会自动实例化ViewModel，在Activity中可以通过`vm`来获取。

```kotlin
override fun obtainData() {
    vm.sendHttpTestData()
}
```

非泛型ViewModel在继承`BaseVM`后调用`addLoadingObserve()`，传入`ViewModel`将会注册监听UI状态。

```kotlin
private val default2VM by lazy { 
    ViewModelProvider(this)[Default2VM::class.java]
}

override fun initView(savedInstanceState: Bundle?) {
    addLoadingObserve(default2VM)
}
```

## 显示加载布局

调用`showLoadingLayout()`显示加载布局或Dialog，函数有两个参数：

1. `msg ->` 正在加载时的提示信息。
2. `isDialog ->` 加载布局是否以Dialog形式显示，如果以Dialog显示加载中，在显示之前会加载内容布局。

```kotlin
private fun showLoading(){
    // 显示加载布局
    showLoadingLayout("加载中...",false)
    // 显示加载Dialog
    showLoadingLayout("加载中...",true)
}
```

## 显示空布局

调用`showEmptyLayout()`显示空布局或Toast，函数有两个参数：

1. `msg ->` 数据为空时显示的提示信息。
2. `isToast ->` 数据为空时显示Toast还是空布局，如果以Toast显示，先显示内容布局后才会提示Toast。

```kotlin
private fun showEmpty(){
    // 显示空布局
    showEmptyLayout("暂无数据",false)
    // 显示Toast
    showEmptyLayout("暂无数据",true)
}
```

## 显示错误布局

调用`showErrorLayout()`显示错误布局或Toast，函数有两个参数：

1. `msg ->` 加载错误时显示的提示信息。
2. `isToast ->` 加载错误时显示Toast还是错误布局，如果以Toast显示，先显示内容布局后才会提示Toast。

```kotlin
private fun showError(){
    // 显示错误布局
    showErrorLayout("加载失败",false)
    // 显示Toast
    showErrorLayout("加载失败",true)
}
```

## 显示内容布局

调用`showSuccessLayout()`显示内容布局，用于缺省页到内容页。

```kotlin
private fun showContent(){
    // 显示内容布局
    showSuccessLayout()
}
```

## 缺省页效果

演示Fragment缺省页

<iframe width="243" height="535" src="..\..\assets\images\sample_fragment_test.mp4" frameborder="0" allowfullscreen></iframe>