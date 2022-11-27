---
title: 扩展函数
layout: default
parent: base_core
nav_order: 7
---

# 内置扩展函数
{: .no_toc}

组件中已经实现的基础扩展函数，需要什么扩展函数请提交issues。

目录
{: .no_toc .text-delta }

- TOC
{:toc}


## Toast

String类型直接调用`toast()`，长度大于等于10时显示LongToast，否则显示ShortToast。

```kotlin
"显示Toast".toast()
```

## 点击事件防抖

View直接调用`clickNotRepeat()`，间隔时间为1秒。

```kotlin
btnDetail.clickNotRepeat { 
    // 处理事件
}
```

## 日志打印

日志打印调用`logV()、logD()、logI()、logW()、logE()`打印不同级别日志。

```kotlin
"打印日志".logV()
"打印日志".logD()
"打印日志".logI()
"打印日志".logW()
"打印日志".logE()
```

