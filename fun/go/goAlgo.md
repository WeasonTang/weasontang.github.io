# 17.数据结构与算法

## 0.介绍

1. 数据结构是一门研究算法的学科，自从有了编程语言也就有了数据结构，学好数据结构可以编写出更加漂亮，更加有效率的代码。
2. 要学好数据结构就要多多考虑如何将生活中遇到的问题，用程序去实现解决。
3. 程序 = 数据结构 + 算法

## 1.稀疏数组(sparse array)

### 1).基本介绍

当一个数组中大部分元素为0，或者为同一个值的数组时，可以使用稀疏数组来保存该数组。

稀疏数组的处理方法是：

1. 记录数组一共有几行几列，有多少个不同的值。
2. 思想：把具有不同值的元素的行列及值记录在一个小规模的数组中，从而缩小程序的规模

### 2).代码实现

```go
package main

import (
	"fmt"
)

type ValNode struct {
	row int
	col int
	val int
}

func main() {

	//1. 先创建一个原始数组
	var chessMap [11][13]int
	chessMap[1][2] = 1
	chessMap[2][3] = 2

	//2.输出看效果
	for _, v1 := range chessMap {
		for _, v2 := range v1 {
			fmt.Printf("%d\t", v2)
		}
		fmt.Println()
	}

	//3.转成稀疏数组
	var sparseSlice []ValNode
	count := 0
	sparseSlice = append(sparseSlice, ValNode{
		row: len(chessMap),
		col: len(chessMap[0]),
		val: count,
	})
	for i, v1 := range chessMap {
		for j, v2 := range v1 {
			if v2 != 0 {
				valNode := ValNode{
					row: i,
					col: j,
					val: v2,
				}
				sparseSlice = append(sparseSlice, valNode)
				count++
			}
		}
	}
	sparseSlice[0].val = count
	fmt.Println(sparseSlice)

	//将稀疏数组存盘...
	//从磁盘读取数据...

	//4.稀疏数组转原始数组
	//数组初始化时长度不能为变量要为constant 所以初始化一个二维切片
	zeroNode := sparseSlice[0]
	var newChessMap [][]int = make([][]int, zeroNode.row)
	for i := range newChessMap {
		newChessMap[i] = make([]int, zeroNode.col)
	}

	//遍历 sparseSlice
	for i := 1; i < len(sparseSlice); i++ {
		node := sparseSlice[i]
		newChessMap[node.row][node.col] = node.val
	}
	//输出看效果
	fmt.Println("恢复后的原始数组")
	for _, v1 := range newChessMap {
		for _, v2 := range v1 {
			fmt.Printf("%d\t", v2)
		}
		fmt.Println()
	}
}
```



## 2.队列(queue)

### 1).基本介绍

```txt
队列是一个有序列表，可以用数组或者链表来实现
遵循先入先出的原则，即：先存入队列的数据，
```

### 2).数组模拟队列

#### 单队列

```go
package main

import (
	"errors"
	"fmt"
	"os"
)

//使用一个结构体管理队列
type Queue struct {
	maxSize int
	array   [6]int
	front   int //指向队首
	rear    int //指向队尾
}

//添加数据到队列
func (this *Queue) AddQueue(val int) (err error) {
	//先判断队列是否已满
	if this.rear == this.maxSize-1 {
		return errors.New("The queue is full")
	}

	this.rear++
	this.array[this.rear] = val
	return
}

//从队列取数据
func (this *Queue) GetQueue() (val int, err error) {
	//先判断队列是否为空
	if this.front == this.rear {
		return -1, errors.New("The queue is empty")
	}
	this.front++
	val = this.array[this.front]
	return val, err
}

//显示队列:找到队首遍历到队尾
func (this *Queue) showQueue() {
	//先判断队列是否为空
	if this.front == this.rear {
		fmt.Println("The queue is empty")
		return
	}
	for i := this.front + 1; i <= this.rear; i++ {
		fmt.Printf("queue[%d]=%d\t", i, this.array[i])
	}
	fmt.Println()
}

func main() {
	//创建队列
	queue := &Queue{
		maxSize: 4,
		front:   -1,
		rear:    -1,
	}

	var key string
	var val int
	for {
		fmt.Println("1.输入add 表示添加数据到队列")
		fmt.Println("2.输入get 表示从队列获取数据")
		fmt.Println("3.输入show 表示显式队列")
		fmt.Println("4.输入exit 表示退出队列")

		fmt.Scanln(&key)
		switch key {
		case "add":
			fmt.Println("输入你要添加的值")
			fmt.Scanln(&val)
			err := queue.AddQueue(val)
			if err != nil {
				fmt.Println(err.Error())
			} else {
				fmt.Println("add success")
			}
		case "get":
			val, err := queue.GetQueue()
			if err != nil {
				fmt.Println(err.Error())
			} else {
				fmt.Printf("从队列取出%d\n", val)
			}
		case "show":
			queue.showQueue()
		case "exit":
			os.Exit(0)
		}
	}
}
```



#### 环形队列

```go
```



