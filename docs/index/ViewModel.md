---
title: ViewModel
layout: default
parent: base_core
nav_order: 6
---

# 使用ViewModel
{: .no_toc}

介绍ViewModel中所有的函数及使用。

目录
{: .no_toc .text-delta }

- TOC
{:toc}


## 创建ViewModel

创建一个类，继承`BaseVM`，在内部完成相关的网络请求及数据处理。

**模拟网络请求**

```kotlin
class SampleVM : BaseVM(){
    /**
     * 成功的网络请求
     *
     * @param isLayout 显示加载布局还是Dialog，true为布局，false为Dialog
     */
    fun sendHttpSuccess(isLayout: Boolean = true){
    }

    /**
     * 失败的网络请求
     *
     * @param isLayout 显示错误布局还是Toast，true为布局，false为Toast
     */
    fun sendHttpError(isLayout: Boolean = true){
    }

    /**
     * 空数据的网络请求
     *
     * @param isLayout 显示空布局还是Toast，true为空布局，false显示Toast
     */
    fun sendHttpEmpty(isLayout: Boolean = true){
    }
}
```

## 更新UI状态

当ViewModel继承`BaseVM`后，在`Activity/Fragment`中通过泛型传入或调用`addLoadingObserve()`对UI状态进行监听。
`BaseVM`中使用`Channel`封装了UI的加载成功、加载中、加载失败、加载数据为空的几种状态，根据当前网络请求进度通过`Channel`发送密封类`UIState`中的四种状态。

1. `UIState.Loading() ->`显示加载布局或Dialog，需要传递两个参数。
   * `msg ->` 加载提示语。
   * `isDialog ->` 显示Dialog还是加载布局，默认为false，为true则显示Dialog，否则显示缺省页。
2. `UIState.Empty() ->`显示空布局或Toast，需要传递两个参数。
   * `msg ->` 空数据提示语。
   * `isToast ->` 显示Toast还是空布局，默认为false，为true则显示Toast，否则显示缺省页。
3. `UIState.Error() ->`显示错误布局或Toast，需要传递两个参数。
   * `msg ->` 错误提示语。
   * `isToast ->` 显示Toast还是错误布局，默认为false，为true则显示Toast，否则显示缺省页。
4. `UIState.Success ->`不需要传递任何参数，发送该状态后`Activity/Fragment`会显示内容布局。

### 加载中

更新当前`Activity/Fragment`为加载中布局或显示加载中Dialog，通过`uiState`发送加载中状态。

```kotlin
// 显示加载布局
uiState.send(UIState.Loading("正在请求...",false))
// 显示加载Dialog
uiState.send(UIState.Loading("正在请求...",true))
```

### 数据为空

更新当前`Activity/Fragment`为空布局或Toast提示，通过`uiState`发送空状态。

```kotlin
// 显示空数据布局
uiState.send(UIState.Empty("数据为空",false))
// 显示空数据Toast
uiState.send(UIState.Empty("数据为空",true))
```

### 发生错误

更新当前`Activity/Fragment`为错误布局或Toast提示，通过`uiState`发送错误状态。

```kotlin
// 显示错误布局
uiState.send(UIState.Error("请求失败",false))
// 显示错误Toast
uiState.send(UIState.Error("请求失败",true))
```

### 请求成功

请求成功后`Activity/Fragment`需要显示正确的内容布局，通过`uiState`发送成功状态。

```kotlin
// 请求成功
uiState.send(UIState.Success)
```

## 示例



**加载成功**

```kotlin
fun sendHttpSuccess(isLayout: Boolean = true){
    viewModelScope.launch {
        // 网络请求中
        uiState.send(UIState.Loading("正在请求...",!isLayout))
        // 模拟请求两秒
        delay(2000)
        // 请求成功
        testData.value = TestEntity("网络请求的标题", "网络请求的内容")
        uiState.send(UIState.Success)
    }
}
```

**加载失败**

```kotlin
/**
 * 失败的网络请求
 *
 * @param isLayout 显示错误布局还是Toast，true为布局，false为Toast
 */
fun sendHttpError(isLayout: Boolean = true){
    viewModelScope.launch {
        // 网络请求失败
        uiState.send(UIState.Loading("正在请求...",!isLayout))
        // 模拟请求两秒
        delay(2000)
        // 请求失败
        uiState.send(UIState.Error("请求失败",!isLayout))
    }
}
```

**数据为空**

```kotlin
/**
 * 空数据的网络请求
 *
 * @param isLayout 显示空布局还是Toast，true为空布局，false显示Toast
 */
fun sendHttpEmpty(isLayout: Boolean = true){
    viewModelScope.launch {
        // 网络请求中
        uiState.send(UIState.Loading("正在请求...",!isLayout))
        // 模拟请求两秒
        delay(2000)
        // 请求成功，但是数据为空
        testData.value = TestEntity("", "")
        uiState.send(UIState.Empty("数据为空",!isLayout))
    }
}
```

效果

<iframe width="243" height="535" src="..\..\assets\images\sample_vm_activity.mp4" frameborder="0" allowfullscreen></iframe>
